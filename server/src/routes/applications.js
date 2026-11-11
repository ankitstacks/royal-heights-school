
    const express = require("express");
    const multer = require("multer");
    const path = require("path");
    const fs = require("fs");
    const crypto = require("crypto");

    const db = require("../db");
    const { requireAuth, requireOwner } = require("../middleware/requireAuth");

    const {
    sendApplicationReceived,
    sendApplicationStatusEmail,
    } = require("../utils/emailService");

    const router = express.Router();

    // Resume upload directory
    const uploadDir = path.resolve(
    process.env.UPLOAD_DIR || path.join(__dirname, "../../uploads")
    );

    fs.mkdirSync(uploadDir, { recursive: true });

    // Multer configuration
    const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadDir),

        filename: (req, file, cb) => {
        cb(
            null,
            `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`
        );
        },
    }),

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    },

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowed = [".pdf", ".docx"];

        if (!allowed.includes(ext)) {
        const error = new Error("Only PDF and DOCX resumes are accepted.");
        error.status = 400;
        return cb(error);
        }

        cb(null, true);
    },
    });

    // Helper function
    function cleanText(value, maxLength) {
    return String(value || "").trim().slice(0, maxLength);
    }

    // Safely send email without breaking the main operation
    async function sendEmailSafely(emailFunction, emailData, emailType) {
    try {
        await emailFunction(emailData);
        console.log(`${emailType} email sent successfully.`);
    } catch (error) {
        console.error(`${emailType} email failed:`, error.message);
    }
    }

    // --------------------------------------------------
    // PUBLIC: Submit a job application
    // --------------------------------------------------

    router.post("/", upload.single("resume"), async (req, res, next) => {
    let savedFile = req.file?.path;

    try {
        const fullName = cleanText(req.body.full_name, 160);
        const email = cleanText(req.body.email, 255).toLowerCase();
        const phone = cleanText(req.body.phone, 25);
        const qualification = cleanText(req.body.qualification, 180);
        const coverLetter = cleanText(req.body.cover_letter, 3000);

        const experienceYears = Number(req.body.experience_years || 0);
        const vacancyId = Number(req.body.vacancy_id);

        // Validate required fields
        if (
        !fullName ||
        !email ||
        !phone ||
        !qualification ||
        !Number.isFinite(experienceYears) ||
        experienceYears < 0 ||
        experienceYears > 60 ||
        !Number.isInteger(vacancyId) ||
        vacancyId < 1
        ) {
        return res.status(400).json({
            error: "Please check all required fields.",
        });
        }

        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            error: "Enter a valid email address.",
        });
        }

        // Resume is required
        if (!req.file) {
        return res.status(400).json({
            error: "Please attach your resume.",
        });
        }

        // Verify actual file signature
        const fileHandle = await fs.promises.open(req.file.path, "r");

        const signature = Buffer.alloc(4);

        try {
        await fileHandle.read(signature, 0, 4, 0);
        } finally {
        await fileHandle.close();
        }

        const ext = path.extname(req.file.originalname).toLowerCase();

        const isPdf =
        ext === ".pdf" &&
        signature.subarray(0, 4).toString() === "%PDF";

        const isDocx =
        ext === ".docx" &&
        signature[0] === 0x50 &&
        signature[1] === 0x4b;

        if (!isPdf && !isDocx) {
        return res.status(400).json({
            error: "The uploaded file is not a valid PDF or DOCX.",
        });
        }

        // Verify published vacancy
        const vacancy = await db.query(
        `SELECT id, title
        FROM vacancies
        WHERE id = $1
            AND status = 'published'
            AND (last_date IS NULL OR last_date >= CURRENT_DATE)`,
        [vacancyId]
        );

        if (!vacancy.rowCount) {
        return res.status(400).json({
            error: "This vacancy is no longer accepting applications.",
        });
        }

        const jobTitle = vacancy.rows[0].title;

        // Save application in database
        const result = await db.query(
        `INSERT INTO job_applications
        (
            vacancy_id,
            full_name,
            email,
            phone,
            qualification,
            experience_years,
            cover_letter,
            resume_storage_key,
            resume_original_name,
            resume_mime_type,
            resume_size_bytes
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING id, created_at`,
        [
            vacancyId,
            fullName,
            email,
            phone,
            qualification,
            experienceYears,
            coverLetter || null,
            path.basename(req.file.filename),
            path.basename(req.file.originalname).slice(0, 255),
            isPdf
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            req.file.size,
        ]
        );

        const applicationId = result.rows[0].id;

        // Database application is saved; retain the resume.
        savedFile = null;

        // Send confirmation email to applicant.
        await sendEmailSafely(
        sendApplicationReceived,
        {
            email,
            name: fullName,
            jobTitle,
            applicationId,
        },
        "Application confirmation"
        );

        return res.status(201).json({
        message: "Application submitted successfully.",
        applicationId,
        });
    } catch (error) {
        next(error);
    } finally {
        // Remove uploaded file if application was not saved.
        if (savedFile) {
        await fs.promises.unlink(savedFile).catch(() => {});
        }
    }
    });

    // --------------------------------------------------
    // ADMIN/STAFF: List applications
    // --------------------------------------------------

    router.get("/", requireAuth, async (req, res, next) => {
    try {
        const validStatuses = [
        "pending",
        "shortlisted",
        "rejected",
        "hired",
        ];

        const status = String(req.query.status || "");

        if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
            error: "Invalid status filter.",
        });
        }

        const result = await db.query(
        `SELECT
            a.id,
            a.vacancy_id,
            v.title AS vacancy_title,
            a.full_name,
            a.email,
            a.phone,
            a.qualification,
            a.experience_years,
            a.cover_letter,
            a.resume_original_name,
            a.resume_size_bytes,
            a.status,
            a.created_at
        FROM job_applications a
        JOIN vacancies v ON v.id = a.vacancy_id
        WHERE ($1 = '' OR a.status = $1)
        ORDER BY a.created_at DESC`,
        [status]
        );

        res.json({
        applications: result.rows,
        });
    } catch (error) {
        next(error);
    }
    });

    // --------------------------------------------------
    // ADMIN/STAFF: Download resume
    // --------------------------------------------------

    router.get("/:id/resume", requireAuth, async (req, res, next) => {
    try {
        const result = await db.query(
        `SELECT
            resume_storage_key,
            resume_original_name,
            resume_mime_type
        FROM job_applications
        WHERE id = $1`,
        [req.params.id]
        );

        if (!result.rowCount) {
        return res.status(404).json({
            error: "Application not found.",
        });
        }

        const application = result.rows[0];

        const filePath = path.join(
        uploadDir,
        path.basename(application.resume_storage_key)
        );

        if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            error: "Resume file is unavailable.",
        });
        }

        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Content-Type", "application/octet-stream");

        res.download(
        filePath,
        path.basename(application.resume_original_name)
        );
    } catch (error) {
        next(error);
    }
    });

    // --------------------------------------------------
    // ADMIN/STAFF: Update application status
    // --------------------------------------------------

    router.patch("/:id/status", requireAuth, async (req, res, next) => {
    try {
        const status = req.body.status;

        const validStatuses = [
        "pending",
        "shortlisted",
        "rejected",
        "hired",
        ];

        if (!validStatuses.includes(status)) {
        return res.status(400).json({
            error: "Invalid application status.",
        });
        }

        // Get previous status and update the application.
        // Return applicant details for email notification.
        const result = await db.query(
        `WITH previous AS (
            SELECT id, status
            FROM job_applications
            WHERE id = $2
        ),
        updated AS (
            UPDATE job_applications AS a
            SET status = $1
            WHERE a.id = $2
            RETURNING
            a.id,
            a.status,
            a.vacancy_id,
            a.email,
            a.full_name
        )
        SELECT
            u.id,
            u.status,
            p.status AS previous_status,
            u.email,
            u.full_name,
            v.title AS vacancy_title
        FROM updated u
        JOIN previous p ON p.id = u.id
        JOIN vacancies v ON v.id = u.vacancy_id`,
        [status, req.params.id]
        );

        if (!result.rowCount) {
        return res.status(404).json({
            error: "Application not found.",
        });
        }

        const application = result.rows[0];

        // Send email only when the status actually changes.
        if (application.previous_status !== application.status) {
        await sendEmailSafely(
            sendApplicationStatusEmail,
            {
            email: application.email,
            name: application.full_name,
            jobTitle: application.vacancy_title,
            status: application.status,
            applicationId: application.id,
            },
            "Application status"
        );
        }

        res.json({
        application: {
            id: application.id,
            status: application.status,
        },
        });
    } catch (error) {
        next(error);
    }
    });

    // --------------------------------------------------
    // OWNER ONLY: Delete application and resume
    // --------------------------------------------------

    router.delete("/:id", requireOwner, async (req, res, next) => {
    try {
        const result = await db.query(
        `DELETE FROM job_applications
        WHERE id = $1
        RETURNING resume_storage_key`,
        [req.params.id]
        );

        if (!result.rowCount) {
        return res.status(404).json({
            error: "Application not found.",
        });
        }

        const filePath = path.join(
        uploadDir,
        path.basename(result.rows[0].resume_storage_key)
        );

        await fs.promises.unlink(filePath).catch(() => {});

        res.json({
        message: "Application deleted.",
        });
    } catch (error) {
        next(error);
    }
    });

    module.exports = router;

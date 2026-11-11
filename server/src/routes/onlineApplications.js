const express = require("express");
const router = express.Router();

const db = require("../db");

const {
  requireAuth,
  requirePermission,
} = require("../middleware/requireAuth");

// ==========================================
// DATABASE TABLE SETUP
// Automatically creates table if missing
// ==========================================

let tableReadyPromise = null;

async function ensureOnlineApplicationsTable() {
  if (!tableReadyPromise) {
    tableReadyPromise = db
      .query(`
        CREATE TABLE IF NOT EXISTS public.online_applications (
          id BIGSERIAL PRIMARY KEY,
          student_name VARCHAR(100) NOT NULL,
          date_of_birth DATE NOT NULL,
          class_name VARCHAR(30) NOT NULL,
          parent_name VARCHAR(100) NOT NULL,
          phone VARCHAR(18) NOT NULL,
          email VARCHAR(150),
          previous_school VARCHAR(150),
          message TEXT,
          status VARCHAR(20) NOT NULL DEFAULT 'New',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)
      .catch((error) => {
        // Allow another attempt if table creation fails
        tableReadyPromise = null;
        throw error;
      });
  }

  return tableReadyPromise;
}

// ==========================================
// PUBLIC API: SUBMIT ONLINE APPLICATION
// POST /api/online-applications
// ==========================================

router.post("/", async (req, res) => {
  try {
    await ensureOnlineApplicationsTable();

    const {
      studentName,
      dob,
      className,
      parentName,
      phone,
      email,
      previousSchool,
      message,
    } = req.body || {};

    // Required field validation
    if (
      typeof studentName !== "string" ||
      !studentName.trim() ||
      typeof dob !== "string" ||
      !dob ||
      typeof className !== "string" ||
      !className.trim() ||
      typeof parentName !== "string" ||
      !parentName.trim() ||
      typeof phone !== "string" ||
      !phone.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Phone validation
    const cleanPhone = phone.trim();

    if (!/^[0-9+() -]{8,18}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    // Date of birth validation
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid date of birth.",
      });
    }

    const birthDate = new Date(`${dob}T00:00:00.000Z`);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (
      Number.isNaN(birthDate.getTime()) ||
      birthDate.toISOString().slice(0, 10) !== dob ||
      birthDate > today
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid date of birth.",
      });
    }

    // Optional email validation
    const cleanEmail =
      typeof email === "string" ? email.trim() : "";

    if (
      cleanEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Insert application into PostgreSQL
    const result = await db.query(
      `
        INSERT INTO public.online_applications (
          student_name,
          date_of_birth,
          class_name,
          parent_name,
          phone,
          email,
          previous_school,
          message
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING
          id,
          student_name,
          date_of_birth,
          class_name,
          parent_name,
          phone,
          email,
          status,
          created_at
      `,
      [
        studentName.trim(),
        dob,
        className.trim(),
        parentName.trim(),
        cleanPhone,
        cleanEmail || null,
        typeof previousSchool === "string"
          ? previousSchool.trim() || null
          : null,
        typeof message === "string"
          ? message.trim() || null
          : null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Online application submitted successfully.",
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Online application submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit application. Please try again.",
    });
  }
});

// ==========================================
// ADMIN API: GET ALL ONLINE APPLICATIONS
// GET /api/online-applications
// ==========================================

router.get(
  "/",
  requireAuth,
  requirePermission("view_online_applications"),
  async (req, res) => {
    try {
      await ensureOnlineApplicationsTable();

      const result = await db.query(`
        SELECT
          id,
          student_name,
          date_of_birth,
          class_name,
          parent_name,
          phone,
          email,
          previous_school,
          message,
          status,
          created_at
        FROM public.online_applications
        ORDER BY created_at DESC
      `);

      return res.status(200).json({
        success: true,
        count: result.rowCount,
        applications: result.rows,
      });
    } catch (error) {
      console.error("Fetch online applications error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch online applications.",
      });
    }
  }
);

// ==========================================
// ADMIN API: UPDATE APPLICATION STATUS
// PATCH /api/online-applications/:id/status
// ==========================================

router.patch(
  "/:id/status",
  requireAuth,
  requirePermission("manage_online_applications"),
  async (req, res) => {
    try {
      await ensureOnlineApplicationsTable();

      const { id } = req.params;
      const { status } = req.body || {};

      const allowedStatuses = [
        "New",
        "Reviewing",
        "Accepted",
        "Rejected",
      ];

      if (!/^\d+$/.test(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application ID.",
        });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application status.",
        });
      }

      const result = await db.query(
        `
          UPDATE public.online_applications
          SET status = $1
          WHERE id = $2
          RETURNING id, status
        `,
        [status, Number(id)]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Application not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Application status updated successfully.",
        application: result.rows[0],
      });
    } catch (error) {
      console.error("Update application status error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to update application status.",
      });
    }
  }
);

module.exports = router;
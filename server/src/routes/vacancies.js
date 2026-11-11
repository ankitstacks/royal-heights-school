
const express = require("express");
const db = require("../db");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

const allowedFields = [
  "title",
  "department",
  "employment_type",
  "location",
  "description",
  "qualifications",
  "experience",
  "salary_range",
  "last_date",
  "status",
];

function validateVacancy(body) {
  const required = [
    "title",
    "department",
    "description",
    "qualifications",
  ];

  for (const field of required) {
    if (!String(body[field] || "").trim()) {
      return `${field} is required.`;
    }
  }

  if (
    body.status &&
    !["draft", "published", "closed"].includes(body.status)
  ) {
    return "Invalid vacancy status.";
  }

  if (
    body.employment_type &&
    !["Full-time", "Part-time", "Contract", "Temporary"].includes(
      body.employment_type
    )
  ) {
    return "Invalid employment type.";
  }

  return null;
}

// Public: published vacancies only
router.get("/public", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id, title, department, employment_type, location,
              description, qualifications, experience, salary_range,
              last_date, created_at
       FROM vacancies
       WHERE status = 'published'
         AND (last_date IS NULL OR last_date >= CURRENT_DATE)
       ORDER BY created_at DESC`
    );

    res.json({ vacancies: result.rows });
  } catch (error) {
    next(error);
  }
});

// Public: one published vacancy
router.get("/public/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id, title, department, employment_type, location,
              description, qualifications, experience, salary_range,
              last_date, created_at
       FROM vacancies
       WHERE id = $1 AND status = 'published'
         AND (last_date IS NULL OR last_date >= CURRENT_DATE)`,
      [req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ error: "Vacancy not found." });
    }

    res.json({ vacancy: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Admin: view all vacancies including drafts and closed roles
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM vacancies ORDER BY created_at DESC`
    );
    res.json({ vacancies: result.rows });
  } catch (error) {
    next(error);
  }
});

// Admin: create vacancy
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const errorMessage = validateVacancy(req.body);
    if (errorMessage) {
      return res.status(400).json({ error: errorMessage });
    }

    const body = req.body;
    const result = await db.query(
      `INSERT INTO vacancies
       (title, department, employment_type, location, description,
        qualifications, experience, salary_range, last_date, status, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        body.title.trim(),
        body.department.trim(),
        body.employment_type || "Full-time",
        body.location || "Zirapur, Madhya Pradesh",
        body.description.trim(),
        body.qualifications.trim(),
        body.experience || null,
        body.salary_range || null,
        body.last_date || null,
        body.status || "draft",
        req.session.admin.id,
      ]
    );

    res.status(201).json({ vacancy: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Admin: update vacancy
router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const fields = allowedFields.filter((field) =>
      Object.prototype.hasOwnProperty.call(req.body, field)
    );

    if (!fields.length) {
      return res.status(400).json({ error: "No editable fields provided." });
    }

    const body = { ...req.body };

    if (body.status && !["draft", "published", "closed"].includes(body.status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    if (
      body.employment_type &&
      !["Full-time", "Part-time", "Contract", "Temporary"].includes(
        body.employment_type
      )
    ) {
      return res.status(400).json({ error: "Invalid employment type." });
    }

    for (const field of ["title", "department", "description", "qualifications"]) {
      if (field in body && !String(body[field] || "").trim()) {
        return res.status(400).json({ error: `${field} cannot be empty.` });
      }
    }

    const values = fields.map((field) => body[field] ?? null);
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .concat("updated_at = NOW()")
      .join(", ");

    values.push(req.params.id);

    const result = await db.query(
      `UPDATE vacancies SET ${setClause}
       WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (!result.rowCount) {
      return res.status(404).json({ error: "Vacancy not found." });
    }

    res.json({ vacancy: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Admin: delete vacancy only if no applications are attached
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const result = await db.query(
      `DELETE FROM vacancies v
       WHERE v.id = $1
         AND NOT EXISTS (
           SELECT 1 FROM job_applications a WHERE a.vacancy_id = v.id
         )
       RETURNING v.id`,
      [req.params.id]
    );

    if (!result.rowCount) {
      return res.status(409).json({
        error: "Vacancy not found or has applications. Close it instead.",
      });
    }

    res.json({ message: "Vacancy deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

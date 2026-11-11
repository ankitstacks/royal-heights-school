const express = require("express");
const router = express.Router();

const db = require("../db");
const {
  requireAuth,
  requirePermission,
} = require("../middleware/requireAuth");

// ==========================================
// PUBLIC API: Submit Online Application
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      studentName,
      dob,
      className,
      parentName,
      phone,
      email,
      previousSchool,
      message,
    } = req.body;

    // Required field validation
    if (
      !studentName?.trim() ||
      !dob ||
      !className?.trim() ||
      !parentName?.trim() ||
      !phone?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Phone validation
    if (!/^[0-9+() -]{8,18}$/.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    // Date validation
    const birthDate = new Date(`${dob}T00:00:00`);

    if (
      Number.isNaN(birthDate.getTime()) ||
      birthDate > new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid date of birth.",
      });
    }

    // Insert application into PostgreSQL
    const result = await db.query(
      `INSERT INTO online_applications
      (
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
        class_name,
        parent_name,
        status,
        created_at`,
      [
        studentName.trim(),
        dob,
        className.trim(),
        parentName.trim(),
        phone.trim(),
        email?.trim() || null,
        previousSchool?.trim() || null,
        message?.trim() || null,
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
// PROTECTED API: Get All Applications
// ==========================================

router.get(
  "/",
  requireAuth,
  requirePermission("view_online_applications"),
  async (req, res) => {
    try {
      const result = await db.query(
        `SELECT
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
        FROM online_applications
        ORDER BY created_at DESC`
      );

      return res.json({
        success: true,
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
// PROTECTED API: Update Application Status
// ==========================================

router.patch(
  "/:id/status",
  requireAuth,
  requirePermission("manage_online_applications"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

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
        `UPDATE online_applications
         SET status = $1
         WHERE id = $2
         RETURNING id, status`,
        [status, Number(id)]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Application not found.",
        });
      }

      return res.json({
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
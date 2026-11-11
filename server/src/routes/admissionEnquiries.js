const express = require("express");
const router = express.Router();

const db = require("../db");

const {
  requireAuth,
  requirePermission,
} = require("../middleware/requireAuth");

// Public API: Submit admission enquiry
router.post("/", async (req, res) => {
  try {
    const {
      parentName,
      phone,
      email,
      className,
      topic,
      message,
    } = req.body;

    // Required field validation
    if (
      typeof parentName !== "string" ||
      typeof phone !== "string" ||
      typeof className !== "string" ||
      !parentName.trim() ||
      !phone.trim() ||
      !className.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Parent name, phone and class are required.",
      });
    }

    const cleanPhone = phone.trim();

    // Indian mobile number validation
    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number.",
      });
    }

    const result = await db.query(
      `INSERT INTO public.admission_enquiries
       (parent_name, phone, email, class_name, topic, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, parent_name, phone, email,
                 class_name, topic, message, status, created_at`,
      [
        parentName.trim(),
        cleanPhone,
        typeof email === "string" ? email.trim() || null : null,
        className.trim(),
        typeof topic === "string" && topic.trim()
          ? topic.trim()
          : "Admission Process",
        typeof message === "string" ? message.trim() || null : null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Admission enquiry submitted successfully.",
      enquiry: result.rows[0],
    });

  } catch (error) {
    console.error("Admission enquiry submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry. Please try again.",
    });
  }
});

// Protected API: Get all admission enquiries
router.get(
  "/",
  requireAuth,
  requirePermission("view_admission_enquiries"),
  async (req, res) => {
    try {
      const result = await db.query(
        `SELECT id, parent_name, phone, email,
                class_name, topic, message, status, created_at
         FROM public.admission_enquiries
         ORDER BY created_at DESC`
      );

      return res.status(200).json({
        success: true,
        enquiries: result.rows,
      });

    } catch (error) {
      console.error("Fetch admission enquiries error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch admission enquiries.",
      });
    }
  }
);

module.exports = router;
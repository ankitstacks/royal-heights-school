const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const db = require("../db");
const { requireOwner } = require("../middleware/requireAuth");
const { sendStaffInvitationEmail } = require("../utils/emailService");

const router = express.Router();

// Only the Owner can access staff-management APIs.
router.use(requireOwner);

// --------------------------------------------------
// ALLOWED STAFF PERMISSIONS
// --------------------------------------------------

const ALLOWED_PERMISSIONS = [
  "manage_vacancies",
  "view_applications",
  "manage_applications",
  "download_resumes",
  "manage_staff",
  "view_admission_enquiries",
  "view_online_applications",
  "manage_online_applications",
];

function normalizePermissions(value) {
  const result = {};

  for (const permission of ALLOWED_PERMISSIONS) {
    result[permission] = value?.[permission] === true;
  }

  return result;
}

// --------------------------------------------------
// VALIDATION HELPERS
// --------------------------------------------------

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeDesignation(value) {
  const designation = String(value || "School Staff").trim();
  return designation.slice(0, 120) || "School Staff";
}

function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// --------------------------------------------------
// STAFF ACCOUNT LOOKUP
// --------------------------------------------------

async function getStaffAccount(id) {
  const result = await db.query(
    `SELECT id, name, email, role, active, designation
     FROM admin_users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

// --------------------------------------------------
// GET: LIST STAFF ACCOUNTS
// --------------------------------------------------

router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT
         id,
         name,
         email,
         role,
         active,
         designation,
         permissions,
         must_change_password,
         created_at,
         (role = 'owner') AS is_protected
       FROM admin_users
       ORDER BY
         CASE WHEN role = 'owner' THEN 0 ELSE 1 END,
         created_at DESC`
    );

    res.json({ staff: result.rows });
  } catch (error) {
    next(error);
  }
});

// --------------------------------------------------
// POST: CREATE STAFF ACCOUNT WITH TEMPORARY PASSWORD
// --------------------------------------------------

router.post("/", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const designation = normalizeDesignation(req.body.designation);

    if (!name || name.length > 120) {
      return res.status(400).json({
        error: "Enter a valid staff name.",
      });
    }

    if (!validEmail(email) || email.length > 255) {
      return res.status(400).json({
        error: "Enter a valid email address.",
      });
    }

    if (password.length < 12 || password.length > 128) {
      return res.status(400).json({
        error: "Temporary password must contain at least 12 characters.",
      });
    }

    const existing = await db.query(
      "SELECT id FROM admin_users WHERE email = $1",
      [email]
    );

    if (existing.rowCount) {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const permissions = normalizePermissions(req.body.permissions);

    const result = await db.query(
      `INSERT INTO admin_users
         (name, email, password_hash, role, active, designation, permissions, must_change_password)
       VALUES ($1, $2, $3, 'staff', TRUE, $4, $5::jsonb, TRUE)
       RETURNING id, name, email, role, active, designation, permissions,
                 must_change_password, created_at`,
      [
        name,
        email,
        passwordHash,
        designation,
        JSON.stringify(permissions),
      ]
    );

    res.status(201).json({
      message: "Staff account created successfully.",
      staff: {
        ...result.rows[0],
        is_protected: false,
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    next(error);
  }
});

// --------------------------------------------------
// POST: INVITE STAFF BY EMAIL
// --------------------------------------------------

router.post("/invite", async (req, res, next) => {
  let createdUserId = null;

  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const designation = normalizeDesignation(req.body.designation);

    if (!name || name.length > 120 || !validEmail(email)) {
      return res.status(400).json({
        error: "Enter a valid name and email address.",
      });
    }

    if (email.length > 255) {
      return res.status(400).json({
        error: "Email address is too long.",
      });
    }

    const existing = await db.query(
      "SELECT id FROM admin_users WHERE email = $1",
      [email]
    );

    if (existing.rowCount) {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    const permissions = normalizePermissions(req.body.permissions);

    const randomPassword = crypto.randomBytes(48).toString("hex");
    const passwordHash = await bcrypt.hash(randomPassword, 12);

    const userResult = await db.query(
      `INSERT INTO admin_users
         (name, email, password_hash, role, active, designation, permissions, must_change_password)
       VALUES ($1, $2, $3, 'staff', FALSE, $4, $5::jsonb, TRUE)
       RETURNING id`,
      [
        name,
        email,
        passwordHash,
        designation,
        JSON.stringify(permissions),
      ]
    );

    createdUserId = userResult.rows[0].id;

    const token = createToken();
    const tokenHash = hashToken(token);

    await db.query(
      `INSERT INTO staff_account_tokens
         (admin_user_id, token_hash, purpose, expires_at, created_by)
       VALUES ($1, $2, 'invitation', NOW() + INTERVAL '24 hours', $3)`,
      [
        createdUserId,
        tokenHash,
        req.session.admin.id,
      ]
    );

    try {
      await sendStaffInvitationEmail({
        email,
        name,
        invitationToken: token,
      });
    } catch (emailError) {
      await db.query(
        "DELETE FROM admin_users WHERE id = $1 AND role = 'staff'",
        [createdUserId]
      );

      createdUserId = null;

      console.error(
        "Staff invitation email failed:",
        emailError.message
      );

      return res.status(502).json({
        error: "Invitation email could not be sent. Please check SMTP settings.",
      });
    }

    return res.status(201).json({
      message: "Staff invitation sent successfully.",
    });
  } catch (error) {
    if (createdUserId) {
      await db
        .query(
          "DELETE FROM admin_users WHERE id = $1 AND role = 'staff'",
          [createdUserId]
        )
        .catch(() => {});
    }

    if (error.code === "23505") {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    next(error);
  }
});

// --------------------------------------------------
// PATCH: UPDATE STAFF DESIGNATION, PERMISSIONS OR STATUS
// OWNER ACCOUNT IS PROTECTED
// --------------------------------------------------

router.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid staff ID.",
      });
    }

    const existing = await getStaffAccount(id);

    if (!existing) {
      return res.status(404).json({
        error: "Staff account not found.",
      });
    }

    if (existing.role === "owner") {
      return res.status(403).json({
        error: "Protected Owner account cannot be modified.",
      });
    }

    const updates = [];
    const values = [];

    if (typeof req.body.active === "boolean") {
      values.push(req.body.active);
      updates.push(`active = $${values.length}`);
    }

    if (req.body.permissions !== undefined) {
      values.push(
        JSON.stringify(normalizePermissions(req.body.permissions))
      );

      updates.push(`permissions = $${values.length}::jsonb`);
    }

    if (req.body.designation !== undefined) {
      values.push(normalizeDesignation(req.body.designation));
      updates.push(`designation = $${values.length}`);
    }

    if (!updates.length) {
      return res.status(400).json({
        error: "No valid fields provided for update.",
      });
    }

    // Invalidate existing staff sessions after access/security changes.
    if (
      req.body.active !== undefined ||
      req.body.permissions !== undefined
    ) {
      updates.push("session_version = session_version + 1");
    }

    values.push(id);

    const result = await db.query(
      `UPDATE admin_users
       SET ${updates.join(", ")}
       WHERE id = $${values.length}
         AND role = 'staff'
       RETURNING id, name, email, role, active, designation, permissions,
                 must_change_password, created_at`,
      values
    );

    if (!result.rowCount) {
      return res.status(403).json({
        error: "This account cannot be modified.",
      });
    }

    return res.json({
      message: "Staff account updated successfully.",
      staff: {
        ...result.rows[0],
        is_protected: false,
      },
    });
  } catch (error) {
    next(error);
  }
});

// --------------------------------------------------
// DELETE: DELETE STAFF ACCOUNT
// OWNER ACCOUNT CANNOT BE DELETED
// --------------------------------------------------

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid staff ID.",
      });
    }

    if (String(id) === String(req.session.admin.id)) {
      return res.status(403).json({
        error: "You cannot delete your own account.",
      });
    }

    const existing = await getStaffAccount(id);

    if (!existing) {
      return res.status(404).json({
        error: "Staff account not found.",
      });
    }

    if (existing.role === "owner") {
      return res.status(403).json({
        error: "Protected Owner account cannot be deleted.",
      });
    }

    const result = await db.query(
      `DELETE FROM admin_users
       WHERE id = $1 AND role = 'staff'
       RETURNING id`,
      [id]
    );

    if (!result.rowCount) {
      return res.status(403).json({
        error: "This account cannot be deleted.",
      });
    }

    return res.json({
      message: "Staff account deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
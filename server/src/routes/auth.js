const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

const db = require("../db");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

// ==========================================
// LOGIN RATE LIMITER
// ==========================================

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many login attempts. Try again later.",
  },
});

// ==========================================
// ADMIN LOGIN
// POST /api/auth/login
// ==========================================

router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const password = String(req.body.password || "");

    if (!email || !password || password.length > 200) {
      return res.status(400).json({
        error: "Enter valid login details.",
      });
    }

    const result = await db.query(
      `SELECT
         id,
         name,
         email,
         password_hash,
         role,
         permissions,
         session_version
       FROM admin_users
       WHERE email = $1 AND active = TRUE`,
      [email]
    );

    const admin = result.rows[0];

    if (!admin || !admin.password_hash) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const valid = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!valid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    req.session.regenerate((error) => {
      if (error) {
        return next(error);
      }

      req.session.admin = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions || {},
        sessionVersion: admin.session_version,
      };

      req.session.save((saveError) => {
        if (saveError) {
          return next(saveError);
        }

        return res.status(200).json({
          message: "Login successful.",
          admin: req.session.admin,
        });
      });
    });
  } catch (error) {
    console.error("[LOGIN] Error:", error.message);
    next(error);
  }
});

// ==========================================
// ACCEPT STAFF INVITATION
// POST /api/auth/accept-invitation
// ==========================================

router.post(
  "/accept-invitation",
  async (req, res, next) => {
    let client;

    try {
      const token = String(req.body.token || "").trim();
      const password = String(req.body.password || "");

      // Validate invitation token
      if (!token || !/^[a-f0-9]{64}$/i.test(token)) {
        return res.status(400).json({
          error: "Invalid invitation token.",
        });
      }

      // Validate password
      if (password.length < 12 || password.length > 128) {
        return res.status(400).json({
          error: "Password must contain between 12 and 128 characters.",
        });
      }

      // Hash invitation token
      const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      // Hash new password
      const passwordHash = await bcrypt.hash(password, 12);

      client = await db.pool.connect();

      await client.query("BEGIN");

      // Find valid invitation
      const invitationResult = await client.query(
        `SELECT
           id,
           admin_user_id
         FROM staff_account_tokens
         WHERE token_hash = $1
           AND purpose = 'invitation'
           AND expires_at > NOW()
         FOR UPDATE`,
        [tokenHash]
      );

      if (!invitationResult.rowCount) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          error: "Invitation link is invalid, expired, or already used. Please request a new invitation.",
        });
      }

      const invitation = invitationResult.rows[0];

      // Activate staff account.
      // Owner accounts cannot be modified through this endpoint.
      const updateResult = await client.query(
        `UPDATE admin_users
         SET
           password_hash = $1,
           active = TRUE,
           must_change_password = FALSE,
           session_version = COALESCE(session_version, 0) + 1
         WHERE id = $2
           AND role = 'staff'
         RETURNING id, name, email, role`,
        [
          passwordHash,
          invitation.admin_user_id,
        ]
      );

      if (!updateResult.rowCount) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          error: "Staff account not found or cannot be activated.",
        });
      }

      // Delete invitation token after successful activation.
      // This prevents reuse of the same invitation.
      await client.query(
        `DELETE FROM staff_account_tokens
         WHERE id = $1`,
        [invitation.id]
      );

      await client.query("COMMIT");

      return res.status(200).json({
        message: "Invitation accepted successfully. Your account is now active.",
      });
    } catch (error) {
      if (client) {
        await client.query("ROLLBACK").catch(() => {});
      }

      console.error(
        "[ACCEPT INVITATION] Error:",
        error.message
      );

      next(error);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
);

// ==========================================
// GET CURRENT ADMIN
// GET /api/auth/me
// ==========================================

router.get("/me", requireAuth, (req, res) => {
  res.status(200).json({
    admin: req.session.admin,
  });
});

// ==========================================
// ADMIN LOGOUT
// POST /api/auth/logout
// ==========================================

router.post("/logout", requireAuth, (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("[LOGOUT] Error:", error.message);
      return next(error);
    }

    res.clearCookie("rh.sid", {
      path: "/",
    });

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  });
});

// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;
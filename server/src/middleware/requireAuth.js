
const db = require("../db");

async function requireAuth(req, res, next) {
  try {
    const sessionAdmin = req.session?.admin;

    if (!sessionAdmin?.id) {
      return res.status(401).json({
        error: "Please log in first.",
      });
    }

    // Always verify the account against the database.
    const result = await db.query(
      `SELECT id, name, email, role, active,
              permissions, session_version
       FROM admin_users
       WHERE id = $1`,
      [sessionAdmin.id]
    );

    const admin = result.rows[0];

    if (!admin || !admin.active) {
      req.session.destroy(() => {});
      return res.status(401).json({
        error: "Your account is inactive. Please contact the Owner.",
      });
    }

    // Invalidate sessions created before a password/security reset.
    if (
      sessionAdmin.sessionVersion !== undefined &&
      Number(sessionAdmin.sessionVersion) !== Number(admin.session_version)
    ) {
      req.session.destroy(() => {});
      return res.status(401).json({
        error: "Your session has expired. Please log in again.",
      });
    }

    // Refresh role and permissions from the database.
    req.session.admin = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions || {},
      sessionVersion: admin.session_version,
    };

    next();
  } catch (error) {
    next(error);
  }
}

function requireOwner(req, res, next) {
  requireAuth(req, res, (error) => {
    if (error) return next(error);

    if (req.session.admin.role !== "owner") {
      return res.status(403).json({
        error: "Owner permission required.",
      });
    }

    next();
  });
}

function requirePermission(permission) {
  return (req, res, next) => {
    requireAuth(req, res, (error) => {
      if (error) return next(error);

      // Owner has full access.
      if (req.session.admin.role === "owner") {
        return next();
      }

      const permissions = req.session.admin.permissions || {};

      if (permissions[permission] !== true) {
        return res.status(403).json({
          error: "You do not have permission to perform this action.",
        });
      }

      next();
    });
  };
}

module.exports = {
  requireAuth,
  requireOwner,
  requirePermission,
};

const db = require("../db");

// ==========================================
// DESTROY INVALID SESSION
// ==========================================

function destroySession(req) {
    return new Promise((resolve) => {
        if (!req.session) {
            return resolve();
        }

        req.session.destroy((error) => {
            if (error) {
                console.error(
                    "[AUTH] Session destruction error:",
                    error.message
                );
            }

            resolve();
        });
    });
}

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

async function requireAuth(req, res, next) {
    try {
        const sessionAdmin = req.session?.admin;

        if (!sessionAdmin?.id) {
            return res.status(401).json({
                success: false,
                error: "Please log in first."
            });
        }

        // Verify admin account from PostgreSQL.
        const result = await db.query(
            `SELECT
                id,
                name,
                email,
                role,
                active,
                permissions,
                session_version
             FROM admin_users
             WHERE id = $1
             LIMIT 1`,
            [sessionAdmin.id]
        );

        const admin = result.rows[0];

        // Account does not exist or is inactive.
        if (!admin || admin.active !== true) {
            await destroySession(req);

            return res.status(401).json({
                success: false,
                error: "Your account is inactive or unavailable. Please contact the Owner."
            });
        }

        // Check session version.
        const databaseVersion = Number(
            admin.session_version ?? 0
        );

        const currentSessionVersion = Number(
            sessionAdmin.sessionVersion ?? 0
        );

        if (databaseVersion !== currentSessionVersion) {
            await destroySession(req);

            return res.status(401).json({
                success: false,
                error: "Your session has expired. Please log in again."
            });
        }

        // Refresh admin information from database.
        req.session.admin = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions || {},
            sessionVersion: databaseVersion
        };

        return next();

    } catch (error) {
        console.error(
            "[AUTH MIDDLEWARE] Error:",
            error.message
        );

        return next(error);
    }
}

// ==========================================
// OWNER AUTHORIZATION
// ==========================================

function requireOwner(req, res, next) {
    requireAuth(req, res, (error) => {
        if (error) {
            return next(error);
        }

        if (req.session?.admin?.role !== "owner") {
            return res.status(403).json({
                success: false,
                error: "Owner permission required."
            });
        }

        return next();
    });
}

// ==========================================
// PERMISSION AUTHORIZATION
// ==========================================

function requirePermission(permission) {
    return (req, res, next) => {
        requireAuth(req, res, (error) => {
            if (error) {
                return next(error);
            }

            const admin = req.session?.admin;

            if (!admin) {
                return res.status(401).json({
                    success: false,
                    error: "Please log in first."
                });
            }

            // Owner has complete access.
            if (admin.role === "owner") {
                return next();
            }

            const permissions = admin.permissions || {};

            if (permissions[permission] !== true) {
                return res.status(403).json({
                    success: false,
                    error: "You do not have permission to perform this action."
                });
            }

            return next();
        });
    };
}

// ==========================================
// EXPORT MIDDLEWARE
// ==========================================

module.exports = {
    requireAuth,
    requireOwner,
    requirePermission
};
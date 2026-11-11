require("dotenv").config();

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

const { pool } = require("./db");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/auth");
const vacancyRoutes = require("./routes/vacancies");
const applicationRoutes = require("./routes/applications");
const staffRoutes = require("./routes/staff");
const admissionEnquiryRoutes = require("./routes/admissionEnquiries");
const onlineApplicationRoutes = require("./routes/onlineApplications");

// ==========================================
// APP CONFIGURATION
// ==========================================

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
    app.set("trust proxy", 1);
}

// ==========================================
// ENVIRONMENT VALIDATION
// ==========================================

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing.");
}

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing.");
}

if (process.env.SESSION_SECRET.length < 32) {
    throw new Error(
        "SESSION_SECRET must contain at least 32 characters."
    );
}

// ==========================================
// CORS CONFIGURATION
// ==========================================

const defaultOrigins = [
    "https://royal-heights-school.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
];

const allowedOrigins = (
    process.env.FRONTEND_ORIGINS ||
    process.env.FRONTEND_ORIGIN ||
    defaultOrigins.join(",")
)
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

console.log("Allowed frontend origins:", allowedOrigins);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow Postman and server-to-server requests.
        if (!origin) {
            return callback(null, true);
        }

        const normalizedOrigin = origin.trim().replace(/\/+$/, "");

        // Allow configured frontend origins.
        if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }

        // Allow Vercel preview deployments.
        try {
            const parsedUrl = new URL(normalizedOrigin);

            const isVercelPreview =
                parsedUrl.protocol === "https:" &&
                (
                    parsedUrl.hostname.endsWith(".vercel.app") ||
                    parsedUrl.hostname.endsWith(".trycloudflare.com")
                );

            if (isVercelPreview) {
                return callback(null, true);
            }
        } catch (error) {
            console.error("Invalid origin:", normalizedOrigin);
        }

        console.log("Blocked CORS origin:", origin);

        return callback(new Error("Origin not allowed by CORS"));
    },

    credentials: true,

    methods: [
        "GET",
        "HEAD",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept"
    ],

    optionsSuccessStatus: 204
};

// Apply CORS before routes and other middleware.
// Application-level cors middleware also handles preflight requests.
app.use(cors(corsOptions));

// ==========================================
// SECURITY AND BODY PARSING
// ==========================================

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin"
        }
    })
);

app.use(express.json({ limit: "1mb" }));

app.use(
    express.urlencoded({
        extended: false,
        limit: "100kb"
    })
);

// ==========================================
// UPLOAD DIRECTORY
// ==========================================

const uploadsDir = path.resolve(
    process.env.UPLOAD_DIR ||
    path.join(__dirname, "../uploads")
);

fs.mkdirSync(uploadsDir, { recursive: true });

app.use("/uploads", express.static(uploadsDir));

console.log("Uploads directory:", uploadsDir);

// ==========================================
// SESSION CONFIGURATION
// ==========================================

app.use(
    session({
        name: "rh.sid",

        store: new pgSession({
            pool,
            createTableIfMissing: true,
            tableName: "user_sessions"
        }),

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 8 * 60 * 60 * 1000,
            path: "/"
        }
    })
);

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Royal Heights Backend is running successfully!",
        status: "LIVE",
        healthCheck: "/api/health"
    });
});

// ==========================================
// API HEALTH CHECK
// ==========================================

app.get(
    ["/api/health", "/health"],
    async (req, res) => {
        try {
            await pool.query("SELECT 1");

            res.status(200).json({
                success: true,
                status: "ok",
                server: "connected",
                database: "connected",
                message: "Backend and PostgreSQL are working."
            });
        } catch (error) {
            console.error("Database health check failed:", error);

            res.status(503).json({
                success: false,
                status: "error",
                server: "running",
                database: "disconnected",
                message: "Database connection failed."
            });
        }
    }
);

// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

// ==========================================
// VACANCY ROUTES
// ==========================================

app.use("/api/vacancies", vacancyRoutes);
app.use("/vacancies", vacancyRoutes);

// ==========================================
// APPLICATION ROUTES
// ==========================================

app.use("/api/applications", applicationRoutes);
app.use("/applications", applicationRoutes);

// ==========================================
// STAFF ROUTES
// ==========================================

app.use("/api/staff", staffRoutes);
app.use("/staff", staffRoutes);

// ==========================================
// ADMISSION ENQUIRY ROUTES
// ==========================================

app.use("/api/admission-enquiries", admissionEnquiryRoutes);
app.use("/admission-enquiries", admissionEnquiryRoutes);

// ==========================================
// ONLINE APPLICATION ROUTES
// ==========================================

app.use("/api/online-applications", onlineApplicationRoutes);
app.use("/online-applications", onlineApplicationRoutes);

// ==========================================
// API 404 HANDLER
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found.",
        path: req.originalUrl
    });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
    console.error("Server Error:", error);

    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.status || 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode >= 500
                ? "Server error. Please try again later."
                : error.message
    });
});

// ==========================================
// START SERVER
// ==========================================

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log("---------------------------------------");
    console.log("Royal Heights Backend Started");
    console.log(`Port: ${PORT}`);
    console.log(
        `Environment: ${process.env.NODE_ENV || "development"}`
    );
    console.log("---------------------------------------");
});

// ==========================================
// SERVER ERROR HANDLING
// ==========================================

server.on("error", (error) => {
    console.error("Server startup error:", error);
    process.exit(1);
});

module.exports = app;
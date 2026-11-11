
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

const PORT = Number(process.env.PORT || 5000);
const isProduction = process.env.NODE_ENV === "production";

// ==========================================
// ENVIRONMENT VALIDATION
// ==========================================

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in server/.env");
}

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing in server/.env");
}

if (process.env.SESSION_SECRET.length < 32) {
  throw new Error(
    "SESSION_SECRET must contain at least 32 characters."
  );
}

// ==========================================
// CORS CONFIGURATION
// ==========================================

const allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

console.log("Allowed frontend origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      let isCloudflareOrigin = false;

      try {
        const parsed = new URL(normalizedOrigin);

        isCloudflareOrigin =
          parsed.protocol === "https:" &&
          parsed.hostname.endsWith(".trycloudflare.com");
      } catch {
        isCloudflareOrigin = false;
      }

      if (
        allowedOrigins.includes(normalizedOrigin) ||
        isCloudflareOrigin
      ) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      return callback(new Error("Origin not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ==========================================
// SECURITY AND BODY PARSING
// ==========================================

app.use(helmet());

app.use(express.json({ limit: "100kb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "20kb",
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

// ==========================================
// POSTGRESQL SESSION CONFIGURATION
// ==========================================

app.use(
  session({
    name: "rh.sid",

    store: new pgSession({
      pool,
      createTableIfMissing: true,
      tableName: "user_sessions",
    }),

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,

      secure: isProduction,

      sameSite: "lax",

      maxAge: 8 * 60 * 60 * 1000,

      path: "/",
    },
  })
);

// ==========================================
// API ROUTES
// ==========================================

// Authentication
app.use("/api/auth", authRoutes);

// Vacancies
app.use("/api/vacancies", vacancyRoutes);

// Job Applications
app.use("/api/applications", applicationRoutes);

// Staff Management
app.use("/api/staff", staffRoutes);

// Admission Enquiries
app.use("/api/admission-enquiries", admissionEnquiryRoutes);

// Online Student Applications
app.use("/api/online-applications", onlineApplicationRoutes);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");

    return res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint not found.",
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

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? "Server error. Please try again later."
        : error.message,
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, "0.0.0.0", () => {
  console.log("---------------------------------------");
  console.log("Royal Heights Backend Started");
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("---------------------------------------");
});


require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../src/db");

async function main() {
  const name = process.env.OWNER_NAME?.trim();
  const email = process.env.OWNER_EMAIL?.trim().toLowerCase();
  const password = process.env.OWNER_PASSWORD;

  if (!name || !email || !password || password.length < 12) {
    throw new Error(
      "Set OWNER_NAME, OWNER_EMAIL and OWNER_PASSWORD (minimum 12 characters)."
    );
  }

  const existing = await db.query(
    `SELECT id FROM admin_users
     WHERE LOWER(email) = LOWER($1)`,
    [email]
  );

  if (existing.rowCount > 0) {
    console.log("Owner account already exists. No changes made.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await db.query(
    `INSERT INTO admin_users
      (name, email, password_hash, role, active)
     VALUES ($1, $2, $3, 'owner', TRUE)
     RETURNING id, name, email, role`,
    [name, email, passwordHash]
  );

  console.log("Owner account created successfully!");
  console.log(result.rows[0]);
}

main()
  .catch((error) => {
    console.error("Owner creation failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.pool.end();
  });

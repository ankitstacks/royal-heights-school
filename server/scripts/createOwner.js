
require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../src/db");

async function main() {
  const name = process.env.OWNER_NAME;
  const email = process.env.OWNER_EMAIL?.trim().toLowerCase();
  const password = process.env.OWNER_PASSWORD;

  if (!name || !email || !password || password.length < 12) {
    throw new Error(
      "Set OWNER_NAME, OWNER_EMAIL and a strong OWNER_PASSWORD (at least 12 characters) in .env."
    );
  }

  const existing = await db.query(
    "SELECT id FROM admin_users WHERE email = $1",
    [email]
  );

  if (existing.rowCount) {
    console.log("Owner account already exists. No changes made.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.query(
    `INSERT INTO admin_users (name, email, password_hash, role)
     VALUES ($1, $2, $3, 'owner')`,
    [name, email, passwordHash]
  );

  console.log(`Owner account created for ${email}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => db.pool.end());

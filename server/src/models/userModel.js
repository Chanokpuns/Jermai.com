import pool from "./db.js";

export async function createUser({ name, phone, email, passwordHash }) {
  const [r] = await pool.execute(
    "INSERT INTO users (name, phone, email, password_hash) VALUES (?, ?, ?, ?)",
    [name, phone, email, passwordHash]
  );
  return r.insertId;
}

export async function findByEmail(email) {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
}

export async function findById(id) {
  const [rows] = await pool.execute(
    "SELECT id, name, phone, email FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

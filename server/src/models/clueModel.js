import pool from "./db.js";

export async function createClue({ postId, userId, location, description, date }) {
  const [r] = await pool.execute(
    "INSERT INTO clues (post_id, user_id, location, description, seen_date) VALUES (?, ?, ?, ?, ?)",
    [postId, userId, location, description, date]
  );
  return r.insertId;
}

export async function listCluesByPost(postId) {
  const [rows] = await pool.execute(
    `SELECT id, post_id AS postId, location, description, seen_date AS date, created_at AS createdAt
     FROM clues WHERE post_id = ? ORDER BY id DESC`,
    [postId]
  );
  return rows;
}

import pool from "./db.js";

const SELECT = `
  SELECT p.id, p.type, p.name, p.category, p.location, p.description, p.image,
         p.event_date AS date, p.status, p.created_at AS createdAt,
         p.user_id AS ownerId, u.name AS ownerName
  FROM posts p JOIN users u ON u.id = p.user_id`;

export async function listPosts({ type, q, category, status }) {
  const where = [];
  const params = [];
  if (type) { where.push("p.type = ?"); params.push(type); }
  if (category) { where.push("p.category = ?"); params.push(category); }
  if (status) { where.push("p.status = ?"); params.push(status); }
  if (q) {
    where.push("(p.name LIKE ? OR p.location LIKE ? OR p.description LIKE ?)");
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  const clause = where.length ? ` WHERE ${where.join(" AND ")}` : "";
  const [rows] = await pool.execute(`${SELECT}${clause} ORDER BY p.created_at DESC, p.id DESC`, params);
  return rows;
}

export async function listPostsByUser(userId) {
  const [rows] = await pool.execute(
    `${SELECT} WHERE p.user_id = ? ORDER BY p.created_at DESC, p.id DESC`,
    [userId]
  );
  return rows;
}

export async function getPost(id) {
  const [rows] = await pool.execute(`${SELECT} WHERE p.id = ?`, [id]);
  return rows[0] || null;
}

export async function createPost(d) {
  const [r] = await pool.execute(
    `INSERT INTO posts (user_id, type, name, category, location, description, image, event_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [d.userId, d.type, d.name, d.category, d.location, d.description || "", d.image || null, d.date]
  );
  return r.insertId;
}

export async function setStatus(id, status) {
  await pool.execute("UPDATE posts SET status = ? WHERE id = ?", [status, id]);
}

export async function deletePost(id) {
  await pool.execute("DELETE FROM posts WHERE id = ?", [id]);
}

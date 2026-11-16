import pool from "./db.js";

export async function getOrCreateConversation(postId, userId, otherId) {
  const [rows] = await pool.execute(
    `SELECT id FROM conversations
     WHERE post_id <=> ? AND ((user_a = ? AND user_b = ?) OR (user_a = ? AND user_b = ?))`,
    [postId, userId, otherId, otherId, userId]
  );
  if (rows[0]) return rows[0].id;
  const [r] = await pool.execute(
    "INSERT INTO conversations (post_id, user_a, user_b) VALUES (?, ?, ?)",
    [postId, userId, otherId]
  );
  return r.insertId;
}

export async function listConversations(userId) {
  const [rows] = await pool.execute(
    `SELECT c.id, c.post_id AS postId, p.name AS postName,
            u.id AS otherId, u.name AS otherName,
            (SELECT text FROM messages m WHERE m.conversation_id = c.id ORDER BY m.id DESC LIMIT 1) AS lastMessage,
            (SELECT MAX(id) FROM messages m WHERE m.conversation_id = c.id) AS lastMessageId
     FROM conversations c
     JOIN users u ON u.id = IF(c.user_a = ?, c.user_b, c.user_a)
     LEFT JOIN posts p ON p.id = c.post_id
     WHERE c.user_a = ? OR c.user_b = ?
     ORDER BY lastMessageId DESC, c.id DESC`,
    [userId, userId, userId]
  );
  return rows;
}

export async function getConversationForUser(id, userId) {
  const [rows] = await pool.execute(
    "SELECT * FROM conversations WHERE id = ? AND (user_a = ? OR user_b = ?)",
    [id, userId, userId]
  );
  return rows[0] || null;
}

export async function listMessages(conversationId) {
  const [rows] = await pool.execute(
    `SELECT id, sender_id AS senderId, text, created_at AS createdAt
     FROM messages WHERE conversation_id = ? ORDER BY id ASC`,
    [conversationId]
  );
  return rows;
}

export async function addMessage(conversationId, senderId, text) {
  const [r] = await pool.execute(
    "INSERT INTO messages (conversation_id, sender_id, text) VALUES (?, ?, ?)",
    [conversationId, senderId, text]
  );
  return r.insertId;
}

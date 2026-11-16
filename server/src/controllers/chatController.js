import * as Post from "../models/postModel.js";
import * as Chat from "../models/chatModel.js";

export async function open(req, res) {
  const post = await Post.getPost(req.body.postId);
  if (!post) return res.status(404).json({ message: "ไม่พบประกาศ" });
  if (post.ownerId === req.userId) {
    return res.status(400).json({ message: "แชทกับตัวเองไม่ได้" });
  }
  const id = await Chat.getOrCreateConversation(post.id, req.userId, post.ownerId);
  res.json({ id });
}

export async function list(req, res) {
  res.json(await Chat.listConversations(req.userId));
}

export async function messages(req, res) {
  const conv = await Chat.getConversationForUser(req.params.id, req.userId);
  if (!conv) return res.status(404).json({ message: "ไม่พบการสนทนา" });
  res.json(await Chat.listMessages(conv.id));
}

export async function send(req, res) {
  const conv = await Chat.getConversationForUser(req.params.id, req.userId);
  if (!conv) return res.status(404).json({ message: "ไม่พบการสนทนา" });
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ message: "ข้อความว่าง" });
  const id = await Chat.addMessage(conv.id, req.userId, text);
  res.status(201).json({ id });
}

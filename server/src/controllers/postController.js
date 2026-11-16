import * as Post from "../models/postModel.js";

const TYPES = ["lost", "found"];
const CATEGORIES = ["electronics", "document", "accessory", "other"];

export async function list(req, res) {
  res.json(await Post.listPosts(req.query));
}

export async function mine(req, res) {
  res.json(await Post.listPostsByUser(req.userId));
}

export async function getOne(req, res) {
  const post = await Post.getPost(req.params.id);
  if (!post) return res.status(404).json({ message: "ไม่พบประกาศ" });
  res.json(post);
}

export async function create(req, res) {
  const { type, name, category, location, description, date } = req.body;
  if (!TYPES.includes(type) || !name || !location || !date || !CATEGORIES.includes(category)) {
    return res.status(400).json({ message: "ข้อมูลประกาศไม่ครบหรือไม่ถูกต้อง" });
  }
  const id = await Post.createPost({
    userId: req.userId,
    type,
    name: name.trim(),
    category,
    location: location.trim(),
    description,
    date,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  });
  res.status(201).json(await Post.getPost(id));
}

async function ownedPost(req, res) {
  const post = await Post.getPost(req.params.id);
  if (!post) {
    res.status(404).json({ message: "ไม่พบประกาศ" });
    return null;
  }
  if (post.ownerId !== req.userId) {
    res.status(403).json({ message: "ไม่ใช่ประกาศของคุณ" });
    return null;
  }
  return post;
}

export async function updateStatus(req, res) {
  const post = await ownedPost(req, res);
  if (!post) return;
  if (!["open", "closed"].includes(req.body.status)) {
    return res.status(400).json({ message: "สถานะไม่ถูกต้อง" });
  }
  await Post.setStatus(post.id, req.body.status);
  res.json(await Post.getPost(post.id));
}

export async function remove(req, res) {
  const post = await ownedPost(req, res);
  if (!post) return;
  await Post.deletePost(post.id);
  res.status(204).end();
}

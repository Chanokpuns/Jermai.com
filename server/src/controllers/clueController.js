import * as Post from "../models/postModel.js";
import * as Clue from "../models/clueModel.js";

export async function send(req, res) {
  const post = await Post.getPost(req.params.id);
  if (!post) return res.status(404).json({ message: "ไม่พบประกาศ" });
  if (post.ownerId === req.userId) {
    return res.status(400).json({ message: "ส่งเบาะแสให้ประกาศของตัวเองไม่ได้" });
  }
  const { location, description, date } = req.body;
  if (!location || !description || !date) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลเบาะแสให้ครบ" });
  }
  const id = await Clue.createClue({
    postId: post.id,
    userId: req.userId,
    location: location.trim(),
    description: description.trim(),
    date,
  });
  res.status(201).json({ id });
}

export async function listForPost(req, res) {
  const post = await Post.getPost(req.params.id);
  if (!post) return res.status(404).json({ message: "ไม่พบประกาศ" });
  if (post.ownerId !== req.userId) {
    return res.status(403).json({ message: "ดูเบาะแสได้เฉพาะเจ้าของประกาศ" });
  }
  res.json(await Clue.listCluesByPost(post.id));
}

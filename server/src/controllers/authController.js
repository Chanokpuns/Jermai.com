import bcrypt from "bcryptjs";
import { signToken } from "../middleware/auth.js";
import * as User from "../models/userModel.js";

const publicUser = (u) => ({ id: u.id, name: u.name, phone: u.phone, email: u.email });

export async function register(req, res) {
  const { name, phone, email, password } = req.body;
  if (!name || !phone || !email || !password) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" });
  }
  const cleanEmail = email.trim().toLowerCase();
  if (await User.findByEmail(cleanEmail)) {
    return res.status(409).json({ message: "อีเมลนี้ถูกใช้งานแล้ว" });
  }
  const id = await User.createUser({
    name: name.trim(),
    phone: phone.trim(),
    email: cleanEmail,
    passwordHash: await bcrypt.hash(password, 10),
  });
  const user = await User.findById(id);
  res.status(201).json({ token: signToken(user), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = email && (await User.findByEmail(email.trim().toLowerCase()));
  if (!user || !password || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }
  res.json({ token: signToken(user), user: publicUser(user) });
}

export async function me(req, res) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "ไม่พบผู้ใช้" });
  res.json({ user });
}

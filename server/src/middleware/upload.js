import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../uploads");
fs.mkdirSync(dir, { recursive: true });

export const UPLOAD_DIR = dir;

export const upload = multer({
  storage: multer.diskStorage({
    destination: dir,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      const err = new Error("อัปโหลดได้เฉพาะไฟล์รูปภาพ");
      err.status = 400;
      return cb(err);
    }
    cb(null, true);
  },
});

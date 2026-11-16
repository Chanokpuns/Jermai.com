import { Router } from "express";
import { asyncHandler as h } from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import * as posts from "../controllers/postController.js";
import * as clues from "../controllers/clueController.js";

const r = Router();
r.get("/", h(posts.list));
r.get("/mine", requireAuth, h(posts.mine));
r.get("/:id", h(posts.getOne));
r.post("/", requireAuth, upload.single("image"), h(posts.create));
r.patch("/:id/status", requireAuth, h(posts.updateStatus));
r.delete("/:id", requireAuth, h(posts.remove));

r.post("/:id/clues", requireAuth, h(clues.send));
r.get("/:id/clues", requireAuth, h(clues.listForPost));
export default r;

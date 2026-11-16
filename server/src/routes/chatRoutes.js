import { Router } from "express";
import { asyncHandler as h } from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as c from "../controllers/chatController.js";

const r = Router();
r.use(requireAuth);
r.get("/conversations", h(c.list));
r.post("/conversations", h(c.open));
r.get("/conversations/:id/messages", h(c.messages));
r.post("/conversations/:id/messages", h(c.send));
export default r;

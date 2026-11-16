import { Router } from "express";
import { asyncHandler as h } from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as c from "../controllers/authController.js";

const r = Router();
r.post("/register", h(c.register));
r.post("/login", h(c.login));
r.get("/me", requireAuth, h(c.me));
export default r;

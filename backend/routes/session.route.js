import express from 'express';
import { createSession,getSessionById,getMySessions,deleteSession } from "../controllers/session.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",protectRoute, createSession);
router.get("/my-session",protectRoute, getMySessions);
router.get("/:id", protectRoute, getSessionById);
router.delete('/:id', protectRoute, deleteSession);

export default router;
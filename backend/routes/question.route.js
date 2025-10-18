import express from 'express';
import { togglePinQuestion,updateQuestionNote,addQuestionsToSession } from "../controllers/question.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add",protectRoute, addQuestionsToSession);
router.post("/:id/pin",protectRoute, togglePinQuestion);
router.post("/:id/note", protectRoute, updateQuestionNote);

export default router;
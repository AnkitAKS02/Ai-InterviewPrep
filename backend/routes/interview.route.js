import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { generateFeedback, generateQuestionForInterview, getInterviewFeedbackById, getInterviews, updateInterviewDetails } from "../controllers/interview.controller.js";

const router = express.Router();

router.use(protectRoute);

//create interview question on the basis of role,desc,exp,topic(not required)
router.post('/questions', generateQuestionForInterview);
//generate feedback on the given ans and question
router.post('/feedback', generateFeedback);
//fetch all the interviews happened
router.get('/fetch-interviews', getInterviews);
//fetch the feedbacks of prev interviews
router.get('/fetch-interview/:id', getInterviewFeedbackById);
//update the answers if already the interview has been created once
router.post('/redo-interview', updateInterviewDetails);
export default router;
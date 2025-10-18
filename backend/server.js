import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import resumeRoutes from './routes/resume.route.js'
import sessionRoutes from './routes/session.route.js';
import questionRoutes from './routes/question.route.js'
import userFriendRoutes from './routes/userFriend.route.js'
import { generateConceptExplanation,generateInterviewQuestion } from './controllers/ai.controller.js';
import { protectRoute } from './middleware/auth.middleware.js';
import { analyzeResume } from './controllers/ai.resume.analyser.js';
import { upload } from './lib/multer.js';
import {app,io,server} from './lib/socket.js'
const PORT = process.env.PORT || 3002;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cookieParser());
//resume builder -- done
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
//question generator -- done
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);
app.use("/api/ai/generate-question", protectRoute, generateInterviewQuestion);
app.use("/api/ai/generate-explanation", protectRoute, generateConceptExplanation);

//resume analyser -- done
app.use('/api/ai/resume-analyser',upload.single("resumeFile") , analyzeResume);

//community == wbsocket and webrtc
//comunity-build -- wroking
app.use('/api/userFriend', userFriendRoutes);




// app.use(cors());

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port:${PORT}`);
})



// {
//
//   "fullName": "Ankit Kumar","_id": "68f365ecb55b857e9833d2b5"
//   "email": "ankitkumar@example.com",
//   "password": "Ankit@123"
// }


// "_id": "68f3664e64615ab7469c9ee2",
//   "fullName": "Riya Sharma",
//     "email": "riyasharma@example.com",
//       "password": "Riya@123"
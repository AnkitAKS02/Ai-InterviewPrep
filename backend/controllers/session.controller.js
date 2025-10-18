import Session from "../models/session.model.js";
import Question from "../models/question.model.js";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxMGUzOTc5ZDFlZDNmNzgzZDQ5Y2YiLCJpYXQiOjE3NTk1Nzk3MDUsImV4cCI6MTc2MDE4NDUwNX0.r9xm0BxfAMiUpJnjFWEhfbvwTFIHFUa1shEiMjhiIh4
export const createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions = [] } = req.body;

        if (!role || !experience || !topicsToFocus) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });
        const questionsArray = Array.isArray(questions) ? questions : [];

        const questionDocs = await Promise.all(
            questionsArray.map(async (q) => {
                const question = await Question.create({
                    session: session?._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();
        console.log(session);
        res.status(201).json({ success: true, session });
    } catch (error) {
        console.log("Error in creating session:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate("questions");

        res.status(200).json(sessions);
    } catch (error) {
        console.log("Error in getting session:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: -1 } },
        }).exec();

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.status(200).json({ success: true, session });
    } catch (error) {
        console.log("Error in fetching session by ID:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.user.toString() != req.user.id) {
            return res.status(401).json("Not authorized to delete this session");
        }

        await Question.deleteMany({ session: session._id });

        // Delete the session itself
        await session.deleteOne();

        res.status(200).json({ message: "Session deleted successfuly" });
    } catch (error) {
        console.log("Error in deleting questions and  session:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
import { GoogleGenAI } from '@google/genai';
import { conceptExplainPrompt, questionAnswerPrompt } from '../utils/prompts.js';
import {interviewQuestions} from '../utils/data.js'
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


export const generateInterviewQuestion = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestion } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestion) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const topic = topicsToFocus.trim().toLowerCase();

        // ✅ STEP 1: Try to find a matching topic key from local data
        const matchedTopicKey = Object.keys(interviewQuestions).find((key) =>
            key.toLowerCase().includes(topic)
        );

        if (matchedTopicKey) {
            console.log("✅ Using local questions for:", matchedTopicKey);

            const allQuestions = interviewQuestions[matchedTopicKey];

            // Safely limit the number of questions
            const selectedQuestions = allQuestions.slice(0, Number(numberOfQuestion));

            return res.status(200).json({
                source: "local",
                topic: matchedTopicKey,
                count: selectedQuestions.length,
                questions: selectedQuestions, // [{question, answer}, ...]
            });
        }

        // ✅ STEP 2: If topic not found locally, use AI to generate
        console.log("⚡ Fetching from AI for topic:", topic);

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestion);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        });

        const rawText = response.text || "";

        const cleanText = rawText
            .replace(/^```json\s*/i, "")
            .replace(/```$/i, "")
            .trim();

        let data;
        try {
            data = JSON.parse(cleanText);
        } catch (parseError) {
            console.error("JSON parse error:", parseError.message);
            return res.status(500).json({
                message: "AI response was not valid JSON",
                raw: cleanText,
            });
        }

        res.status(200).json({
            source: "ai",
            topic: topicsToFocus,
            count: data.length,
            questions: data,
        });

    } catch (error) {
        console.error("Error in generating interview questions:", error.message);
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};


export const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        })

        // ✅ Extract text properly (adjust if your SDK response shape is different)
        const rawText = response.text || "";

        // ✅ Clean markdown wrappers
        const cleanText = rawText
            .replace(/^```json\s*/i, "")
            .replace(/```$/i, "")
            .trim();

        // ✅ Parse safely
        let data;
        try {
            data = JSON.parse(cleanText);
        } catch (parseError) {
            console.log("JSON parse error:", parseError.message);
            return res.status(500).json({
                message: "AI response was not valid JSON",
                raw: cleanText,
            });
        }

        res.status(200).json(data);
    } catch (error) {
        console.log("Error in creating question in ai:", error.message);
        res.status(500).json({
            message: "Failed to generate question",
            error: error.message,
        });
    }
}
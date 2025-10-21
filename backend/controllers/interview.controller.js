import express from 'express'
import Question from '../models/question.model.js';
import {generateInterviewPrompt} from '../utils/prompts.js'
import { GoogleGenAI } from '@google/genai';

//db model creation remains

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateQuestionForInterview = async (req, res) => {
  try {
    const { role, jobDescription, experience, topicsToFocus } = req.body;

    // ✅ Basic validation
    if (!role || !jobDescription || !experience) {
      return res.status(400).json({
        message: "Missing required fields: role, jobDescription, or experience",
      });
    }

    const prompt = generateInterviewPrompt(role, jobDescription, experience, topicsToFocus);

    console.log("⚡ Generating interview questions for:", role);

    // ✅ Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
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
      role,
      count: data.length,
      questions: data,
    });
  } catch (error) {
    console.error(" Error generating questions:", error.message);
    res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};


export const generateFeedback = (req, res) => {
    
}

export const getInterviews = (req, res) => {
    
}

export const getInterviewFeedbackById = (req, res) => {
    
}

export const updateInterviewDetails = (req, res) => {
    
}
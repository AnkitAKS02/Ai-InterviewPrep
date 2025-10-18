// import { extractPdfText } from "../utils/helper.js";
import { upload } from "../lib/multer.js";
import fs from "fs";
import axios from "axios";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from '@google/genai';
import { prepareInstructions } from "../utils/prompts.js";
import { AIResponse } from "../models/aiAnalyse.model.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// import { convertPdfToImages } from "../utils/pdfToImg.js";


export const analyzeResume = async (req, res) => {
  try {
    console.log("it came");
    const { jobTitle, jobDescription } = req.body;
    const resumeFile = req.file;

    if (!jobTitle) {
      return res.status(400).json({ message: "Job title is required" });
    }
    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // const pdfPath = resumeFile.path;
    // const dataBuffer = fs.readFileSync(pdfPath);

    // // ✅ Extract text using pdf-parse
    // const pdfData = await PDFParse(dataBuffer);
    // const text = pdfData.text;

    const pdfBuffer = req.file.buffer;
    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);
    // const pdfData = await PDFParse(dataBuffer);
    const parser = new PDFParse({ data: dataBuffer });

    let pdfData = "";
    parser.getText().then((result) => {
      pdfData = result.text;
      console.log(pdfData);
    }).finally(async () => {
      await parser.destroy();
    });


    // 2️⃣ Prepare prompt
    const prompt = prepareInstructions({
      jobTitle,
      text: pdfData,
    });

    // 3️⃣ Call Google Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText = response.text || "";
    const cleanText = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

    let feedback;
    try {
      feedback = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      return res.status(500).json({ message: "AI response was not valid JSON", raw: cleanText });
    }

    // Save to DB using your exact AIResponse schema structure
    const aiResponse = new AIResponse({
      overallScore: feedback.overallScore,

      ATS: {
        score: feedback.ATS.score,
        tips: feedback.ATS.tips.map(tip => ({
          type: tip.type,
          tip: tip.tip
          // No explanation for ATS tips as per your schema
        }))
      },

      toneAndStyle: {
        score: feedback.toneAndStyle.score,
        tips: feedback.toneAndStyle.tips.map(tip => ({
          type: tip.type,
          tip: tip.tip,
          explanation: tip.explanation
        }))
      },

      content: {
        score: feedback.content.score,
        tips: feedback.content.tips.map(tip => ({
          type: tip.type,
          tip: tip.tip,
          explanation: tip.explanation
        }))
      },

      structure: {
        score: feedback.structure.score,
        tips: feedback.structure.tips.map(tip => ({
          type: tip.type,
          tip: tip.tip,
          explanation: tip.explanation
        }))
      },

      skills: {
        score: feedback.skills.score,
        tips: feedback.skills.tips.map(tip => ({
          type: tip.type,
          tip: tip.tip,
          explanation: tip.explanation
        }))
      },

      // Optional metadata
      createdAt: new Date()
    });

    await aiResponse.save();
    console.log(feedback);
    // 5️⃣ Return structure JSON with feedback 
    res.status(200).json({
      feedbackData: feedback
    });

  } catch (error) {
    console.error("Error in analyzing resume:", error.message);
    res.status(500).json({ message: "Failed to analyze resume", error: error.message });
  }
};
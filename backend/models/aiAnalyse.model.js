import mongoose from "mongoose";

const TipSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["good", "improve"],
    required: true,
  },
  tip: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

const SectionSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  tips: {
    type: [TipSchema],
    validate: [(val) => val.length <= 5, "Too many tips"],
  },
});

const AIResponseSchema = new mongoose.Schema(
  {
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    ATS: {
      score: { type: Number, min: 0, max: 100 },
      tips: [TipSchema],
    },
    toneAndStyle: SectionSchema,
    content: SectionSchema,
    structure: SectionSchema,
    skills: SectionSchema,

    // Optional metadata (helpful for real-world use)
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const AIResponse = mongoose.model("AIResponse", AIResponseSchema);
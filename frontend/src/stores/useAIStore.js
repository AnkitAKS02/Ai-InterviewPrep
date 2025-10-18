import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import axios from "axios";

export const useAIStore = create((set, get) => ({
  interviewQuestions: [],
  conceptExplanation: null,
  aiResumeFeedback: null,
  loading: false,
  error: null,

  // ✅ Generate AI interview questions
  generateInterviewQuestion: async ({ role, experience, topicsToFocus, numberOfQuestion }) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/ai/generate-question", {
        role, experience, topicsToFocus, numberOfQuestion
      });
      set({ interviewQuestions: res.data });
      return res.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },


  // ✅ Generate concept explanation
  generateConceptExplanation: async (payload) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post("/ai/generate-explanation", payload);
      set({ conceptExplanation: res.data, loading: false });
      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      return null;
    }
  },

  analyzeResume: async ({ file, jobTitle, jobDescription }) => {
    try {
      set({ loading: true, error: null });

      const formData = new FormData();
      formData.append("resumeFile", file);
      formData.append("jobTitle", jobTitle);
      if (jobDescription) formData.append("jobDescription", jobDescription);

      const res = await axiosInstance.post("/ai/resume-analyser",formData);

      // if (!res.ok) throw new Error("Failed to analyze resume");
      // const data = await res.json();

      set({ aiResumeFeedback: res.data.feedbackData, loading: false });
      console.log("✅ Resume feedback:", data.feedbackData);
      return data.feedbackData;
    } catch (error) {
      console.error("❌ Upload error:", error);
      set({ error: error.message, loading: false });
      return null;
    }
  },




  // ✅ Clear previous AI results
  //   clearAIResults: () => set({ interviewQuestions: [], conceptExplanation: null }),
}));

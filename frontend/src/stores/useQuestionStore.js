import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";

export const useQuestionStore = create((set, get) => ({
  questions: [],
  loading: false,
  error: null,

  // ✅ Add multiple questions to a session
  addQuestionsToSession: async (sessionId, questions) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post("/questions/add", {
        sessionId,
        questions,
      });
      set((state) => ({
        questions: [...state.questions, ...res.data],
        loading: false,
      }));
      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      return null;
    }
  },

  // ✅ Toggle pin/unpin on a question
  togglePinQuestion: async (id) => {
    try {
      const res = await axiosInstance.patch(`/questions/toggle-pin/${id}`);
      set((state) => ({
        questions: state.questions.map((q) =>
          q._id === id ? res.data.question : q
        ),
      }));
      return res.data.question;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      return null;
    }
  },

  // ✅ Update note of a question
  updateQuestionNote: async (id, note) => {
    try {
      const res = await axiosInstance.patch(`/questions/note/${id}`, { note });
      set((state) => ({
        questions: state.questions.map((q) =>
          q._id === id ? res.data.question : q
        ),
      }));
      return res.data.question;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      return null;
    }
  },

  // ✅ Optional: Reset all questions (for cleanup)
//   clearQuestions: () => set({ questions: [] }),
}));

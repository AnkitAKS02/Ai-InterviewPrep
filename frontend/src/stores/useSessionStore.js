import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import toast from "react-hot-toast";
export const useSessionStore = create((set, get) => ({
    sessions: [],
    isLoading: false,
    error: null,

    // ✅ Create a new session
    createSession: async ({ role, experience, topicsToFocus, description, questions = [] }) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.post("/sessions/create", { role, experience, topicsToFocus, description, questions });
            set((state) => ({
                sessions: [res.data.session, ...state.sessions],
                isLoading: false,
            }));
            return res; //  return response so caller can use it
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            return null; // return null so caller can check
        } finally {
            set({ isLoading: false });
        }
    },


    // ✅ Fetch all sessions for the logged-in user
    fetchMySessions: async () => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get("/sessions/my-session");
            set({ sessions: res.data, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false,
            });
            toast.error(error.message);
        }
    },

    // ✅ Fetch a single session by ID
    fetchSessionById: async (id) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get(`/sessions/${id}`);
            set({ isLoading: false });
            return res.data.session;
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false,
            });
            return null;
        }
    },

    // ✅ Delete a session
    deleteSession: async (id) => {
        try {
            await axiosInstance.delete(`/sessions/${id}`);
            set((state) => ({
                sessions: state.sessions.filter((s) => s._id !== id),
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
        }
    },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogged: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/profile");
      set({ authUser: res.data, isLogged: true });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null, isLogged: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async ({ fullName, email, password, profilePicture }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", {
        fullName,
        email,
        password,
        profilePicture, 
      });
      set({ authUser: res.data, isLogged: true });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isLogged: false });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data, isLogged: true });
      console.log(get().authUser);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ isLogged: false });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, isLogged: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } 
  },

  
//   updateProfile: async (data) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       set({ authUser: res.data });
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("error in update profile:", error);
//       toast.error(error.response?.data?.message || "Update failed");
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import { toast } from "react-hot-toast";

export const useResumeStore = create((set, get) => ({
  resumes: [],
  selectedResume: null,
  isLoading: false,
  error: null,

  // Fetch all resumes for the user
  fetchResumes: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/resumes");

      // Normalize API response
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.resumes || [];

      set({ resumes: data, isLoading: false });

      console.log("Fetched resumes:", data);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ error: message, isLoading: false });
      toast.error(`Error fetching resumes: ${message}`);
    }
  },

  // Fetch a single resume by ID
  fetchResumeById: async (id) => {
    set({ isLoading: true, error: null, selectedResume: null });
    try {
      const res = await axiosInstance.get(`/resumes/${id}`);

      if (res.data) {
        const resumeInfo = res.data;

        set((prevState) => ({
          ...prevState,
          isLoading: false,
          selectedResume: {
            ...prevState.selectedResume,
            title: resumeInfo.title || prevState.selectedResume?.title || "Untitled",
            template: resumeInfo.template || prevState.selectedResume?.template,
            profileInfo: resumeInfo.profileInfo || prevState.selectedResume?.profileInfo,
            contactInfo: resumeInfo.contactInfo || prevState.selectedResume?.contactInfo,
            workExperience: resumeInfo.workExperience || prevState.selectedResume?.workExperience,
            education: resumeInfo.education || prevState.selectedResume?.education,
            skills: resumeInfo.skills || prevState.selectedResume?.skills,
            projects: resumeInfo.projects || prevState.selectedResume?.projects,
            certifications: resumeInfo.certifications || prevState.selectedResume?.certifications,
            languages: resumeInfo.languages || prevState.selectedResume?.languages,
            interests: resumeInfo.interests || prevState.selectedResume?.interests,
          },
        }));
      }

      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ error: message, isLoading: false });
      toast.error(`Error fetching resume: ${message}`);
      throw err;
    }
  },


  // Create a new resume
  createResume: async (title) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/resumes", { title });

      const newResume = res.data.resume || res.data; // normalize

      const currentResumes = get().resumes || [];
      set({
        resumes: [newResume, ...currentResumes],
        isLoading: false,
      });

      toast.success("Resume created successfully");
      return newResume;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ error: message, isLoading: false });
      toast.error(`Error creating resume: ${message}`);
      throw err;
    }
  },

  // Update a resume
  updateResume: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.put(`/resumes/${id}`, updatedData);
      const updatedResume = res.data.resume || res.data; // normalize

      set((state) => ({
        resumes: state.resumes.map((r) =>
          r._id === id ? updatedResume : r
        ),
        selectedResume: updatedResume,
        isLoading: false,
      }));

      toast.success("Resume updated successfully");
      return updatedResume;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ error: message, isLoading: false });
      toast.error(`Error updating resume: ${message}`);
      throw err;
    }
  },

  // Delete a resume
  deleteResume: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/resumes/${id}`);

      set((state) => ({
        resumes: state.resumes.filter((resume) => resume._id !== id),
        isLoading: false,
      }));

      toast.success("Resume deleted successfully");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ error: message, isLoading: false });
      toast.error(`Error deleting resume: ${message}`);
    }
  },

  // Upload thumbnail/profile image
  uploadResumeImage: async (id, { newThumbnail, newProfileImage }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post(`/resumes/${id}/upload-image`, {
        newThumbnail,
        newProfileImage,
      });

      const { thumbnailLink, profilePreviewUrl } = res.data;

      // update state with new links
      set((state) => ({
        resumes: state.resumes.map((r) =>
          r._id === id
            ? {
              ...r,
              thumbnailLink: thumbnailLink || r.thumbnailLink,
              profileInfo: {
                ...r.profileInfo,
                profilePreviewUrl: profilePreviewUrl || r.profileInfo?.profilePreviewUrl,
              },
            }
            : r
        ),
        isLoading: false,
      }));

      toast.success("Images uploaded successfully");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      set({ error: message, isLoading: false });
      toast.error(`Error uploading image: ${message}`);
      throw err;
    }
  },
}));

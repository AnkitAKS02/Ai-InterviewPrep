import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import toast from "react-hot-toast";

export const useFriendStore = create((set, get) => ({
  // State
  recommendedUsers: [],
  myFriends: [],
  incomingRequests: [],
  outgoingRequests: [],
  acceptedRequests: [],
  isLoadingRecommended: false,
  isLoadingFriends: false,
  isLoadingRequests: false,
  isSendingRequest: false,
  isAcceptingRequest: false,

  // Actions
  getRecommendedUsers: async () => {
    set({ isLoadingRecommended: true });
    try {
      const res = await axiosInstance.get("/userFriend");
      set({ recommendedUsers: res.data });
    } catch (error) {
      console.log("Error in getRecommendedUsers:", error);
      toast.error(error.response?.data?.message || "Failed to fetch recommended users");
    } finally {
      set({ isLoadingRecommended: false });
    }
  },

  getMyFriends: async () => {
    set({ isLoadingFriends: true });
    try {
      const res = await axiosInstance.get("/userFriend/friends");
      set({ myFriends: res.data });
    } catch (error) {
      console.log("Error in getMyFriends:", error);
      toast.error(error.response?.data?.message || "Failed to fetch friends");
    } finally {
      set({ isLoadingFriends: false });
    }
  },

  getFriendRequests: async () => {
    set({ isLoadingRequests: true });
    try {
      const res = await axiosInstance.get("/userFriend/friend-requests");
      set({ 
        incomingRequests: res.data.incomingRequests,
        acceptedRequests: res.data.acceptedRequest || [],
      });
    } catch (error) {
      console.log("Error in getFriendRequests:", error);
      toast.error(error.response?.data?.message || "Failed to fetch friend requests");
    } finally {
      set({ isLoadingRequests: false });
    }
  },

  getOutgoingFriendRequests: async () => {
    set({ isLoadingRequests: true });
    try {
      const res = await axiosInstance.get("/userFriend/outgoing-friend-requests");
      set({ outgoingRequests: res.data || [] });
    } catch (error) {
      console.log("Error in getOutgoingFriendRequests:", error);
      toast.error(error.response?.data?.message || "Failed to fetch outgoing requests");
    } finally {
      set({ isLoadingRequests: false });
    }
  },

  sendFriendRequest: async (id) => {
    set({ isSendingRequest: true });
    try {
      const res = await axiosInstance.post(`/userFriend/friend-request/${id}`);
      toast.success("Friend request sent successfully");
      get().getOutgoingFriendRequests(); // refresh outgoing requests
    } catch (error) {
      console.log("Error in sendFriendRequest:", error);
      toast.error(error.response?.data?.message || "Failed to send friend request");
    } finally {
      set({ isSendingRequest: false });
    }
  },

  acceptFriendRequest: async (id) => {
    set({ isAcceptingRequest: true });
    try {
      const res = await axiosInstance.post(`/userFriend/friend-request/${id}/accept`);
      toast.success("Friend request accepted");
      get().getFriendRequests(); // refresh incoming requests
      get().getMyFriends(); // refresh friends list
    } catch (error) {
      console.log("Error in acceptFriendRequest:", error);
      toast.error(error.response?.data?.message || "Failed to accept friend request");
    } finally {
      set({ isAcceptingRequest: false });
    }
  },
}));

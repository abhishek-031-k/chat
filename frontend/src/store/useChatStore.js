import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
   selectedUser: null ,
  isUsersLoading: true, 
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  // ✅ FIX: Reset loading and clear arrays immediately when tab changes
  setActiveTab: (tab) => set({ 
    activeTab: tab, 
    isUsersLoading: true, 
    chats: [], 
    allContacts: [],
    selectedUser: null  
  }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load contacts");
      set({ allContacts: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load chats");
      set({ chats: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ... rest of your message functions (getMessagesByUserId, sendMessage, etc.)
}));
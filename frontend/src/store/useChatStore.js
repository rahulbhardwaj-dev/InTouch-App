import {create} from 'zustand';
import {axiosInstance} from '../libs/axios.js';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useChatStore = create((set,get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem('isSoundEnabled')) === 'true',

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled); 
        set((state) => ({isSoundEnabled: !get().isSoundEnabled}));
    },
    setActiveTab: (tab) => set({activeTab: tab}),//tab is what user wants to see (chats or contacts)
    setSelectedUser: (user) => set({selectedUser: user}),

    getAllContacts: async () => {
        set({isUsersLoading: true});
        try {
            const response = await axiosInstance.get("/messages/contacts");
            set({allContacts: response.data});
        } catch (error) {
            toast.error("Failed to load contacts");
        } finally {
            set({isUsersLoading: false});
        }
    },
    getChats: async () => {
        set({isUsersLoading: true});
        try {
            const response = await axiosInstance.get("/messages/chats");
            set({chats: response.data});
        } catch (error) {
            toast.error("Failed to load chats");
        } finally {
            set({isUsersLoading: false});
        }
    },
    
}))

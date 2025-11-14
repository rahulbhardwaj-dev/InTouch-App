import {create} from 'zustand';
import {axiosInstance} from '../libs/axios.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

//created a zustand store to manage authentication state

export const useAuthStore = create((set,get) => ({
    authUser: null, //Starts as null because you don’t yet know if the user is logged in.
    isCheckingAuthStatus: true,//boolean to show if the app is still checking authentication
    isSigningUp : false, //initally false, becomes true when signup is in progress
    isLogginIn: false, //boolean to indicate if login is in progress
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {//API call to check if user is authenticated
            const res = await axiosInstance.get("/auth/check");
            // setted up this route in authRoutes
            set({ authUser: res.data.user});

            get().connectSocket()

        } catch (error) {
            //if user is not authenticated, authuser remains null
            console.error("Error checking auth status:", error);
            set({ authUser: null });
        } finally{
            set({ isCheckingAuthStatus: false });
        }
    },
    signup: async(data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup",data); 
            set({authUser: res.data});//this res.data is coming from the authController signup method
            toast.success("Signup successful! Welcome to InTouch.");

            get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({isSigningUp: false});
        }
    },
    login : async(data) => {
        set({isLogginIn: true});
        try {
            const res = await axiosInstance.post("/auth/login",data); 
            set({authUser: res.data});//this res.data is coming from the authController login method
            toast.success("Login successful! Welcome back to InTouch.");

            get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({isLogginIn: false});
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout"); 
            set({ authUser: null });
            toast.success("Logged out successfully.");

            get().disconnectSocket();

        } catch (error) {
            toast.error(error.response.data.message);

        } 
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile Picture updated successfully.");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Profile update error:", error);
        }
    },

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {withCredentials:true})

        socket.connect()
        set({socket:socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers : userIds})
        })
    },

    disconnectSocket : () => {
    if(get().socket?.connected)    get().socket.disconnect()
    }

}))

export default useAuthStore;

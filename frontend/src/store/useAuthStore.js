import {create} from 'zustand';
import {axiosInstance} from '../libs/axios.js';
import axios from 'axios';
import toast from 'react-hot-toast';

//created a zustand store to manage authentication state

export const useAuthStore = create((set) => ({
    authUser: null, //Starts as null because you don’t yet know if the user is logged in.
    isCheckingAuthStatus: true,//boolean to show if the app is still checking authentication
    isSigningUp : false, //initally false, becomes true when signup is in progress
    isLogginIn: false, //boolean to indicate if login is in progress

    checkAuth: async () => {
        try {//API call to check if user is authenticated
            const res = await axiosInstance.get("/auth/check");
            // setted up this route in authRoutes
            set({ authUser: res.data.user});

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

        } catch (error) {
            toast.error(error.response.data.message);

        } 
    },

}))

export default useAuthStore;

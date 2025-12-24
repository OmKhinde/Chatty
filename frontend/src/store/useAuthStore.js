import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,

    checkAuth : async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser : res.data});
        } catch (error) {
            console.log("Error in the CheckAuth:",error);
            set({authUser : null});
        }finally{
            set({isCheckingAuth : false});
        }
    },

    signup : async(data)=>{
        set({isSigningUp : true});

        try {
            const payload = {
                fullname: data.fullName,
                email: data.email,
                password: data.password,
            };

            const res = await axiosInstance.post("/auth/signup", payload);
            set({authUser : res.data});
            toast.success("Account created succesfully");
            console.log("user registered : ",res.data.fullName)
        } catch (error) {
            const message = error?.response?.data?.message || "Signup failed";
            toast.error(message);
            console.log("error is in the signup")
        }finally{
            set({isSigningUp : false});
        }
    },

    logout : async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("user logged out succefully");
            console.log("user logged out");
        } catch (error) {
            toast.error("error in logging out",error?.response?.data?.message );
        }
    },

    login : async(data)=>{
        set({isLoggingIn : true});
        try {
            const payload = {
                email: data.email,
                password: data.password,
            };

            const res = await axiosInstance.post("/auth/login", payload);
            set({authUser : res.data});
            toast.success("Logged in succesfully");
            console.log("login user: ",res.data.email);
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed";
            toast.error(message);
            console.log("error is in the login")
        }finally{
            set({isLoggingIn : false});
        }
    },

    updateProfile: async (profilepic) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", { profilepic });
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            const message = error.response.data.message || "Failed to update profile";
            toast.error(message);
            console.log("error in updateProfile", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}))
import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib/axios.js"

export const useChatStore = create((set,get)=>({
    messages : [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,
    
    getUsers : async()=>{
        set ({isUsersLoading : true });
        try {
            const res = await axiosInstance.get("/messages/users");
            console.log("users from getusers ",res);
            set({users : res.data});
        } catch (error) {
            toast.error(error.response.data.messages);
             console.log("error in getUsers");
        }finally{
            set ({isUsersLoading : false })
        }
    },

     getMessages : async(userId)=>{
        set ({isMessagesLoading : true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            console.log("users from getmessages ",res);
            set({messages : res.data});
        } catch (error) {
            toast.error(error.response.data.messages);
            console.log("error in getMessages");
        }finally{
            set ({isMessagesLoading : false })
        }
    },

    sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] }); //add new message in the message array 
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in the sendMessage function");
    }
  },

    setSelectedUser : (selectedUser)=>set({selectedUser})
}))
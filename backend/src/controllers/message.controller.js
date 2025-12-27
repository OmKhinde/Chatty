import { getReceiversocketId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import {v2 as cloudinary } from "cloudinary";
import { io } from "../lib/socket.js";


export  const getUsersForSidebar  = async (req,res)=>{
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id : {$ne : loggedInUser}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        //console.log("error in getUsersForSidebar controller : ",error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export const getMessages = async(req,res)=>{
    try {
        
        const myId = req.user._id;
        const {id:usertoChatId} = req.params;

        const messages = await Message.find({
            $or:[
                {senderID : myId,receiverID : usertoChatId},
                {senderID : usertoChatId, receiverID : myId}
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
        //console.log("error in getMessages controller : ",error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export const sendMessages = async (req,res)=>{
   try {
    
     const senderID = req.user._id;
     const {text,image}  = req.body;
    const {id: receiverID} = req.params;

    let imageUrl ;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
         imageUrl = uploadResponse.secure_url
    }

    const newMessage = new Message({
        senderID,
        receiverID,
        text,
        image : imageUrl
    })

    await newMessage.save();

    // real time functionality goes here
    const receiverSocketId = getReceiversocketId(receiverID);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }
    
    res.status(200).json(newMessage)
   } catch (error) {
       // console.log("error in sendMessages controller : ",error.message);
        res.status(500).json({message : "Internal Server Error"});
   }

}
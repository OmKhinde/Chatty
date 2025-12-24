import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from  "bcryptjs";
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req,res)=>{
  const  {fullname,email,password} = req.body;
  try {
    if(!fullname || !email || !password){
        return res.status(400).json({message  : "All fields are required."});
    }
    if(password.length<6){
        return res.status(400).json({message  : "password must be of atleast 6 characters."});
    }

    const user = await User.findOne({email});
    if(user) {
        return res.status(400).json({message : "Email already exists."});
    }

    const salt  = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser  = new User({
        fullname,
        email,
        password : hashedPassword,
    })

    if(newUser){
        //generate jwt token 
        generateToken(newUser._id,res)
        await newUser.save();

        return res.status(201).json({
            _id: newUser._id,
            fullname : newUser.fullname,
            email : newUser.email,
            profilepic: newUser.profilepic
        });

    }else{
        return res.status(400).json({message : "Invalid User Data."});
    }

  } catch (error) {
    console.log("error in signup controller",error.message);
    return res.status(500).json({message : "Internal Server Error"});
  }
}

export const login = async (req,res)=>{
    const  {email,password}  = req.body;
    try {
        const user = await  User.findOne({email});
        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }
        const ispasswordcorrect = await bcrypt.compare(password,user.password);
        if(!ispasswordcorrect){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        generateToken(user._id,res);

        return res.status(201).json({
            _id: user._id,
            fullname : user.fullname,
            email : user.email,
            profilepic: user.profilepic
        });

    } catch (error) {
        console.log("error in login controller",error.message);
        return res.status(500).json({message : "Internal Server Error"});
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge :0});
        return res.status(200).json("User Logged Out Successfully");
    } catch (error) {
        console.log("error in logout controller",error.message);
        return res.status(500).json({message : "Internal Server Error"});
    }
}

export const updateProfile = async (req,res)=>{
    try {
        
        const {profilepic} = req.body;
    const userId = req.user._id;

    if(!profilepic){
        return res.status(401).json({message : "Profile Pic is Required"});
    }

    const uploadResponse  = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(userId,{profilepic : uploadResponse.secure_url},{new:true});
    return res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in updateProfile controller",error.message);
        return res.status(500).json({message : "Internal Server Error"});
   
    }
}

export const checkAuth = (req,res)=>{
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("error in auth of user",error.message);
        return res.status(500).json({message : "Internal Server Error"});
    }
}


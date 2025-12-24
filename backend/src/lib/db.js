import mongoose from "mongoose";

export const connectDb = async () => {
    const mongodb_uri = process.env.MONGODB_URI;

    if (!mongodb_uri) {
        console.error("mongodb connection error", "MONGODB_URI is not defined in environment variables");
        return;
    }

    try {
        await mongoose.connect(mongodb_uri);
        console.log("database connected successfully");
    } catch (error) {
        console.error("mongodb connection error", error);
    }
};
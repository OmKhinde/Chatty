import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv";
import cors from "cors"
import {connectDb} from "./lib/db.js";
dotenv.config();

const app = express();
const PORT  = process.env.PORT;

// Increase body size limits to allow base64-encoded images
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({
    origin : "http://localhost:5173", 
    credentials : true,
}))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


app.listen(PORT,()=>{
    console.log(`server is running on the port  : ${PORT}`);
    connectDb();
})
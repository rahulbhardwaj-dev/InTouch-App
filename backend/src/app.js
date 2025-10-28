import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import path from "path"

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import { connectDB } from "./lib/db.js"

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json()) // For req.body
app.use(cookieParser()) 

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join( __dirname, "../frontend/dist")));

    app.get(/.*/, (req,res) => {
        res.sendFile(path.join( __dirname, "../frontend/dist/index.html"))
    })

}

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
    connectDB();
})

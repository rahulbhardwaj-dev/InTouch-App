import jwt from "jsonwebtoken"
import User from "../models/User.js"
import dotenv from 'dotenv';

dotenv.config();

export const socketAuthMiddleware = async(socket,next) => {
    try {
        const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];

        if(!token) return next(new Error("Unauthorized - No Token Provided")) //if token doesn't exist

        //verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return next(new Error("Unauthorized - Invalid token"))

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("Socket connection rejected: User not found")
            return next(new Error("User not found"))
        } 

        //if user exists then
        //attach user info to socket
        socket.user = user;
        socket.userId = user._id.toString()

        next();

    } catch (error) {
        return next(new Error("Unauthorized - Authentication failed"))
    }
}

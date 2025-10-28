import jwt from "jsonwebtoken"
import User from "../models/User.js"
import dotenv from 'dotenv'

dotenv.config();

export const checkValid = async (req,res,next) => {
    try {
        //jwt was our token name, check utils.js
        const token = req.cookies.jwt

        //Checks if token exists or not
        if(!token) return res.status(401).json({message: "Unauthorized"})

        //If token exists then 
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Check jsonwebtoken docs 

        if(!decoded) return res.status(401).json({message: "Unauthorized"})

        //Passed userId in utils.js in token    
        const user = await User.findById(decoded.userId).select("-password") // We want all info except password    
        if(!user) return res.status(404).json({message: "User not found"})
        
        req.user = user; // To use it in our Controller file
        next();    

    } catch (error) {
        console.log("Error in checkValid Middleware", error);
        res.status(500).json({message:"Internal server error"});
    }
}

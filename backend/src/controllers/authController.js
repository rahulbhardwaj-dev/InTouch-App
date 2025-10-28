import User from "../models/User.js"
import bcrypt from "bcryptjs"; 
import dotenv from 'dotenv'

import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailhandler.js"

dotenv.config();

export const signup = async (req,res) => {
    try {
        let {fullName,email,password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message : "All Fields are required"}) // 400 -> Bad Req
        }
        if(password.length < 8){
            return res.status(400).json({message : "Password must be at least 8 characters"})
        }
        //Checks if Email is valid
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message : "Invalid email format"});
        }

        const user = await User.findOne({email}); // checks if email already exists in our DB or not
        if(user) return res.status(400).json({message : "Email already exists!"});

        // FOR NEW USER
        //Securing the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Creating New User 
        const newUser = new User({fullName,email,password: hashedPassword})

        if(newUser){
            const savedUser = await newUser.save();//Saving Data

            generateToken(savedUser._id, res)
            //Creates a JSON Web Token for the user, Stores it in a secure cookie in res

            //For Frontend
            res.status(200).json({ 
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
            // Sending Welcome Email
            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName, process.env.CLIENT_URL)
            } catch (error) {
                console.error("Failed to send Welcome Email")
            }
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup Controller",error);
        res.status(500).json({message: "Internal Servor Error"});
    }
}

export const login = async (req,res) => {
    let {email,password} = req.body;
    try {
        const user = await User.findOne({email});//Checking if User exists

        //If not then
        if(!user) return res.status(400).json({message: "Invalid credentials"})
        //Checking if the password is correct    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);//Can refer to bcryptjs docs
        //If password not correct
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})
        
        //Creating token 
        generateToken(user._id, res);

        //For Frontend
        res.status(200).json({ 
            _id : user._id,
            fullName: user.fullName,
            email : user.email,
            profilePic : user.profilePic
        })
    } catch (error) {
        console.error("Error in Login Controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout = (req,res) => {

    //Check util's for better understanding 
    //As we used token while signing up and login time, we have to set that token to nothing ("") <- to this

    res.cookie("jwt","",{maxAge:0})
    // Once cookie is removed
    res.status(200).json({message:"Logged out successfully"})
}

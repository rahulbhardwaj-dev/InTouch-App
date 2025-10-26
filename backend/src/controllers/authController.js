import User from "../models/User.js"
import bcrypt from "bcryptjs"; 

import { generateToken } from "../lib/utils.js";

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Creating New User 
        const newUser = new User({fullName,email,password: hashedPassword})

        if(newUser){

            generateToken(newUser._id,res)
            //Creates a JSON Web Token for the user, Stores it in a secure cookie in res

            await newUser.save();//Saving Data

            //For Frontend
            res.status(200).json({ 
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })

        } else {
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup Controller",error);
        res.status(500).json({message: "Internal Servor Error"});
    }
}

export const login = (req,res) => {
    res.send("LOGIN PAGE")
}

export const logout = (req,res) => {
    res.send("LOGOUT PAGE")
}

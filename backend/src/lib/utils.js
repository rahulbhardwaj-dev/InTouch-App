import jwt from "jsonwebtoken"
//JSON Web Token (JWT) is a standard for creating access tokens that are used to authenticate users and secure information.

export const generateToken  = (userId,res) => {

    const {JWT_SECRET} = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET IS NOT SAVED")
    }

    //For Authentication
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d",
    });

    //Sending Cookie back to user, for staying logged in, also rest of the options for security
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true, //prevents XSS attacks
        sameSite: "strict", // prevents CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true,
    })

    return token;
}

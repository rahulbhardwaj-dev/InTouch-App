//For Connecting our Database

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {

        //Checks if MONGO_URI is saved in env. variables
        const {MONGO_URI} = process.env;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.log("Some Error in MongoDB",error)
        process.exit(1); // 0 -> Success, and 1 -> Fail
    }
}

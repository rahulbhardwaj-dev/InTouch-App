//For Connecting our Database

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.log("Some Error in MongoDB",error)
        process.exit(1); // 0 -> Success, and 1 -> Fail
    }
}

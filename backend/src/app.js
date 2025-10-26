import express from "express"
import dotenv from 'dotenv'

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})

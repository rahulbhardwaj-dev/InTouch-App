import { Server } from "socket.io"; 
import http from "http";
import express from "express";
import dotenv from 'dotenv';
import { socketAuthMiddleware } from "../middleware/socketAuthMiddleware.js";

dotenv.config();

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true
    }
});

//Applying authentication middleware on all socket connections
io.use(socketAuthMiddleware);

//For Storing online users
const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
    const userId = socket.userId

    userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap)) // to show it to every connected user

    socket.on("disconnect", () => {
        delete userSocketMap[userId] //removing users name from online list

        io.emit("getOnlineUsers", Object.keys(userSocketMap)) 
    })

})

export {io,server,app};

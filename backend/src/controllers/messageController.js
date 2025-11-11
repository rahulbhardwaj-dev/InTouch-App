import User from "../models/User.js"
import Message from "../models/Message.js"
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const AllUsers = await User.find({ _id : {$ne : loggedInUserId}}).select("-password") // In Contacts we want to show all users except ourselves

        res.status(200).json(AllUsers)

    } catch (error) {
        console.log("Error in getAllContacts controller", error)
        res.status(500).json({Message: "Server Error"})
    }
}

export const getAllChats = async (req,res) => {
    try {
        const loggedInUserid = req.user._id;
        
        // First we'll fetch the messages where logged in user is sender or receiver, 
        const messages = await Message.find({
            $or : [{senderId: loggedInUserid}, {receiverId: loggedInUserid}]
        });

        //Getting ids of all the users which logged in user had chat with
        //duplicate messages will be removed with the help of set, as we want to show that user once in frontend not multiple times
        //Also converting both ids to Strings so that we can compare
        const chatFriendIds = [
            ...new Set
            (messages.map((msg) => { 
            return msg.senderId.toString() === loggedInUserid.toString()  
            ? msg.receiverId.toString()  : msg.senderId.toString() 
        }))]

        //Getting chatFriends with extracted messages
        const chatFriends = await User.find({_id:{$in:chatFriendIds}}).select("-password");
        res.status(200).json(chatFriends)

    } catch (error) {
        console.log("Error in getAllChats Controller", error)
        res.status(500).json({Message: "Server Error"})
    }
}

export const getMessagesByUserId = async (req,res) => {
    try {
        const myId = req.user._id; // this id is coming from middleware, that checks if user is logged in and which user
        const {id: userToChatId} = req.params;// this is from req, coming from our frontend action

        //Finds all the messages between logged in and another user
        const allMessages = await Message.find({
            //filtering and getting those messages only which are between these two users
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(allMessages)

    } catch (error) {
        console.log("Error in getMessagesByUserId Controller", error)
        res.status(500).json({Message: "Server Error"})
    }
}

export const sendMessage = async (req,res) => {
    try {
        const {text,image} = req.body; //Message that a user have sent in chat
        const {id: receiverId} = req.params; 
        const senderId = req.user._id;

        if(!text && !image){ //If user hasn't send anything
            return res.status(400).json({Message: "Text or image is required"})
        }

        if(senderId.equals(receiverId)){
            return res.status(400).json({Message: "Cannot send messages to yourself."})
        }

        const receiverExists = await User.exists({_id: receiverId}) //Checks if user we are trying to send a message, really exists in our DB
        if(!receiverExists){
            return res.status(400).json({Message: "Receiver not found"})
        }

        if(image){ //If user wants to send an image, then 
            let uploadImgMessage = await cloudinary.uploader.upload(image);
            imageURL = uploadImgMessage.secure_url;
        }

        //Saving Message in DB
        let newMsg = new Message({
            senderId,
            receiverId,
            text,
            image: image ? imageURL : null,
        })

        await newMsg.save();

        res.status(201).json(newMsg)

    } catch (error) {
        console.log("Error in sendMessage Controller", error)
        res.status(500).json("Server Error");
    }
}

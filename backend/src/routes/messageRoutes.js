import express from "express";
import { getAllChats, getAllContacts, getMessagesByUserId, sendMessage } from "../controllers/messageController.js";
import { checkValid } from "../middleware/authMiddleware.js"; // Checks who is logged in and will give us req.user
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";

const router = express.Router();

router.use(checkValid,arcjetProtection )

router.get("/contacts",  getAllContacts); // For Contacts section
router.get("/chats", getAllChats); //Logged in User's All chats
router.get("/:id", getMessagesByUserId);// To get Logged in user's message
router.post("/send/:id", sendMessage);// To send a message, /:id <- to this user

export default router;

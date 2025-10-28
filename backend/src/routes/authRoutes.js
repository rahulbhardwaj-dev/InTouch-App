import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/authController.js";
import { checkValid } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", checkValid, updateProfile)
router.get("/check", checkValid, (req,res) => res.status(200).json(req.user))

export default router;

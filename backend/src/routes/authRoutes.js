import express from "express";

const router = express.Router();

router.get("/signup", (req,res) => {
    res.send("SIGNUP PAGE")
})

router.get("/login", (req,res) => {
    res.send("LOGIN PAGE")
})

router.get("/logout", (req,res) => {
    res.send("LOGOUT PAGE")
})

export default router;

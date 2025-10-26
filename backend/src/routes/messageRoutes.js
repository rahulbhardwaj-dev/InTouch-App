import express from "express";

const router = express.Router();

router.get("/send", (req,res) => {
    res.send("SENT A MESSAGE")
})

export default router;

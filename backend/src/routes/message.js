import express from "express"

const router = express.Router();

router.get("/send", (req, res)=>{
    res.send("send message endpoints");
});

export default router;
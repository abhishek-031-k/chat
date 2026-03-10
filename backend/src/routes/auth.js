import express from "express"

const  router = express.Router();

router.get("/signup", (req, res)=>{
    res.send("Signup endpoints");
});

router.get("/login", (req, res)=>{
    res.send("Login endpoints");
});

router.get("/logout", (req, res)=>{
    res.send("Logout endpoints");
});

export default router;
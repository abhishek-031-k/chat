import express from "express"
import { signup } from "../controllers/auth.controller.js";

const  router = express.Router();

router.post("/signup",signup);

router.get("/login", (req, res)=>{
    res.send("Login endpoints");
});

router.get("/logout", (req, res)=>{
    res.send("Logout endpoints");
});

export default router;
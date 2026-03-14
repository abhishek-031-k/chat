import jwt from "jsonwebtoken"
import { ENV } from "./env.js";

export const generateToken = (userId, res) =>{
    console.log("My JWT Secret is:", ENV.JWT_SECRET);
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {
     expiresIn: "7d",
    });

res.cookie("jwt",token, {
    maxAge: 4*24*60*60*1000,//MS
    httpOnly: true, //prevent XSS attacks: cross site scripting
    sameSite: "strict", //CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
});

return token;

};
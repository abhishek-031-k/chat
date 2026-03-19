import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import messageRoutes from "./routes/message.js"
import path from "path"
import { connect } from "http2"
import { connectDB } from "./lib/db.js"
import { ENV } from "./lib/env.js"
import cors from "cors";



const app = express();
const  __dirname = path.resolve();
console.log(__dirname);


const PORT = ENV.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment
if(ENV.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"));
});
}

app.listen(PORT, ()=>{
    console.log("server running on port: " + PORT)
    connectDB();
}
);
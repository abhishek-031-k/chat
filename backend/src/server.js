import express from "express";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import { connectDB } from "./lib/db.js";

import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

const allowedOrigins = [
  "https://chat-a4xr.vercel.app",                    
  "http://localhost:5173",                
  "http://localhost:3000"                   
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json({ limit: "5mb" })); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Chat API and Backend Server is Running successfully! 🚀");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});

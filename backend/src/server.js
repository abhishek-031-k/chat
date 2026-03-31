import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

// Define the rules once
const corsOptions = {
  origin: ENV.CLIENT_URL || "https://chatapp-swart-nu-58.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
};

// 1. Standard CORS middleware
app.use(cors(corsOptions));

// 2. BULLETPROOF FIX: Explicitly handle the preflight OPTIONS requests
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "5mb" })); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Chat API and Backend Server is Running successfully! 🚀");
});

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});

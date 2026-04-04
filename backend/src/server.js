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

const allowedOrigins = [
  "https://chat-a4xr.vercel.app",           // Your active Vercel link
  "https://chat-q153.vercel.app",           // Your other Vercel link
  "http://localhost:5173",                  // Local Vite dev server
  "http://localhost:3000"                   // Local React dev server
];

// 2. Set up the rules
const corsOptions = {
  origin: function (origin, callback) {
    // Allow if it's in our list, OR if it's a tool like Postman (no origin)
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

// 3. Apply the Standard CORS middleware
app.use(cors(corsOptions));

// 4. BULLETPROOF FIX: Explicitly handle the preflight OPTIONS requests
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

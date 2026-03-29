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

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Ek simple route taaki browser mein check kar sakein ki backend chal raha hai
app.get("/", (req, res) => {
  res.send("Chat API and Backend Server is Running successfully! 🚀");
});

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
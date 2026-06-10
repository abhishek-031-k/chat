import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
  transports: ["polling", "websocket"], // ← FIXED: polling bhi allow kiya
  pingInterval: 10000,
  pingTimeout: 5000,
});

// Apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// Function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Stores online users: {userId: socketId}
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);
  const userId = socket.user._id.toString();

  userSocketMap[userId] = socket.id;

  // Send list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

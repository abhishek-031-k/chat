import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// Middlewares execute in order - so requests get rate-limited first, then authenticated.
router.use(arcjetProtection, protectRoute);

// ✅ FIX: "/contacts" ko badal kar "/users" kar diya taaki frontend isko dhoondh sake
router.get("/users", getAllContacts); 
router.get("/chats", getChatPartners);

// Dynamic routes (/:id) hamesha specific routes ke neeche hone chahiye (yeh ab 100% safe hai)
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;

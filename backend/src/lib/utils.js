import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  // Check if we are in development mode
  const isDevelopment = ENV.NODE_ENV === "development";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
    httpOnly: true, // Prevent XSS attacks
    sameSite: isDevelopment ? "strict" : "none", // 'strict' for local, 'none' for Vercel->Render
    secure: !isDevelopment, // false for local, true for Vercel->Render
  });

  return token;
};

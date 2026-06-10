import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // XSS protection
    sameSite: "none", // Vercel (Frontend) aur Render (Backend) cross-origin ke liye zaroori
    secure: true, // sameSite "none" ke sath secure hamesha true hona chahiye
  });

  return token;
};

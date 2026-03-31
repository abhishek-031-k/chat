import axios from "axios";

// 1. Base URL decide karein: Localhost for development, Render for production
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000/api" 
  : "https://chat-jssx.onrender.com/api"; // Updated to your NEW working Render link

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Cookies aur Auth tokens ke liye zaroori hai
});

// Optional: Request interceptor (agar aapko debugging ke liye logs chahiye)
axiosInstance.interceptors.request.use((config) => {
  console.log(`Sending request to: ${config.baseURL}${config.url}`);
  return config;
});

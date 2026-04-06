import nodemailer from "nodemailer";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { ENV } from "../lib/env.js";

const transporter = nodemailer.createTransport({
  // smtp.gmail.com ki jagah direct IP use kar rahe hain
  host: "74.125.193.108", 
  port: 465,
  secure: true,
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
  // Render ke liye extra settings
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  },
  connectionTimeout: 30000, // 30 seconds tak wait karega
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const mailOptions = {
      from: `"Chatify" <${ENV.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(name, clientURL),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Nodemailer Error Details:", error);
    // Agar phir bhi error aaye toh humein pata chal jayega
  }
};

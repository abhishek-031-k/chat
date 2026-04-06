import nodemailer from "nodemailer";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { ENV } from "../lib/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Port 587 ke liye hamesha false rakhein
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3' // Purane protocols allow karne ke liye
  },
  connectionTimeout: 40000,
  greetingTimeout: 40000,
  socketTimeout: 40000,
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
    console.log("Email sent successfully via Port 587:", info.messageId);
  } catch (error) {
    console.error("Nodemailer Error Details:", error);
  }
};

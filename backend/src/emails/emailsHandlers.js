import nodemailer from "nodemailer";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { ENV } from "../lib/env.js";

// Setup the Transporter with specific Render-friendly settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL for Port 465
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const mailOptions = {
      from: `Chatify <${ENV.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(name, clientURL),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome Email sent successfully via Gmail:", info.messageId);
  } catch (error) {
    console.error("Nodemailer Error Details:", error);
    if (error.code === 'ETIMEDOUT') {
      console.log("Connection timed out. Render might be slow to connect to Google.");
    }
  }
};

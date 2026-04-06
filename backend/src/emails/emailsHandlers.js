import nodemailer from "nodemailer";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { ENV } from "../lib/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.GMAIL_USER, 
    pass: ENV.GMAIL_APP_PASSWORD, 
  },
});

 */
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
    console.error("Error sending welcome email via Gmail:", error);
  }
};

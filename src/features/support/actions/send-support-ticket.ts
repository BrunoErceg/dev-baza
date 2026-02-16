import nodemailer from "nodemailer";

import { actionValidation, handleActionError } from "@/lib/auth-utils";

import { helpSchema } from "../schemas/help-schema";

export async function sendSupportTicket(rawData: unknown) {
  try {
    const data = await actionValidation(rawData, helpSchema);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: data.fromEmail,
      to: "brunoerceg95@gmail.com",
      subject: `Help: ${data.subject}`,
      html: data.message,
    };
    await transporter.sendMail(mailOptions);
    return { success: "Email poslan uspješno!" };
  } catch (error) {
    return handleActionError(error, "SEND_EMAIL_ERROR");
  }
}

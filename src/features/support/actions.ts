"use server";
import nodemailer from "nodemailer";

import { actionValidation, handleError } from "@/lib/auth-utils";
import { DataResponse } from "@/types/actions";

import { helpSchema } from "./schema";

export async function sendSupportTicket(
  rawData: unknown,
): Promise<DataResponse<any>> {
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
    const result = await transporter.sendMail(mailOptions);
    return { data: result, error: null };
  } catch (error) {
    return handleError(error, "SEND_EMAIL_ERROR");
  }
}

"use server";
import { auth } from "@/auth";
import nodemailer from "nodemailer";

import {
  actionValidation,
  ensureAuthenticated,
  handleActionError,
} from "@/lib/auth-utils";
import { contactSchema } from "@/lib/schemas";

export async function sendMailToProfile(rawData: unknown) {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, contactSchema);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: data.fromEmail,
      to: data.toEmail,
      subject: `Nova poruka od ${data.name}`,
      html: ` 
    <div style="background-color: #f9f9f9; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e1e1e1;">
            
            <div style="background-color: #0070f3; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Nova poruka s DevBaza.hr</h1>
            </div>

            <div style="padding: 30px;">
            <p style="margin-top: 0;">Dobili ste novu poruku putem kontakt forme sa DevBaza.hr:</p>
            
            <div style="background-color: #f0f4f8; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Pošiljatelj:</strong> ${data.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.fromEmail}" style="color: #0070f3; text-decoration: none;">${data.fromEmail}</a></p>
            </div>

            <p style="font-weight: bold; margin-bottom: 10px;">Poruka:</p>
            <div style="font-style: italic; color: #555; line-height: 1.6; border-left: 4px solid #0070f3; padding-left: 15px;">
                ${data.message}
            </div>
            </div>

            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0 0 10px 0;">
                <strong>Napomena:</strong> Ovo je automatska obavijest. Ne odgovarajte na ovaj mail.
            </p>
            <p style="margin: 0;">
                Za odgovor pošiljatelju kliknite ovdje: 
                <a href="mailto:${data.fromEmail}" style="color: #0070f3; font-weight: bold;">${data.fromEmail}</a>
            </p>
            </div> 
        </div>
    </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    return { success: "Email poslan uspješno!" };
  } catch (error) {
    return handleActionError(error, "SEND_EMAIL_ERROR");
  }
}

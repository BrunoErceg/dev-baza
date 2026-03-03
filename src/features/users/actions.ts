"use server";

import { revalidatePath } from "next/cache";

import { auth, signOut } from "@/auth";
import nodemailer from "nodemailer";

import {
  actionValidation,
  ensureAuthenticated,
  ensureUserNameDoesNotExist,
  getUserName,
  handleActionError,
  handleError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

import { avatarSchema, profileContactSchema, profileSchema } from "./schema";
import { getEmailTemplate } from "./utils";

export const updateProfile = async (rawData: unknown) => {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, profileSchema);
    const currentUserName = await getUserName(session.user.id);

    if (data.username !== currentUserName) {
      await ensureUserNameDoesNotExist(data.username);
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        username: data.username,
        website: data.website,
        bio: data.bio,
      },
    });
    revalidatePath("/");
    return { data: user, error: null };
  } catch (error) {
    return handleError(error, "UPDATE_PROFILE_ERROR");
  }
};

export async function updateAvatar(rawData: unknown) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, avatarSchema);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: data.image },
    });
    revalidatePath("/", "layout");
    return { success: "Slika uspješno ažurirana!" };
  } catch (error) {
    return handleActionError(error, "UPDATE_AVATAR_ERROR");
  }
}

export async function deleteAuthUser() {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    await prisma.user.delete({ where: { id: session.user.id } });
  } catch (error) {
    return handleActionError(error, "DELETE_USER_ERROR");
  }
  await signOut({ redirectTo: "/" });
}

export async function sendMailToProfile(rawData: unknown) {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, profileContactSchema);

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
      html: getEmailTemplate({
        name: data.name,
        fromEmail: data.fromEmail,
        message: data.message,
      }),
    };
    await transporter.sendMail(mailOptions);
    return { success: "Email poslan uspješno!" };
  } catch (error) {
    return handleActionError(error, "SEND_EMAIL_ERROR");
  }
}

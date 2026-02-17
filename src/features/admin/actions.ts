"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { createNotification } from "@features/notifications/actions";

import {
  actionValidation,
  ensureAdmin,
  ensureAuthenticated,
  ensureWebsiteExists,
  getWebsiteNameAndUserId,
  handleActionError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

import { awardSchema, rejectReasonSchema } from "./schemas";

export async function acceptWebsite(websiteId: string) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);

    await prisma.website.update({
      where: { id: websiteId },
      data: { status: "APPROVED" },
    });

    await createNotification(website.userId, {
      type: "POSITIVE",
      message: website.name + " je odobrena!",
    });

    revalidatePath("/", "layout");
    return { success: "Web stranica uspješno prihvaćena!" };
  } catch (error: any) {
    return handleActionError(error, "ACCEPT_WEBSITE_ERROR");
  }
}

export async function rejectWebsite(websiteId: string, rawData: unknown) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);
    const data = await actionValidation(rawData, rejectReasonSchema);

    await prisma.website.update({
      where: { id: websiteId },
      data: { status: "REJECTED", rejectionReason: data.reason },
    });
    await createNotification(website.userId, {
      type: "NEGATIVE",
      message: website.name + " je odbijena! Razlog: " + data.reason,
    });

    revalidatePath("/", "layout");
    return { success: "Web stranica uspješno odbijena!" };
  } catch (error: any) {
    return handleActionError(error, "REJECT_WEBSITE_ERROR");
  }
}

export async function awardWebsite(websiteId: string, rawData: unknown) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);
    const data = await actionValidation(rawData, awardSchema);

    await prisma.website.update({
      where: { id: websiteId },
      data: {
        award: data.award,
      },
    });
    await createNotification(website.userId, {
      type: "POSITIVE",
      message: website.name + "  je dobilo priznanje: " + data.award,
    });
    revalidatePath("/", "layout");
    return { success: "Priznanje je uspješno dodano!" };
  } catch (error) {
    return handleActionError(error, "AWARD_WEBSITE_ERROR");
  }
}

export async function deleteAward(websiteId: string) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);
    await prisma.website.update({
      where: { id: websiteId },
      data: { award: null },
    });
    revalidatePath("/", "layout");
    return { success: "Priznanje uspješno obrisana!" };
  } catch (error) {
    return handleActionError(error, "DELETE_AWARD_ERROR");
  }
}

export default async function adminDeleteWebsite(websiteId: string) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureWebsiteExists(websiteId);
    await ensureAdmin(session);
    const website = await getWebsiteNameAndUserId(websiteId);

    await prisma.website.delete({
      where: { id: websiteId },
    });

    await createNotification(session.user.id, {
      type: "NEGATIVE",
      message: website.name + " je izbrisana!",
    });
    revalidatePath("/", "layout");
    return { success: "Web stranica uspješno obrisana!" };
  } catch (error) {
    return handleActionError(error, "DELETE_WEBSITE_ERROR");
  }
}

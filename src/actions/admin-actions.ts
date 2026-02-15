"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  actionValidation,
  ensureAdmin,
  ensureAuthenticated,
  ensureWebsiteExists,
  getWebsiteNameAndUserId,
  handleActionError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { rejectReasonSchema } from "@/lib/schemas";

import { createNotification } from "./notification-actions";

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

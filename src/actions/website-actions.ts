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
import { awardSchema, websiteSchema } from "@/lib/schemas";

import { createNotification } from "./notification-actions";

export const createWebsite = async (rawData: unknown) => {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, websiteSchema);
    await prisma.website.create({
      data: {
        userId: session.user.id,
        name: data.name,
        url: data.url,
        imageUrl: data.image,
        style: data.style,
        category: data.category,
      },
    });
    await createNotification(session.user.id, {
      type: "NEUTRAL",
      message: data.name + " čeka na odobrenje!",
    });
    revalidatePath("/", "layout");
    return { success: "Web stranica je uspješno dodana!" };
  } catch (error) {
    return handleActionError(error, "CREATE_WEBSITE_ERROR");
  }
};

export default async function deleteWebsite(websiteId: string) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);
    const whereInput: { id: string; userId?: string } = { id: websiteId };

    if (session?.user?.role !== "ADMIN") {
      whereInput.userId = session.user.id;
    }

    await prisma.website.delete({
      where: whereInput,
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

export async function addView(websiteId: string) {
  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    console.log("ADD_VIEW_ERROR:", error);
  }
}

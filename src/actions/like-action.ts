"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  ensureAuthenticated,
  ensureLikeDoesNotExist,
  ensureLikeExists,
  getWebsiteNameAndUserId,
  handleActionError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

import { createNotification } from "./notification-actions";

export async function deleteLike(websiteId: string) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureLikeExists(websiteId, session.user.id);
    await prisma.like.deleteMany({
      where: { userId: session.user.id, websiteId: websiteId },
    });
    revalidatePath("/", "layout");
    return { success: "Lajk uspješno obrisan!" };
  } catch (error: any) {
    return handleActionError(error, "DELETE_LIKE_ERROR");
  }
}

export async function createLike(websiteId: string) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureLikeDoesNotExist(websiteId, session.user.id);
    const website = await getWebsiteNameAndUserId(websiteId);

    await prisma.like.create({
      data: { websiteId: websiteId, userId: session.user.id },
    });

    if (session.user.id !== website.userId) {
      await createNotification(website.userId, {
        type: "LIKE",
        message: session.user.name + " je lajka " + website.name,
      });
    }

    revalidatePath("/", "layout");
    return { success: "Lajk uspješno dodan!" };
  } catch (error: any) {
    return handleActionError(error, "CREATE_LIKE_ERROR");
  }
}

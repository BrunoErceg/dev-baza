"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { Like, Website } from "@prisma/client";

import { createNotification } from "@features/notifications/actions";
import { websiteSchema } from "@features/websites/schemas";

import {
  actionValidation,
  ensureAuthenticated,
  ensureLikeDoesNotExist,
  ensureLikeExists,
  ensureWebsiteExists,
  ensureWebsiteOwner,
  getWebsiteNameAndUserId,
  handleError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { DataResponse } from "@/types/actions";

import { GridConfig } from "./types";

export async function createWebsite(
  rawData: unknown,
): Promise<DataResponse<Website | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, websiteSchema);

    const website = await prisma.website.create({
      data: {
        userId: session.user.id,
        name: data.name,
        url: data.url,
        imageUrl: data.image,
        style: data.style,
        category: data.category,
        colorStyle: data.colorStyle,
        technology: data.technology,
      },
    });
    await createNotification(session.user.id, {
      type: "NEUTRAL",
      message: `${data.name} čeka na odobrenje!`,
    });
    revalidatePath("/", "layout");
    return { data: website, error: null };
  } catch (error) {
    return handleError(error, "CREATE_WEBSITE_ERROR");
  }
}

export async function deleteWebsite(
  websiteId: string,
): Promise<DataResponse<Website | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);
    await ensureWebsiteOwner(websiteId, session.user.id);

    const result = await prisma.website.delete({
      where: { id: websiteId },
    });

    await createNotification(session.user.id, {
      type: "NEGATIVE",
      message: website.name + " je izbrisana!",
    });
    revalidatePath("/", "layout");
    return { data: result, error: null };
  } catch (error) {
    return handleError(error, "DELETE_WEBSITE_ERROR");
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

export async function deleteLike(
  websiteId: string,
): Promise<DataResponse<number | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureLikeExists(websiteId, session.user.id);
    const result = await prisma.like.deleteMany({
      where: { userId: session.user.id, websiteId: websiteId },
    });
    revalidatePath("/", "layout");
    return { data: result.count, error: null };
  } catch (error: any) {
    return handleError(error, "DELETE_LIKE_ERROR");
  }
}

export async function createLike(
  websiteId: string,
): Promise<DataResponse<Like | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureLikeDoesNotExist(websiteId, session.user.id);
    const website = await getWebsiteNameAndUserId(websiteId);

    const result = await prisma.like.create({
      data: { websiteId: websiteId, userId: session.user.id },
    });

    if (session.user.id !== website.userId) {
      await createNotification(website.userId, {
        type: "LIKE",
        message: session.user.name + " je lajka " + website.name,
      });
    }

    revalidatePath("/", "layout");
    return { data: result, error: null };
  } catch (error: any) {
    return handleError(error, "CREATE_LIKE_ERROR");
  }
}

export async function updateGridConfigCookie(newConfig: GridConfig) {
  const cookieStore = await cookies();
  cookieStore.set("gridConfig", newConfig, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

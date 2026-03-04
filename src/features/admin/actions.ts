"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { Website } from "@prisma/client";

import { createNotification } from "@features/notifications/actions";

import {
  actionValidation,
  ensureAdmin,
  ensureAuthenticated,
  ensureWebsiteExists,
  getWebsiteNameAndUserId,
  handleError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { DataResponse } from "@/types/actions";

import { awardSchema, rejectReasonSchema } from "./schemas";

export async function acceptWebsite(
  websiteId: string,
): Promise<DataResponse<Website | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);

    const updatedWebsite = await prisma.website.update({
      where: { id: websiteId },
      data: { status: "APPROVED" },
    });

    await createNotification(website.userId, {
      type: "POSITIVE",
      message: website.name + " je odobrena!",
    });

    revalidatePath("/", "layout");
    return { data: updatedWebsite, error: null };
  } catch (error: any) {
    return handleError(error, "ACCEPT_WEBSITE_ERROR");
  }
}

export async function rejectWebsite(
  websiteId: string,
  rawData: unknown,
): Promise<DataResponse<Website | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);
    const data = await actionValidation(rawData, rejectReasonSchema);

    const updatedWebsite = await prisma.website.update({
      where: { id: websiteId },
      data: { status: "REJECTED", rejectionReason: data.reason },
    });
    await createNotification(website.userId, {
      type: "NEGATIVE",
      message: website.name + " je odbijena! Razlog: " + data.reason,
    });

    revalidatePath("/", "layout");
    return { data: updatedWebsite, error: null };
  } catch (error: any) {
    return handleError(error, "REJECT_WEBSITE_ERROR");
  }
}

export async function awardWebsite(
  websiteId: string,
  rawData: unknown,
): Promise<DataResponse<Website | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);
    await ensureWebsiteExists(websiteId);
    const website = await getWebsiteNameAndUserId(websiteId);
    const data = await actionValidation(rawData, awardSchema);

    const updatedWebsite = await prisma.website.update({
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
    return { data: updatedWebsite, error: null };
  } catch (error) {
    return handleError(error, "AWARD_WEBSITE_ERROR");
  }
}

export async function deleteAward(
  websiteId: string,
): Promise<DataResponse<Website | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureAdmin(session);

    const updatedWebsite = await prisma.website.update({
      where: { id: websiteId },
      data: { award: null },
    });
    revalidatePath("/", "layout");
    return { data: updatedWebsite, error: null };
  } catch (error) {
    return handleError(error, "DELETE_AWARD_ERROR");
  }
}

export default async function adminDeleteWebsite(
  websiteId: string,
): Promise<DataResponse<Website | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await ensureWebsiteExists(websiteId);
    await ensureAdmin(session);
    const website = await getWebsiteNameAndUserId(websiteId);

    const deletedWebsite = await prisma.website.delete({
      where: { id: websiteId },
    });

    await createNotification(session.user.id, {
      type: "NEGATIVE",
      message: website.name + " je izbrisana!",
    });
    revalidatePath("/", "layout");
    return { data: deletedWebsite, error: null };
  } catch (error) {
    return handleError(error, "DELETE_WEBSITE_ERROR");
  }
}

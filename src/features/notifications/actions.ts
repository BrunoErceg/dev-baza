"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  actionValidation,
  ensureAuthenticated,
  handleActionError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

import { notificationSchema } from "./schema";

export async function createNotification(userId: string, rawData: unknown) {
  try {
    const data = await actionValidation(rawData, notificationSchema);
    await prisma.notification.create({
      data: { userId: userId, message: data.message, type: data.type },
    });
    revalidatePath("/", "layout");
    return { success: "Obavijest uspješno dodana!" };
  } catch (error: any) {
    return handleActionError(error, "CREATE_NOTIFICATION_ERROR");
  }
}

export async function deleteAllNotifications() {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    await prisma.notification.deleteMany({
      where: { userId: session.user.id },
    });
    revalidatePath("/", "layout");
    return { success: "Sve obavijesti uspješno obrisane!" };
  } catch (error: any) {
    return handleActionError(error, "DELETE_ALL_NOTIFICATIONS_ERROR");
  }
}

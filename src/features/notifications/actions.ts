"use server";

import { auth } from "@/auth";
import { pusherServer } from "@lib/pusher";
import { Notification } from "@prisma/client";

import { actionValidation, ensureAuthenticated } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { DataResponse } from "@/types/actions";

import { notificationSchema } from "./schema";

export async function createNotification(
  recipientId: string,
  rawData: unknown,
): Promise<DataResponse<Notification | null>> {
  try {
    const data = await actionValidation(rawData, notificationSchema);
    const newNotification = await prisma.notification.create({
      data: { userId: recipientId, message: data.message, type: data.type },
    });

    await pusherServer.trigger(
      `user-${recipientId}`,
      "new-notification",
      newNotification,
    );

    return { data: newNotification, error: null };
  } catch (error: any) {
    console.log("CREATE_NOTIFICATION_ERROR:", error);
    return { data: null, error: "Greška pri spremanju obavijesti." };
  }
}

export async function deleteAllNotifications(): Promise<
  DataResponse<number | null>
> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const result = await prisma.notification.deleteMany({
      where: { userId: session.user.id },
    });
    return { data: result.count, error: null };
  } catch (error: any) {
    console.log("DELETE_ALL_NOTIFICATIONS_ERROR:", error);
    return { data: null, error: "Greška pri brisanju obavijesti." };
  }
}

export async function setAllNotificationsAsRead(): Promise<
  DataResponse<number | null>
> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const result = await prisma.notification.updateMany({
      where: { userId: session.user.id },
      data: { isRead: true },
    });
    return { data: result.count, error: null };
  } catch (error) {
    console.log("SET_ALL_NOTIFICATIONS_AS_READ_ERROR:", error);
    return { data: null, error: "Greška pri postavljanju obavijesti." };
  }
}

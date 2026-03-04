"use server";

import { auth } from "@/auth";
import { pusherServer } from "@lib/pusher";
import { Notification } from "@prisma/client";

import {
  actionValidation,
  ensureAuthenticated,
  handleError,
} from "@/lib/auth-utils";
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
      `user-notifications-${recipientId}`,
      "new-notification",
      newNotification,
    );

    return { data: newNotification, error: null };
  } catch (error: any) {
    return handleError(error, "CREATE_NOTIFICATION_ERROR");
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
    return handleError(error, "DELETE_ALL_NOTIFICATIONS_ERROR");
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
    return handleError(error, "SET_ALL_NOTIFICATIONS_AS_READ_ERROR");
  }
}

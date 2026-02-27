"use server";
import { auth } from "@/auth";
import { ensureAuthenticated } from "@lib/auth-utils";
import { prisma } from "@lib/prisma";
import { Notification } from "@prisma/client";

import { DataResponse } from "@/types/actions";

import { UserNotificationsData } from "./types";

export async function getUserNotifications(): Promise<
  DataResponse<UserNotificationsData>
> {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.notification.count({
        where: { userId: session.user.id, isRead: false },
      }),
    ]);
    return { data: { notifications, unreadCount }, error: null };
  } catch (error) {
    console.log("NOTIFICATION_FETCH_ERROR:", error);
    return {
      data: { notifications: [], unreadCount: 0 },
      error: "Greška pri hvatanju podataka.",
    };
  }
}

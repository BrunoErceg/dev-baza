import { auth } from "@/auth";
import { ensureAuthenticated } from "@lib/auth-utils";
import { prisma } from "@lib/prisma";
import { Notification } from "@prisma/client";

import { DataResponse } from "@/types/actions";

export async function getUserNotifications(): Promise<
  DataResponse<Notification[]>
> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const results = await prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return { data: results, error: null };
  } catch (error) {
    console.log("NOTIFICATION_FETCH_ERROR:", error);
    return { data: [], error: "Greška pri spremanju u bazu." };
  }
}

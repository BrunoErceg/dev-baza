import { auth } from "@/auth";
import { Notification, User } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/actions";

export async function getUser(userId: string) {
  try {
    return await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    console.error("GET_USER_BY_ID_ERROR:", error);
    return null;
  }
}

export async function getUserNotifications(
  userId: string,
): Promise<ActionResponse<Notification[]>> {
  const session = await auth();
  if (!session?.user?.id)
    return { data: null, success: null, error: "Niste prijavljeni!" };
  if (session?.user?.id !== userId)
    return { data: null, success: null, error: "Nemate ovlast za pristup" };

  try {
    const results = await prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return { data: results, success: "Uspjesno dohvaceni podaci", error: null };
  } catch (error) {
    console.log("NOTIFICATION_FETCH_ERROR:", error);
    return { data: null, success: null, error: "Greška pri spremanju u bazu." };
  }
}

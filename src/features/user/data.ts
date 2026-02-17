import { auth } from "@/auth";
import { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { DataResponse } from "@/types/actions";

export async function getUser(
  userId: string,
): Promise<DataResponse<User | null>> {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return { data: user, error: null };
  } catch (error) {
    console.error("GET_USER_BY_ID_ERROR:", error);
    return { data: null, error: "Greška pri hvatanju podataka." };
  }
}

export async function getAuthUser(): Promise<DataResponse<User | null>> {
  const session = await auth();
  if (!session) return { data: null, error: null };
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    return { data: user, error: null };
  } catch (error) {
    console.error("GET_USER_BY_ID_ERROR:", error);
    return { data: null, error: "Greška pri hvatanju podataka." };
  }
}

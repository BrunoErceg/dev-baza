"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const updateUsername = async (newName: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: newName },
    });

    return { success: "Ime uspješno ažurirano!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." + error };
  }
};

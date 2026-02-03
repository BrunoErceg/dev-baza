"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateAvatar(image: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.user.update({ where: { id: session.user.id }, data: { image: image } });
    return { success: "Slika uspješno promijenjena!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." + error };
  }
}

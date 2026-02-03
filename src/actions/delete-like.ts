"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteLike(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.like.deleteMany({ where: { userId: session.user.id, websiteId: websiteId } });
    return { success: "Lajk uspješno obrisano!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." + error };
  }
}

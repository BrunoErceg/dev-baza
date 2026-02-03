"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createLike(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.like.create({ data: { websiteId: websiteId, userId: session.user.id } });
    return { success: "Lajk uspješno dodan!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." + error };
  }
}

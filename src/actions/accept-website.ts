"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function acceptWebsite(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: { status: "APPROVED" },
    });
    return { success: "Web stranica uspješno prihvacena!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." + error };
  }
}

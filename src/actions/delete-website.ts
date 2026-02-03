"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function deleteWebsite(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.website.delete({ where: { id: websiteId } });
    return { success: "Web stranica uspješno obrisana!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." + error };
  }
}

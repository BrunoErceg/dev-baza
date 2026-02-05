"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function deleteUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.user.delete({ where: { id: session.user.id } });
    return { success: "Korisnik uspješno obrisan!" };
  } catch (error) {
    return { error: "Greška pri brisanju u bazu." + error };
  }
}

"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteLike(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.like.deleteMany({
      where: { userId: session.user.id, websiteId: websiteId },
    });
    return { success: "Lajk uspješno obrisano!" };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { error: "Lajk nije pronađena!" };
    }
    return { error: "Greška pri spremanju u bazu." + error };
  }
}

export async function createLike(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.like.create({
      data: { websiteId: websiteId, userId: session.user.id },
    });
    revalidatePath("/");
    return { success: "Lajk uspješno dodan!" };
  } catch (error: any) {
    console.log(error);

    if (error.code === "P2002") {
      return { error: "Vec ste lajkali ovu web stranicu!" };
    }
    return { error: "Greška pri spremanju u bazu." };
  }
}

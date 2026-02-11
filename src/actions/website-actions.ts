"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";
import { awardSchema, websiteSchema } from "@/lib/schemas";

export const createWebsite = async (rawData: unknown) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  const validation = websiteSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: "Niste ispravno popunili sva polja!" };
  }

  const data = validation.data;
  try {
    await prisma.website.create({
      data: {
        userId: session.user.id,
        name: data.name,
        url: data.url,
        imageUrl: data.image,
        style: data.style,
        category: data.category,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { success: "Web stranica je uspješno dodana!" };
  } catch (error: any) {
    console.log("CREATE_WEBSITE_ERROR:", error);
    if (error.code === "P2002") {
      return { error: "Ovaj URL već se koristi!" };
    }
    return { error: "Greška pri spremanju u bazu." };
  }
};

export async function awardWebsite(websiteId: string, rawData: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  const validation = awardSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: "Niste ispravno popunili sva polja!" };
  }

  const data = validation.data;
  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: {
        award: data.award,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { success: "Priznanje je uspješno dodano!" };
  } catch (error) {
    console.log("UPDATE_WEBSITE_ERROR:", error);
    return { error: "Greška pri spremanju u bazu." };
  }
}

export default async function deleteWebsite(websiteId: string) {
  const session = await auth();
  const whereInput: any = { id: websiteId };
  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  if (session?.user?.role !== "ADMIN") {
    whereInput.userId = session.user.id;
  }

  try {
    await prisma.website.delete({
      where: whereInput,
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { success: "Web stranica uspješno obrisana!" };
  } catch (error: any) {
    console.log("DELETE_WEBSITE_ERROR:", error);

    if (error.code === "P2025") {
      return {
        error: "Stranica nije pronađena ili nemate ovlast za brisanje.",
      };
    }

    return { error: "Greška pri spremanju u bazu." };
  }
}

export async function deleteAward(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  if (session?.user?.role !== "ADMIN") {
    return { error: "Nemate ovlast za brisanje!" };
  }

  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: { award: null },
    });
    return { success: "Priznanje uspješno obrisana!" };
  } catch (error) {
    console.log(error);
    return { error: "Greška pri spremanju u bazu." };
  }
}

export async function addView(websiteId: string) {
  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    console.log(error);
  }
}

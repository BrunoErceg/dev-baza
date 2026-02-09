"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { WebsiteFormValues, websiteSchema } from "@/lib/schemas";

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

export default async function deleteWebsite(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.website.delete({
      where: { id: websiteId, userId: session.user.id },
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

"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { WebsiteValues } from "@/app/dashboard/_components/add-website-form";

export const createWebsite = async (newWebsite: WebsiteValues) => {
  const session = await auth();
  const user = session.user;
  if (!user.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.website.create({
      data: {
        userId: user.id,
        name: newWebsite.name,
        url: newWebsite.url,
        imageUrl: newWebsite.image,
        style: newWebsite.style,
        category: newWebsite.category,
      },
    });
    return { success: "Web stranica je uspješno dodana!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." + error };
  }
};

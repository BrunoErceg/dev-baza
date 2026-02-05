"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { profileFormValues } from "@/app/dashboard/_components/update-profile-form";
export const updateProfile = async (data: profileFormValues) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        number: data.phone,
        emailContact: data.email,
        website: data.website,
        company: data.company,
      },
    });
    return { success: "Profil uspješno ažurirano!" };
  } catch (error) {
    return { error: "Greška pri spremanju u bazu." };
  }
};

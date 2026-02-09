"use server";
import { prisma } from "@/lib/prisma";
import { auth, signOut } from "@/auth";
import { avatarSchema, profileSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export const updateUser = async (rawData: unknown) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  const validation = profileSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: "Niste ispravno popunili sva polja!" };
  }

  const data = validation.data;

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
    revalidatePath("/");
    return { success: "Profil uspješno ažurirano!" };
  } catch (error) {
    console.log("UPDATE_USER_ERROR:", error);
    return { error: "Greška pri spremanju u bazu." };
  }
};

export async function updateAvatar(rawData: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  const validation = avatarSchema.safeParse(rawData);
  console.log(validation);
  if (!validation.success) {
    return { error: "Niste ispravno popunili sva polja!" };
  }

  const data = validation.data;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: data.image },
    });
    revalidatePath("/dashboard");
    revalidatePath("/", "layout");
    return { success: "Slika uspješno promijenjena!" };
  } catch (error) {
    console.log("UPDATE_AVATAR_ERROR:", error);
    return { error: "Greška pri spremanju u bazu." };
  }
}

export default async function deleteUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  try {
    await prisma.user.delete({ where: { id: session.user.id } });
    await signOut({ redirectTo: "/" });
    return { success: "Korisnik uspješno obrisan!" };
  } catch (error) {
    console.log("DELETE_USER_ERROR:", error);
    return { error: "Greška pri brisanju u bazu." };
  }
}

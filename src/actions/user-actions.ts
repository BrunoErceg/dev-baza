"use server";
import { revalidatePath } from "next/cache";

import { auth, signOut } from "@/auth";

import {
  actionValidation,
  ensureAuthenticated,
  handleActionError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { avatarSchema, profileSchema } from "@/lib/schemas";

export const updateUser = async (rawData: unknown) => {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, profileSchema);
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        phone: data.phone,
        emailContact: data.email,
        website: data.website,
        bio: data.bio,
      },
    });
    revalidatePath("/");
    return { success: "Profil uspješno ažuriran!" };
  } catch (error) {
    return handleActionError(error, "UPDATE_USER_ERROR");
  }
};

export async function updateAvatar(rawData: unknown) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, avatarSchema);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: data.image },
    });
    revalidatePath("/", "layout");
    return { success: "Slika uspješno ažurirana!" };
  } catch (error) {
    return handleActionError(error, "UPDATE_AVATAR_ERROR");
  }
}

export default async function deleteUser() {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    await prisma.user.delete({ where: { id: session.user.id } });
    await signOut({ redirectTo: "/" });
    return { success: "Korisnik uspješno obrisan!" };
  } catch (error) {
    return handleActionError(error, "DELETE_USER_ERROR");
  }
}

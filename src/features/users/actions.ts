"use server";

import { revalidatePath } from "next/cache";

import { auth, signOut } from "@/auth";
import { User } from "@prisma/client";

import {
  actionValidation,
  ensureAuthenticated,
  ensureUserNameDoesNotExist,
  getUserName,
  handleError,
} from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { DataResponse } from "@/types/actions";

import { avatarSchema, profileSchema } from "./schema";

export const updateProfile = async (
  rawData: unknown,
): Promise<DataResponse<User | null>> => {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, profileSchema);
    const currentUserName = await getUserName(session.user.id);

    if (data.username !== currentUserName) {
      await ensureUserNameDoesNotExist(data.username);
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        username: data.username,
        website: data.website,
        bio: data.bio,
      },
    });
    revalidatePath("/");
    return { data: user, error: null };
  } catch (error) {
    return handleError(error, "UPDATE_PROFILE_ERROR");
  }
};

export async function updateAvatar(
  rawData: unknown,
): Promise<DataResponse<User | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const data = await actionValidation(rawData, avatarSchema);
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: data.image },
    });
    revalidatePath("/", "layout");
    return { data: user, error: null };
  } catch (error) {
    return handleError(error, "UPDATE_AVATAR_ERROR");
  }
}

export async function deleteAuthUser() {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    await prisma.user.delete({ where: { id: session.user.id } });
  } catch (error) {
    return handleError(error, "DELETE_USER_ERROR");
  }
  await signOut({ redirectTo: "/" });
}

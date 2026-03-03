"use server";

import { auth } from "@/auth";
import {
  actionValidation,
  ensureAuthenticated,
  ensureUserExists,
  ensureUserNameDoesNotExist,
  handleActionError,
} from "@lib/auth-utils";
import { prisma } from "@lib/prisma";

import { createNotification } from "@features/notifications/actions";

import { FormActionResponse } from "@/types/actions";

import { onboardingSchema } from "./schema";

export async function onboardingUpdate(
  rawData: unknown,
): Promise<FormActionResponse> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureUserExists(session.user.id);
    const data = await actionValidation(rawData, onboardingSchema);
    await ensureUserNameDoesNotExist(data.username);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { username: data.username, name: data.fullName, onboarding: true },
    });

    await createNotification(session.user.id, {
      type: "POSITIVE",
      message: ` ${data.username} dobrodošao u Dev-bazu!`,
    });

    return { success: "Korisničko ime uspješno ažurirano!", error: null };
  } catch (error) {
    const actionError = handleActionError(
      error,
      "UPDATE_USER_NAME_ERROR",
    ).error;
    return { success: null, error: actionError };
  }
}

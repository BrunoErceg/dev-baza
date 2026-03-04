"use server";

import { auth } from "@/auth";
import {
  actionValidation,
  ensureAuthenticated,
  ensureUserExists,
  ensureUserNameDoesNotExist,
  handleError,
} from "@lib/auth-utils";
import { prisma } from "@lib/prisma";
import { User } from "@prisma/client";

import { createNotification } from "@features/notifications/actions";

import { DataResponse } from "@/types/actions";

import { onboardingSchema } from "./schema";

export async function onboardingUpdate(
  rawData: unknown,
): Promise<DataResponse<User | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    ensureUserExists(session.user.id);
    const data = await actionValidation(rawData, onboardingSchema);
    await ensureUserNameDoesNotExist(data.username);

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { username: data.username, name: data.fullName, onboarding: true },
    });

    await createNotification(session.user.id, {
      type: "POSITIVE",
      message: ` ${data.username} dobrodošao u Dev-bazu!`,
    });

    return { data: user, error: null };
  } catch (error) {
    return handleError(error, "ONBOARDING_UPDATE_ERROR");
  }
}

import { ZodSchema } from "zod";

import { prisma } from "./prisma";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

export function ensureAdmin(session: any) {
  if (session?.user?.role !== "ADMIN") {
    throw new ActionError("Niste admin stranice!");
  }
}

export function ensureAuthenticated(session: any) {
  if (!session?.user?.id) throw new ActionError("Niste prijavljeni!");
}

export async function ensureWebsiteExists(websiteId: string) {
  const website = await prisma.website.findUnique({ where: { id: websiteId } });
  if (!website) throw new ActionError("Stranica nije pronađena!");
}

export async function ensureWebsiteOwner(websiteId: string, userId: string) {
  const website = await prisma.website.findUnique({
    where: { id: websiteId, userId: userId },
  });
  if (!website) throw new ActionError("Stranica nije pronađena!");
}

export async function ensureUserExists(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ActionError("Korisnik nije pronađen!");
}

export async function ensureUserNameDoesNotExist(userName: string) {
  const user = await prisma.user.findFirst({ where: { userName: userName } });
  if (user) throw new ActionError("Korisnik sa ovim imenom vec postoji!");
}

export async function getWebsiteNameAndUserId(id: string) {
  const website = await prisma.website.findUnique({
    where: { id: id },
    select: { name: true, userId: true },
  });
  if (!website) {
    throw new ActionError("Stranica nije pronađena!");
  }
  return website;
}

export async function ensureLikeExists(websiteId: string, userId: string) {
  const like = await prisma.like.findFirst({
    where: { websiteId: websiteId, userId: userId },
  });
  if (!like) throw new ActionError("Lajk ne postoji!");
}

export async function ensureLikeDoesNotExist(
  websiteId: string,
  userId: string,
) {
  const like = await prisma.like.findFirst({
    where: { websiteId: websiteId, userId: userId },
  });
  if (like) throw new ActionError("Lajk postoji!");
}

export async function actionValidation<T>(
  rawData: unknown,
  schema: ZodSchema<T>,
): Promise<T> {
  const validation = schema.safeParse(rawData);

  if (!validation.success) {
    throw new ActionError("Niste ispravno popunili sva polja!");
  }

  return validation.data;
}

export function handleActionError(error: any, logLabel: string) {
  console.log(logLabel + ":", error);
  if (error instanceof ActionError) {
    return { error: error.message };
  }
  if (error.code === "P2002") {
    return { error: "Ovaj zapis već postoji." };
  }

  if (error.code === "P2025") {
    return { error: "Zapis nije pronađen." };
  }

  return { error: "Greška pri spremanju u bazu." };
}

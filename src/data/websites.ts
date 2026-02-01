"use server";
import { prisma } from "@/lib/prisma";

export async function getUserWebsites(userId: string) {
  return await prisma.website.findMany({ where: { userId: userId }, orderBy: { createdAt: "desc" } });
}

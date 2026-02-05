"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getUserWebsites(userId: string) {
  return await prisma.website.findMany({ where: { userId: userId }, orderBy: { createdAt: "desc" } });
}

export async function getPendingWebsites() {
  return await prisma.website.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "desc" } });
}

export type WebsiteWithExtras = Prisma.WebsiteGetPayload<{ include: { user: { select: { name: true; image: true } }; likedBy: true } }>;

export async function getAllApprovedWebsites(): Promise<WebsiteWithExtras[]> {
  return await prisma.website.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, image: true } }, likedBy: true },
  });
}

export async function getAllLikes() {
  return await prisma.like.findMany();
}

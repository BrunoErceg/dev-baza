"use server";

import { prisma } from "@/lib/prisma";

export async function addView(webistId: string) {
  await prisma.website.update({ where: { id: webistId }, data: { views: { increment: 1 } } });
}

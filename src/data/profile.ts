import { prisma } from "@/lib/prisma";

export async function getProfile(userId: string) {
  return await prisma.user.findUnique({ where: { id: userId } });
}

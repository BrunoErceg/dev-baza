"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getDashboardData(userId: string) {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const [websites, totalViews, thisMonthLikes, lastMonthLikes, totalLikes] =
    await Promise.all([
      prisma.website.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { likedBy: true } } },
      }),
      prisma.website.aggregate({
        where: { userId },
        _sum: { views: true },
      }),
      prisma.like.count({
        where: { website: { userId }, createdAt: { gte: thisMonth } },
      }),
      prisma.like.count({
        where: {
          website: { userId },
          createdAt: { gte: lastMonth, lt: thisMonth },
        },
      }),
      prisma.like.count({ where: { website: { userId } } }),
    ]);

  return {
    websites,
    stats: {
      totalViews: totalViews._sum.views || 0,
      thisMonthLikes,
      lastMonthLikes,
      totalLikes,
    },
  };
}
export type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;
export type UserWebsitesWithStats = Awaited<
  ReturnType<typeof getDashboardData>
>["websites"][0];
export type WebsitesStats = Awaited<
  ReturnType<typeof getDashboardData>
>["stats"];

export async function getPendingWebsites() {
  return await prisma.website.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });
}

export type WebsiteWithExtras = Prisma.WebsiteGetPayload<{
  include: { user: { select: { name: true; image: true } }; likedBy: true };
}>;

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

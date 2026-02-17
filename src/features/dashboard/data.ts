import { prisma } from "@lib/prisma";

export async function getDashboardData(userId: string) {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const [
    websites,
    totalViews,
    thisMonthLikes,
    lastMonthLikes,
    totalLikes,
    totalAwards,
  ] = await Promise.all([
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
    prisma.website.count({ where: { award: { not: null } } }),
  ]);

  return {
    websites,
    stats: {
      totalViews: totalViews._sum.views || 0,
      thisMonthLikes,
      lastMonthLikes,
      totalLikes,
      totalAwards,
    },
  };
}

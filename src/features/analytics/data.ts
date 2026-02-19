import { prisma } from "@lib/prisma";

export async function getDashboardStats(userId: string) {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const [totalViews, thisMonthLikes, lastMonthLikes, totalLikes, totalAwards] =
    await Promise.all([
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
    stats: {
      totalViews: totalViews._sum.views || 0,
      thisMonthLikes,
      lastMonthLikes,
      totalLikes,
      totalAwards,
    },
  };
}

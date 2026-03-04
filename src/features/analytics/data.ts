import { handleError } from "@lib/auth-utils";
import { prisma } from "@lib/prisma";

import { DataResponse } from "@/types/actions";

interface DashboardStatsData {
  totalViews: number;
  thisMonthLikes: number;
  lastMonthLikes: number;
  totalLikes: number;
  totalAwards: number;
}

export async function getDashboardStats(
  userId: string,
): Promise<DataResponse<DashboardStatsData | null>> {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  try {
    const [
      totalViews,
      thisMonthLikes,
      lastMonthLikes,
      totalLikes,
      totalAwards,
    ] = await Promise.all([
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
      data: {
        totalViews: totalViews._sum.views || 0,
        thisMonthLikes,
        lastMonthLikes,
        totalLikes,
        totalAwards,
      },
      error: null,
    };
  } catch (error) {
    return handleError(error, "GET_DASHBOARD_STATS_ERROR");
  }
}

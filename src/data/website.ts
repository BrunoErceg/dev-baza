"use server";
import {
  $Enums,
  Category,
  ColorStyle,
  PrimaryColor,
  Style,
  Technology,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { DataResponse } from "@/types/actions";
import { GridWebsiteData, OrderByOption } from "@/types/websites";

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

export async function getPendingWebsites() {
  return await prisma.website.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllApprovedWebsites({
  userId,
  category,
  style,
  colorStyle,
  primaryColor,
  technology,
  sort,
}: {
  userId?: string;
  category?: Category;
  style?: Style;
  colorStyle?: ColorStyle;
  primaryColor?: PrimaryColor;
  technology?: Technology;
  sort?: string;
}): Promise<DataResponse<GridWebsiteData[]>> {
  try {
    const websites = await prisma.website.findMany({
      where: {
        userId: userId,
        status: "APPROVED",
        category,
        style,
        primaryColor,
        colorStyle,
        technology,
      },
      include: {
        user: { select: { name: true, image: true, id: true } },
        likedBy: true,
      },
      orderBy:
        sort === "pregledi"
          ? { views: "desc" }
          : sort === "lajkovi"
            ? { likedBy: { _count: "desc" } }
            : { createdAt: "desc" },
    });
    return { data: websites, error: null };
  } catch (error) {
    console.error("GET_ALL_APPROVED_WEBSITES_ERROR:", error);
    return { data: [], error: "Greška pri hvatanju podataka." };
  }
}

export async function getUserWebsites(
  userId: string,
): Promise<DataResponse<GridWebsiteData[]>> {
  try {
    const websites = await prisma.website.findMany({
      where: { userId: userId },
      include: {
        user: { select: { name: true, image: true, id: true } },
        likedBy: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { data: websites, error: null };
  } catch (error) {
    console.error("GET_USER_WEBSITES_WITH_LIKES_ERROR:", error);
    return { data: [], error: "Greška pri hvatanju podataka." };
  }
}

export async function getUserLikedWebsites(
  userId: string,
): Promise<DataResponse<GridWebsiteData[]>> {
  try {
    const websites = await prisma.website.findMany({
      where: { likedBy: { some: { userId: userId } } },
      include: {
        user: { select: { name: true, image: true, id: true } },
        likedBy: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { data: websites, error: null };
  } catch (error) {
    console.error("GET_USER_LIKED_WEBSITES_ERROR:", error);
    return { data: [], error: "Greška pri hvatanju podataka." };
  }
}

export async function getAllLikes() {
  return await prisma.like.findMany();
}

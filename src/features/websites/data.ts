import { prisma } from "@lib/prisma";
import {
  Category,
  ColorStyle,
  PrimaryColor,
  Style,
  Technology,
} from "@prisma/client";

import { DataResponse } from "@/types/actions";

import { GridWebsiteData, UserWebsitesTableData } from "./types";

export async function getAllApprovedWebsites({
  username,
  category,
  style,
  colorStyle,
  technology,
  sort,
}: {
  username?: string;
  category?: Category;
  style?: Style;
  colorStyle?: ColorStyle;
  technology?: Technology;
  sort?: string;
}): Promise<DataResponse<GridWebsiteData[]>> {
  try {
    const userId =
      username && (await prisma.user.findUnique({ where: { username } }))?.id;
    const websites = await prisma.website.findMany({
      where: {
        userId: userId,
        status: "APPROVED",
        category,
        style,
        colorStyle,
        technology,
      },
      include: {
        user: { select: { username: true, image: true, id: true } },
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

export async function getUserLikedWebsites(
  username: string,
  sort?: string,
): Promise<DataResponse<GridWebsiteData[]>> {
  try {
    const userId =
      username && (await prisma.user.findUnique({ where: { username } }))?.id;
    const websites = await prisma.website.findMany({
      where: { likedBy: { some: { userId: userId } } },
      include: {
        user: { select: { username: true, image: true, id: true } },
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
    console.error("GET_USER_LIKED_WEBSITES_ERROR:", error);
    return { data: [], error: "Greška pri hvatanju podataka." };
  }
}

export async function getUserWebsitesTableData(
  userId: string,
): Promise<DataResponse<UserWebsitesTableData[]>> {
  try {
    const websites = await prisma.website.findMany({
      where: { userId: userId },
      include: {
        _count: { select: { likedBy: true } },
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

import { prisma } from "@lib/prisma";
import {
  Category,
  ColorStyle,
  PrimaryColor,
  Style,
  Technology,
} from "@prisma/client";

import { DataResponse } from "@/types/actions";

import { GridWebsiteData } from "./types";

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

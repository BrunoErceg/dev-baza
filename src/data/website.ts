"use server";
import {
  $Enums,
  Category,
  ColorStyle,
  PrimaryColor,
  Style,
  Technology,
  Website,
} from "@prisma/client";

import { GridWebsiteData } from "@features/websites/types";

import { prisma } from "@/lib/prisma";
import { DataResponse } from "@/types/actions";

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

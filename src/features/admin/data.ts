import { prisma } from "@lib/prisma";
import { Website } from "@prisma/client";

import { DataResponse } from "@/types/actions";

export async function getPendingWebsites(): Promise<DataResponse<Website[]>> {
  try {
    const websites = await prisma.website.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    return { data: websites, error: null };
  } catch (error) {
    return { data: [], error: "Greška pri hvatanju podataka." };
  }
}

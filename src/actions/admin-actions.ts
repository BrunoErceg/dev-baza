"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rejectReasonSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function acceptWebsite(websiteId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  if (session?.user?.role !== "ADMIN") {
    return { error: "Niste admin!" };
  }

  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: { status: "APPROVED" },
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { success: "Web stranica uspješno prihvaćena!" };
  } catch (error: any) {
    console.log("ACCEPT_WEBSITE_ERROR:", error);

    if (error.code === "P2025") {
      return { error: "Stranica nije pronađena!" };
    }
    return { error: "Greška pri spremanju u bazu." };
  }
}

export async function rejectWebsite(websiteId: string, rawData: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Niste prijavljeni!" };
  }

  if (session?.user?.role !== "ADMIN") {
    return { error: "Niste admin!" };
  }

  const validation = rejectReasonSchema.safeParse(rawData);
  console.log(validation);
  if (!validation.success) {
    return { error: "Niste popunili sva polja!" };
  }

  const data = validation.data;

  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: { status: "REJECTED", rejectionReason: data.reason },
    });
    revalidatePath("/dashboard");
    return { success: "Web stranica uspješno odbijena!" };
  } catch (error: any) {
    console.log("REJECT_WEBSITE_ERROR:", error);

    if (error.code === "P2025") {
      return { error: "Stranica nije pronađena!" };
    }
    return { error: "Greška pri spremanju u bazu." };
  }
}

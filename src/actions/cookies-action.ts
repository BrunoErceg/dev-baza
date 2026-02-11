"use server";

import { cookies } from "next/headers";

import { GridConfig } from "@/types/websites";

export async function updateGridConfigCookie(newConfig: GridConfig) {
  const cookieStore = await cookies();
  cookieStore.set("gridConfig", newConfig, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

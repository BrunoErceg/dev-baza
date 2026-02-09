"use server";

import { cookies } from "next/headers";

export async function updateGridConfigCookie(newConfig: "big" | "small") {
  const cookieStore = await cookies();
  cookieStore.set("gridConfig", newConfig, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

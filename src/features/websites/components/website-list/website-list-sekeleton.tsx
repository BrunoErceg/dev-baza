import { cookies } from "next/headers";

import { cn } from "@lib/utils";

import { GridConfig } from "@features/websites/types";

export async function WebsiteListSkeleton() {
  const cookieStore = await cookies();
  const initialGridConfig =
    (cookieStore.get("gridConfig")?.value as GridConfig) || "big";
  return (
    <div
      className={cn(
        "grid gap-10",
        initialGridConfig === "big" ? "grid-cols-3" : "grid-cols-4",
      )}
    ></div>
  );
}

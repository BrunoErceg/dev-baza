import { cookies } from "next/headers";

import { cn } from "@lib/utils";

import { GridConfig } from "@features/websites/types";

import { AspectRatio } from "@ui/aspect-ratio";
import { Skeleton } from "@ui/skeleton";

export async function WebsiteListSkeleton() {
  const cookieStore = await cookies();
  const initialGridConfig =
    (cookieStore.get("gridConfig")?.value as GridConfig) || "big";
  const skeletonsCards = Array.from({
    length: initialGridConfig === "big" ? 6 : 8,
  });
  return (
    <>
      <div
        className={cn(
          "grid w-full gap-10",
          initialGridConfig === "big" ? "grid-cols-3" : "grid-cols-4",
        )}
      >
        {skeletonsCards.map((_, i) => (
          <div key={i}>
            <AspectRatio ratio={8 / 6} className="bg-muted group relative">
              <Skeleton className="h-full w-full" />
            </AspectRatio>
            <div className="mt-3 flex justify-between">
              <div className="flex gap-3">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="mt-1 h-4 w-30 rounded-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-5 rounded-full" />{" "}
                <Skeleton className="size-5 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

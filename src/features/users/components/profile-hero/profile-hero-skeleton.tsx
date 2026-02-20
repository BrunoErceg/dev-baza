import { cn } from "@lib/utils";

import { Skeleton } from "@ui/skeleton";

export function ProfileHeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <Skeleton className="size-20 rounded-full" />
      <Skeleton className="h-10 w-70 rounded-2xl" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-100 rounded-2xl" />
        <Skeleton className="h-6 w-80 rounded-2xl" />
      </div>

      <div className="mt-6 flex gap-4">
        <Skeleton className="h-8 w-22 rounded-2xl" />
        <Skeleton className="h-8 w-22 rounded-2xl" />
      </div>
    </div>
  );
}

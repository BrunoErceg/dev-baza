import { cn } from "@lib/utils";

import { Skeleton } from "@ui/skeleton";

export function ChatBodySkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-5 p-4", className)}>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-8 w-50" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-30" />
      </div>
    </div>
  );
}

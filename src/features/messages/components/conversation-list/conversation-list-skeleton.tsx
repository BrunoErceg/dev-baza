import { Skeleton } from "@ui/skeleton";

export function ConversationListSkeleton() {
  return (
    <div className="flex flex-col gap-5 px-3 py-4">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <div key={i} className="flex items-center gap-5">
            <Skeleton className="size-14 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-35" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

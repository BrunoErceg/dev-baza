import { Skeleton } from "@ui/skeleton";

export function ChatHeaderSkeleton() {
  return (
    <div className="flex w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-30" />
      </div>
      <Skeleton className="size-5 rounded-full" />
    </div>
  );
}

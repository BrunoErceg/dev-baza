import { Skeleton } from "@ui/skeleton";

export function DashboardStatsSkeleton() {
  return (
    <div className="flex justify-between gap-5">
      <Skeleton className="h-31 w-full rounded-xl" />
      <Skeleton className="h-31 w-full rounded-xl" />
      <Skeleton className="h-31 w-full rounded-xl" />
      <Skeleton className="h-31 w-full rounded-xl" />
    </div>
  );
}

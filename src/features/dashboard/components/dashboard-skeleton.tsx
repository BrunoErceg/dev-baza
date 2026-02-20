import { Skeleton } from "@ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-8 space-y-5">
        <div className="flex gap-5">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>

        <Skeleton className="h-70 w-full rounded-xl" />

        <Skeleton className="h-70 w-full rounded-xl" />
      </div>
      <div className="col-span-4 space-y-5">
        <Skeleton className="h-100 w-full rounded-xl" />
        <Skeleton className="h-50 w-full rounded-xl" />
      </div>
    </div>
  );
}

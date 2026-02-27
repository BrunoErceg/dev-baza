import { Skeleton } from "@ui/skeleton";

export function CandidatesListSkeleton() {
  return (
    <ul className="mt-2 flex w-full flex-col">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-5 w-40" />
          <div className="flex flex-1 justify-end">
            <Skeleton className="size-5 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

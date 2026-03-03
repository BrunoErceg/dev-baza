import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:max-w-480 lg:px-15",
        className,
      )}
    >
      {children}
    </div>
  );
}

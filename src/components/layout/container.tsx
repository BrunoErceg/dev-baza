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
      className={cn("mx-auto lg:max-w-480 px-4 sm:px-6 lg:px-15", className)}
    >
      {children}
    </div>
  );
}

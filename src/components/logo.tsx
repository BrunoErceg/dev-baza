import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <p id="logo" className={cn("text-4xl font-bold", className)}>
    Dev-baza
  </p>
);

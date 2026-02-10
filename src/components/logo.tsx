import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <p id="logo" className={cn("text-3xl font-bold", className)}>
    Dev-baza
  </p>
);

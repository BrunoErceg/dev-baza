import Link from "next/link";

import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <Link id="logo" href="/" className={cn("text-4xl font-bold", className)}>
    Dev-baza
  </Link>
);

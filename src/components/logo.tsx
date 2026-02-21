import Link from "next/link";

import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <Link
    id="logo"
    href="/"
    className={cn("text-xl font-bold md:text-3xl", className)}
  >
    Dev-baza
  </Link>
);

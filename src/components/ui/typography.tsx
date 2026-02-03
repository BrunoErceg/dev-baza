import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="scroll-m-20 text-center text-4xl font-semibold tracking-tight text-balance">{children}</h1>;
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>{children}</h2>;
}

export function H3({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>;
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("leading-7 not-first:mt-6", className)}>{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground text-xl">{children}</p>;
}

export function Large({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
}

export function Small({ children }: { children: ReactNode }) {
  return <small className="text-sm leading-none font-medium">{children}</small>;
}

export function Muted({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
}

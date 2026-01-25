import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="scroll-m-20 text-center text-4xl font-semibold tracking-tight text-balance">{children}</h1>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="leading-7 not-first:mt-6">{children}</p>;
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

export function Muted({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}

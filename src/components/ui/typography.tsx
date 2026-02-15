import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "funnel-display scroll-m-20 text-4xl leading-[1.2]! font-semibold! tracking-[-0.035em] text-balance md:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "funnel-display scroll-m-20 text-3xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "funnel-display scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function P({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("max-w-[60ch] text-lg leading-7 not-first:mt-6", className)}
    >
      {children}
    </p>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground text-xl">{children}</p>;
}

export function Large({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
}

export function Small({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("text-sm font-medium", className)}>{children}</p>;
}

export function Muted({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}

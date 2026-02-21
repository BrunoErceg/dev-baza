"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "@lib/utils";
import { LucideIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui/navigation-menu";

export function MobileNavMenu({ className }: { className?: string }) {
  const PAGE_LINKS = [
    {
      title: "Početna",
      href: "/",
    },

    {
      title: "Istraži",
      href: "/istrazi",
    },
    {
      title: "Pomoć",
      href: "/pomoc",
    },
  ];
  return (
    <NavigationMenu className={cn("z-40 mt-10 items-start", className)}>
      <NavigationMenuList className="flex-col items-start gap-5">
        {PAGE_LINKS.map((link, linkIdx) => (
          <NavigationMenuItem key={linkIdx}>
            <Link href={link.href} className="text-xl font-semibold">
              {link.title}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  Icon,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  Icon: LucideIcon;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex gap-4">
            <Icon className="mt-1 size-4" />
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="text-muted-foreground line-clamp-2">
                {children}
              </div>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

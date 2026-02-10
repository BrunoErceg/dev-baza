"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="flex gap-10 text-base data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <Link
          className="font-semibold text-gray-900 duration-150 hover:text-gray-500"
          href="/"
        >
          Početna
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link
          className="font-semibold text-gray-900 duration-150 hover:text-gray-500"
          href="#"
        >
          Istraži
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link
          className="font-semibold text-gray-900 duration-150 hover:text-gray-500"
          href="#"
        >
          O nama
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link
          className="font-semibold text-gray-900 duration-150 hover:text-gray-500"
          href="#"
        >
          Kontakt
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

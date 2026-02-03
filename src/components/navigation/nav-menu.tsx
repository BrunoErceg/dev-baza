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
    <NavigationMenuList className="flex gap-5 data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <Link className="text-gray-900 font-semibold hover:text-gray-500 duration-150" href="/">
          Početna
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link className="text-gray-900 font-semibold hover:text-gray-500 duration-150" href="#">
          Istraži
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link className="text-gray-900 font-semibold hover:text-gray-500 duration-150" href="#">
          O nama
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link className="text-gray-900 font-semibold hover:text-gray-500 duration-150" href="#">
          Kontakt
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

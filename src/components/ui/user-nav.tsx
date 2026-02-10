"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { LogOut, LucideIcon, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function UserNav({ userImage }: { userImage: string }) {
  const NAV_ITEMS = [
    {
      title: "Profil",
      href: "/dashboard/profile",
      Icon: User,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      Icon: Settings,
    },
  ];
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar size="lg" className="cursor-pointer">
          <AvatarImage src={userImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 p-3" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Moj Račun</DropdownMenuLabel>
          {NAV_ITEMS.map((item) => (
            <DropdownMenuItem key={item.title} asChild>
              <Link href={item.href} className="flex gap-2">
                <item.Icon />
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut />
            Odjava
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

import { ProfileAvatar } from "./profile-avatar";

export function UserNavDropdown({
  user,
}: {
  user: { id: string; image: string };
}) {
  const NAV_ITEMS = [
    {
      title: "Profil",
      href: `/profil/${user.id}`,
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
      <DropdownMenuTrigger>
        <ProfileAvatar image={user.image} className="size-10" />
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

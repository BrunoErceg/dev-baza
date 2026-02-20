"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { BadgePlus, UserStar } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

import { AdminAwardDialog } from "./admin-award-dialog";
import { DeleteWebsiteAwardItem } from "./delete-award-item";
import { DeleteWebsiteItem } from "./delete-website-item";

interface WebsiteAdminDropdownProps {
  websiteAward: string | null;
  websiteId: string;
  className?: string;
}

export function WebsiteAdminDropdown({
  websiteAward,
  websiteId,
  className,
}: WebsiteAdminDropdownProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className={cn("absolute top-2 left-2 z-20 opacity-100", className)}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" asChild>
            <p>
              <UserStar />
            </p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 p-3" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Admin Opcije</DropdownMenuLabel>
            {websiteAward ? (
              <DeleteWebsiteAwardItem websiteId={websiteId} />
            ) : (
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                <div className="flex cursor-pointer items-center gap-2">
                  <BadgePlus />
                  Dodjeli Priznanje
                </div>
              </DropdownMenuItem>
            )}
            <DeleteWebsiteItem websiteId={websiteId} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AdminAwardDialog
        isOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        websiteId={websiteId}
      />
    </div>
  );
}

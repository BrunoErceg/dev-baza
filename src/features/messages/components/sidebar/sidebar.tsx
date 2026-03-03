import { ReactNode } from "react";

import { cn } from "@lib/utils";

import { Large } from "@ui/typography";

import { NewConversation } from "../new-conversation/new-conversation";

interface SidebarProps {
  className?: string;
  children: ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  return (
    <div
      className={cn("flex w-full flex-col border-r md:w-sm lg:w-lg", className)}
    >
      <div className="flex justify-between border-b px-3 py-6">
        <Large className="text-xl md:text-xl">Poruke</Large>
        <NewConversation />
      </div>

      {children}
    </div>
  );
}

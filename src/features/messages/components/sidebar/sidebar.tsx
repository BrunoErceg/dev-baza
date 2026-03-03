import { ReactNode } from "react";

import { Large } from "@ui/typography";

import { NewConversation } from "../new-conversation/new-conversation";

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-lg flex-col border-r">
      <div className="flex justify-between border-b px-3 py-6">
        <Large className="text-xl md:text-xl">Poruke</Large>
        <NewConversation />
      </div>

      {children}
    </div>
  );
}

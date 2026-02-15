import { ReactNode } from "react";

export function WebsiteListNavigation({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between gap-5 py-5">
      {children}
    </div>
  );
}

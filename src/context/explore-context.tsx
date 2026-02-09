"use client";
import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const ExploreContext = createContext<any>(null);

export function ExploreProvider({
  gridConfigCookie,
  children,
}: {
  gridConfigCookie: "big" | "small" | undefined;
  children: React.ReactNode;
}) {
  const [gridConfig, setGridConfig] = useState<"big" | "small">(
    gridConfigCookie || "big",
  );
  return (
    <ExploreContext.Provider value={{ gridConfig, setGridConfig }}>
      {children}
    </ExploreContext.Provider>
  );
}

"use client";
import { ReactNode, createContext, useState } from "react";
import { useContext } from "react";

import { updateGridConfigCookie } from "@/actions/cookies-action";

import { GridConfig } from "@/types/websites";

interface WebsitesContextType {
  userId?: string;
  gridConfig: GridConfig;
  updateGrid: (config: GridConfig) => void;
}
interface WebsitesProviderProps {
  userId?: string;
  initialGridConfig: GridConfig;
  children: ReactNode;
}

export const WebsitesContext = createContext<WebsitesContextType | undefined>(
  undefined,
);
export function WebsitesProvider({
  userId,
  initialGridConfig,
  children,
}: WebsitesProviderProps) {
  const [gridConfig, setGridConfig] = useState<GridConfig>(
    initialGridConfig || "big",
  );
  const updateGrid = async (config: GridConfig) => {
    setGridConfig(config);
    await updateGridConfigCookie(config);
  };
  return (
    <WebsitesContext.Provider
      value={{
        userId: userId,
        gridConfig,
        updateGrid,
      }}
    >
      {children}
    </WebsitesContext.Provider>
  );
}

export function useWebsites() {
  const context = useContext(WebsitesContext);
  if (!context) {
    throw new Error("useExplore must be used within an ExploreProvider");
  }
  return context;
}

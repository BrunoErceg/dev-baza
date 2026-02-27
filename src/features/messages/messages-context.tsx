"use client";
import { ReactNode, createContext, useState } from "react";
import { useContext } from "react";

interface MessagesContextType {
  userId: string;
  activeChatId?: string | null;
  setActiveChat: (id: string | null) => void;
}
interface MessagesProviderProps {
  userId: string;
  children: ReactNode;
}

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

export function MessagesProvider({ userId, children }: MessagesProviderProps) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const setActiveChat = async (id: string | null) => {
    setActiveChatId(id);
  };
  return (
    <MessagesContext.Provider value={{ userId, activeChatId, setActiveChat }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within an WebsitesProvider");
  }
  return context;
}

import { MessagesProvider } from "../messages-context";
import { Chat } from "./chat/chat";
import { Sidebar } from "./sidebar/sidebar";

export function MessagesContent({ userId }: { userId: string }) {
  return (
    <>
      <MessagesProvider userId={userId}>
        <Sidebar />

        <Chat className="w-full flex-1" />
      </MessagesProvider>
    </>
  );
}

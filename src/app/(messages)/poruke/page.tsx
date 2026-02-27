import { auth } from "@/auth";

import { Container } from "@features/layout/components/container";
import { Chat } from "@features/messages/components/chat/chat";
import { Sidebar } from "@features/messages/components/sidebar/sidebar";
import { MessagesProvider } from "@features/messages/messages-context";

import { Card } from "@ui/card";

export default async function MessagesPage() {
  const session = await auth();

  return (
    <Container className="flex w-full">
      <Card className="flex flex-1 flex-row gap-0 p-0">
        <MessagesProvider userId={session.user.id}>
          <Sidebar />
          <Chat className="w-full flex-1" />
        </MessagesProvider>
      </Card>
    </Container>
  );
}

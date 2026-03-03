import { cn } from "@lib/utils";

import { Container } from "@features/layout/components/container";
import { Chat } from "@features/messages/components/chat/chat";
import { ConversationList } from "@features/messages/components/conversation-list/conversation-list";
import { Sidebar } from "@features/messages/components/sidebar/sidebar";
import { getConversations } from "@features/messages/data";

import { Card } from "@ui/card";

export async function generateMetadata({ params }: { params: any }) {
  const { id } = await params;

  return {
    // Ovo "Poruke" ili "Razgovor" ulazi na mjesto %s u RootLayoutu
    title: id ? "Razgovor" : "Poruke",
  };
}

export default async function MessagesPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await getConversations();
  const { id } = await params;
  return (
    <Container className="flex w-full">
      <Card className="flex flex-1 gap-0 p-0 md:flex-row">
        <Sidebar className={id && "hidden md:flex"}>
          <ConversationList initialConversations={data} error={error} />
        </Sidebar>

        <div className={cn("hidden flex-1 flex-col md:flex", id && "flex")}>
          <Chat className="w-full flex-1" />
        </div>
      </Card>
    </Container>
  );
}

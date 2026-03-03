import { Container } from "@features/layout/components/container";
import { Chat } from "@features/messages/components/chat/chat";
import { ConversationList } from "@features/messages/components/conversation-list/conversation-list";
import { Sidebar } from "@features/messages/components/sidebar/sidebar";
import { getConversations } from "@features/messages/data";

import { Card } from "@ui/card";

export default async function MessagesPage() {
  const { data, error } = await getConversations();

  return (
    <Container className="flex w-full">
      <Card className="flex flex-1 flex-row gap-0 p-0">
        <Sidebar>
          <ConversationList initialConversations={data} error={error} />
        </Sidebar>

        <Chat className="w-full flex-1" />
      </Card>
    </Container>
  );
}

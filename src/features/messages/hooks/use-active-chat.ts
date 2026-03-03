import { useParams } from "next/navigation";

export function useActiveChat() {
  const params = useParams().id;
  const activeChatId = params ? params[0] : null;

  return { activeChatId };
}

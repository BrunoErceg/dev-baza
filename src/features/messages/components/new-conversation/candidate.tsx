import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { User } from "@prisma/client";
import { CirclePlus } from "lucide-react";

import { createConversation } from "@features/messages/actions";
import { ProfileAvatar } from "@features/users/components/profile-avatar";

import { Button } from "@ui/button";
import { Spinner } from "@ui/spinner";
import { Large } from "@ui/typography";

export function Candidate({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSelect = (id: string) => {
    startTransition(async () => {
      const { data: newConversation } = await createConversation(id);
      if (newConversation) router.push(`/poruke/${newConversation.id}`);
    });
  };
  return (
    <li
      key={user.id}
      className="flex cursor-pointer items-center gap-3 rounded-2xl p-2 hover:bg-gray-100"
      onClick={() => onSelect(user.id)}
    >
      <ProfileAvatar image={user.image} className="size-8" />
      <Large>@{user.username}</Large>
      <Button
        variant="ghost"
        disabled={isPending}
        className="flex flex-1 items-center justify-end"
      >
        {isPending ? <Spinner /> : <CirclePlus />}
      </Button>
    </li>
  );
}

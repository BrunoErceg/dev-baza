import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

import { getNewChatCandidates } from "@features/users/data";

import { NewConversationFormValues, newConversationSchema } from "../schema";

export function useCandidateSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const { register, watch } = useForm<NewConversationFormValues>({
    resolver: zodResolver(newConversationSchema),
    defaultValues: {
      username: "",
    },
  });
  const username = watch("username");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const newUsers = await getNewChatCandidates(username);
        setUsers(newUsers.data || []);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [username]);

  return { users, isLoading, register };
}

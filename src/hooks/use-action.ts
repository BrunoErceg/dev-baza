import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";

export function useAction<T extends any[]>(
  actionFn: (...args: T) => Promise<{ success?: string; error?: string }>,
) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const action = (...args: T) => {
    startTransition(async () => {
      const result = await actionFn(...args);
      if (result.success) {
        toast.success(result.success);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };

  return { action, isPending };
}

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";

export function useServerAction<T extends any[]>(
  actionFn: (...args: T) => Promise<{ success?: string; error?: string }>,
  onSuccess?: () => void,
  onError?: () => void,
) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const action = (...args: T) => {
    startTransition(async () => {
      const result = await actionFn(...args);
      if (result.success) {
        toast.success(result.success);
        if (onSuccess) onSuccess();
        router.refresh();
      } else if (result.error) {
        if (onError) onError();
        toast.error(result.error);
      }
    });
  };

  return { action, isPending };
}

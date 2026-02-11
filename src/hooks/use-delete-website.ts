import { useRouter } from "next/navigation";
import { useTransition } from "react";

import deleteWebsite from "@/actions/website-actions";
import { toast } from "sonner";

export function useDeleteWebsite() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const executeDelete = async (websiteId: string) => {
    startTransition(async () => {
      const result = await deleteWebsite(websiteId);
      if (result.success) {
        toast.success(result.success);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };
  return { executeDelete, isPending };
}

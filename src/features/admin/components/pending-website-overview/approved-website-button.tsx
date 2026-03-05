import { useTransition } from "react";

import { toast } from "sonner";

import { acceptWebsite } from "@features/admin/actions";

import { Button } from "@ui/button";
import { Spinner } from "@ui/spinner";

export function ApprovedWebsiteButton({ websiteId }: { websiteId: string }) {
  const [isPending, startTransition] = useTransition();
  const onApprove = () => {
    startTransition(async () => {
      const { error } = await acceptWebsite(websiteId);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Uspješno ste odobrili web stranicu!");
      }
    });
  };
  return (
    <Button disabled={isPending} onClick={() => onApprove()} className="w-22">
      {isPending ? <Spinner /> : "Odobri"}
    </Button>
  );
}

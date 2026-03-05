import { useTransition } from "react";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import adminDeleteWebsite from "@features/admin/actions";

import { DropdownMenuItem } from "@ui/dropdown-menu";

export function DeleteWebsiteItem({ websiteId }: { websiteId: string }) {
  const [isPending, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      const { error } = await adminDeleteWebsite(websiteId);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Uspješno ste izbrisali web stranicu!");
      }
    });
  };
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onSelect={() => onDelete()}
    >
      <TrashIcon />
      {isPending ? "Brisanje..." : "Izbriši"}
    </DropdownMenuItem>
  );
}

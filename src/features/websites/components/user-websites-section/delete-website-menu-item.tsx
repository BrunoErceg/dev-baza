import { useTransition } from "react";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { deleteWebsite } from "@features/websites/actions";

import { DropdownMenuItem } from "@ui/dropdown-menu";

export function DeleteWebsiteMenuItem({ websiteId }: { websiteId: string }) {
  const [isPending, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      const { error } = await deleteWebsite(websiteId);
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
      className="cursor-pointer"
      disabled={isPending}
      onSelect={() => onDelete()}
    >
      <TrashIcon />
      {isPending ? "Brisanje..." : "Izbriši"}
    </DropdownMenuItem>
  );
}

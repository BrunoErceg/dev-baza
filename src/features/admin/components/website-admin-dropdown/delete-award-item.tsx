import { useTransition } from "react";

import { Trophy } from "lucide-react";
import { toast } from "sonner";

import { deleteAward } from "@features/admin/actions";

import { DropdownMenuItem } from "@ui/dropdown-menu";

export function DeleteWebsiteAwardItem({ websiteId }: { websiteId: string }) {
  const [isPending, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      const { error } = await deleteAward(websiteId);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Uspješno ste izbrisali priznanje!");
      }
    });
  };
  return (
    <DropdownMenuItem
      onClick={() => onDelete()}
      onSelect={(e) => e.preventDefault()}
    >
      <Trophy />
      {isPending ? "Brisanje..." : "Ukloni Priznanje"}
    </DropdownMenuItem>
  );
}

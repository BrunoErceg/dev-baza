import { useServerAction } from "@hooks/use-server-action";
import { TrashIcon } from "lucide-react";

import { deleteWebsite } from "@features/websites/actions";

import { DropdownMenuItem } from "@ui/dropdown-menu";

export function DeleteWebsiteMenuItem({ websiteId }: { websiteId: string }) {
  const { isPending, action } = useServerAction(deleteWebsite);
  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      onClick={() => action(websiteId)}
    >
      <TrashIcon />
      {isPending ? "Brisanje..." : "Izbriši"}
    </DropdownMenuItem>
  );
}

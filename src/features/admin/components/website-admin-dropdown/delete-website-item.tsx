import { useServerAction } from "@hooks/use-server-action";
import { TrashIcon } from "lucide-react";

import adminDeleteWebsite from "@features/admin/actions";

import { DropdownMenuItem } from "@ui/dropdown-menu";

export function DeleteWebsiteItem({ websiteId }: { websiteId: string }) {
  const { isPending, action } = useServerAction(adminDeleteWebsite);
  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={() => action(websiteId)}
      onSelect={(e) => e.preventDefault()}
    >
      <TrashIcon />
      {isPending ? "Brisanje..." : "Izbriši"}
    </DropdownMenuItem>
  );
}

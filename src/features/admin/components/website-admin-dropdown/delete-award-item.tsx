import { useServerAction } from "@hooks/use-server-action";
import { Trophy } from "lucide-react";

import { deleteAward } from "@features/admin/actions";

import { DropdownMenuItem } from "@ui/dropdown-menu";

export function DeleteWebsiteAwardItem({ websiteId }: { websiteId: string }) {
  const { isPending, action } = useServerAction(deleteAward);
  return (
    <DropdownMenuItem
      onClick={() => action(websiteId)}
      onSelect={(e) => e.preventDefault()}
    >
      <Trophy />
      {isPending ? "Brisanje..." : "Ukloni Priznanje"}
    </DropdownMenuItem>
  );
}

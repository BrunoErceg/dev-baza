import { useServerAction } from "@hooks/use-server-action";

import { acceptWebsite } from "@features/admin/actions";

import { Button } from "@ui/button";
import { Spinner } from "@ui/spinner";

export function ApprovedWebsiteButton({ websiteId }: { websiteId: string }) {
  const { isPending, action } = useServerAction(acceptWebsite);
  return (
    <Button onClick={() => action(websiteId)} className="w-22">
      {isPending ? <Spinner /> : "Odobri"}
    </Button>
  );
}

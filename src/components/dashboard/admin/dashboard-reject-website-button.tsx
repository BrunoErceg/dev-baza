"use client";

import { Button } from "../../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { rejectWebsite } from "@/actions/reject-website";

export function DashboardRejectWebsiteButton({ websiteId }: { websiteId: string }) {
  const router = useRouter();
  const handleReject = async (websiteId: string) => {
    const results = await rejectWebsite(websiteId);
    if (results.success) {
      toast.success(results.success);
      router.refresh();
    }
    if (results.error) toast.error(results.error);
  };
  return <Button onClick={() => handleReject(websiteId)}>Odbij</Button>;
}

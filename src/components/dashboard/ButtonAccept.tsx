"use client";
import { acceptWebsite } from "@/actions/accept-website";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ButtonAccept({ websiteId }: { websiteId: string }) {
  const router = useRouter();
  const handleAccept = async (websiteId: string) => {
    const results = await acceptWebsite(websiteId);
    if (results.success) {
      toast.success(results.success);
      router.refresh();
    }
    if (results.error) toast.error(results.error);
  };
  return <Button onClick={() => handleAccept(websiteId)}>Odobri</Button>;
}

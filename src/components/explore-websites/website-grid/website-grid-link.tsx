"use client";
import { addView } from "@/actions/add-view";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function WebsiteLink({ websiteUrl, websiteId, children }: { websiteUrl: string; websiteId: string; children: React.ReactNode }) {
  const router = useRouter();
  const handelClick = async (websiteId: string) => {
    await addView(websiteId);
    router.refresh();
  };
  return (
    <Link href={websiteUrl} target="_blank" onClick={() => handelClick(websiteId)}>
      {children}
    </Link>
  );
}

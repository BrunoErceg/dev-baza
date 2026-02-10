"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { addView } from "@/actions/website-actions";

export function WebsiteLink({
  websiteUrl,
  websiteId,
  setViewsCount,
  children,
}: {
  websiteUrl: string;
  websiteId: string;
  setViewsCount: Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handelView = async (id: string) => {
    setViewsCount((prev: number) => prev + 1);
    await addView(id);
  };
  return (
    <Link
      href={websiteUrl}
      target="_blank"
      onClick={() => handelView(websiteId)}
    >
      {children}
    </Link>
  );
}

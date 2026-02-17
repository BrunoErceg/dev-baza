"use client";
import Link from "next/link";

import { addView } from "@features/websites/actions";

export function WebsiteLink({
  url,
  id,
  children,
}: {
  url: string;
  id: string;
  children: React.ReactNode;
}) {
  const handelView = async (id: string) => {
    await addView(id);
  };
  return (
    <Link href={url} target="_blank" onClick={() => handelView(id)}>
      {children}
    </Link>
  );
}

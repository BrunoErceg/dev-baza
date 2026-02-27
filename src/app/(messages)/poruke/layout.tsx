import { ReactNode } from "react";

import { Footer } from "@features/layout/components/footer";
import { Navbar } from "@features/layout/components/nav-bar";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="mb-10 flex min-h-0 flex-1">{children}</main>
    </div>
  );
}

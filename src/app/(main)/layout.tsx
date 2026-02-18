import { ReactNode } from "react";

import { Footer } from "@features/layout/components/footer";
import { Navbar } from "@features/layout/components/nav-bar";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}

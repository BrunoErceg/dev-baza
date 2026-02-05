import { Container } from "@/components/layout/container";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { auth } from "@/auth";
import { getProfile } from "@/data/profile";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const user = await getProfile(session.user.id);
  if (!user) redirect("/api/auth/signin");
  return (
    <Container className="mt-15 flex gap-5">
      <DashboardSidebar user={user} />
      <div className="w-full flex flex-col gap-7">{children}</div>
    </Container>
  );
}

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getProfile } from "@/data/profile";
import { getPendingWebsites, getUserWebsites } from "@/data/websites";

import { UserWebsitesSection } from "./_components/user-websites-section";
import { AdminSection } from "./_components/admin-section";
import { UserDeleteSection } from "./_components/user-delete-section";
import { ProfileSettings } from "./_components/profile-settings";

export default async function dashboard() {
  const session = await auth();
  const user = await getProfile(session.user.id);
  const pendingWebsites = await getPendingWebsites();

  if (!user) {
    redirect("/api/auth/signin");
  }
  const websites = await getUserWebsites(user.id);
  return (
    <>
      <ProfileSettings user={user} />
      <UserWebsitesSection websites={websites} />
      <AdminSection websites={pendingWebsites} />
      <UserDeleteSection />{" "}
    </>
  );
}

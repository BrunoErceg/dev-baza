import { auth } from "@/auth";
import { DeleteProfile } from "@/components/dashboard/DeleteProfile";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { ProfileSidebar } from "@/components/dashboard/ProfileSidebar";
import { WebsitesApproval } from "@/components/dashboard/WebsitesApproval";
import { YourWebsites } from "@/components/dashboard/YourWebsites";
import { getProfile } from "@/data/profile";
import { getPendingWebsites } from "@/data/websites";
import { Delete } from "lucide-react";
import { redirect } from "next/navigation";

export default async function dashboard() {
  const session = await auth();
  const user = await getProfile(session.user.id);

  if (!user) {
    redirect("/api/auth/signin");
  }
  const pendingWebsites = await getPendingWebsites();

  return (
    <div className="container max-w-6xl mx-auto mt-15 flex gap-5">
      <ProfileSidebar name={user.name} key={user.name} />
      <div className="w-full flex flex-col gap-7">
        <ProfileSettings user={user} />
        <YourWebsites userid={user?.id} />
        {user?.role === "ADMIN" && <WebsitesApproval websites={pendingWebsites} />}
        <DeleteProfile />
      </div>
    </div>
  );
}

import { auth } from "@/auth";
import { AddWebsite } from "@/components/dashboard/AddWebsite";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { ProfileSidebar } from "@/components/dashboard/ProfileSidebar";
import { YourWebsites } from "@/components/dashboard/YourWebsites";

export default async function dashboard() {
  const session = await auth();
  const user = session.user;

  return (
    <div key={user.name} className="container max-w-6xl mx-auto mt-15 flex gap-5">
      <ProfileSidebar name={user.name} />
      <div className="w-full flex flex-col gap-7">
        <ProfileSettings user={user} />
        {/**  <AddWebsite />*/}
        <YourWebsites userid={user.id} />
      </div>
    </div>
  );
}

import { User } from "@prisma/client";

import { Muted, P } from "@/components/ui/typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DashboardCard } from "./dashboard-card";
import { UpdateProfileForm } from "./update-profile-form";
import { DashboardDialog } from "./dashboard-dialog";
import { UpdateAvatarForm } from "./update-avatar-form";

export function ProfileSettings({ user }: { user: User }) {
  return (
    <DashboardCard
      title="Postavke profila"
      description="Upravljajte podacima svog računa."
    >
      <div className="flex gap-7 items-center">
        <DashboardDialog
          cta={
            <Avatar className="w-30 h-30 cursor-pointer">
              <AvatarImage src={user.image} />
            </Avatar>
          }
          title="Promijenite svoju sliku profila."
          description=" Promjene će biti vidljive na vašim objavama i profilu."
        >
          <UpdateAvatarForm />
        </DashboardDialog>
        <div>
          <P>{user.name}</P>
          <Muted>{user.email}</Muted>
        </div>
      </div>
      <div>
        <UpdateProfileForm user={user} />
      </div>
    </DashboardCard>
  );
}

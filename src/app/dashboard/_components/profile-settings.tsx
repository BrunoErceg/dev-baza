import { User } from "@prisma/client";

import { Large, Muted, P } from "@/components/ui/typography";
import { DashboardCard } from "./dashboard-card";
import { UpdateProfileForm } from "./update-profile-form";
import { UpdateAvatarForm } from "./update-avatar-form";

export function ProfileSettings({ user }: { user: User }) {
  return (
    <DashboardCard
      title="Postavke profila"
      description="Upravljajte podacima svog računa."
    >
      <div className="flex gap-7 items-center">
        <UpdateAvatarForm userImage={user.image} />
        <div>
          <Large>Profilna Slika</Large>
          <Muted>
            Kliknite na avatar za prijenos nove fotografije.
            <br /> JPG ili PNG. Maksimalno 4 MB.
          </Muted>
        </div>
      </div>
      <div>
        <UpdateProfileForm user={user} />
      </div>
    </DashboardCard>
  );
}

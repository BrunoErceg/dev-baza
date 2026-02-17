import { User } from "@prisma/client";

import { SectionCard } from "@ui/section-card";

import { UpdateAvatarForm } from "./update-avatar-form";
import { UpdateProfileForm } from "./update-profile-form";

export function ProfileSettingsCard({ user }: { user: User }) {
  return (
    <SectionCard
      title="Postavke profila"
      description="Upravljajte podacima svog računa."
    >
      <UpdateAvatarForm userImage={user.image} />
      <UpdateProfileForm user={user} />
    </SectionCard>
  );
}

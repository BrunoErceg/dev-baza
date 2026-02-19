import { redirect } from "next/navigation";

import { getAuthUser } from "@features/users/data";

import { SectionCard } from "@ui/section-card";

import { UpdateAvatarForm } from "./update-avatar-form";
import { UpdateProfileForm } from "./update-profile-form";

export async function ProfileSettingsSection() {
  const { data: user } = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

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

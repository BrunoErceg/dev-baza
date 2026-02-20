import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { getAuthUser } from "@features/users/data";

import { SectionCard } from "@ui/section-card";
import { Skeleton } from "@ui/skeleton";

import { UpdateAvatarForm } from "./update-avatar-form";
import { UpdateProfileForm } from "./update-profile-form";

export function ProfileSettingsSection() {
  return (
    <Suspense fallback={<Skeleton className="h-100 w-full rounded-md" />}>
      <ProfileSettingsContent />
    </Suspense>
  );
}

async function ProfileSettingsContent() {
  const { data: user } = await getAuthUser();
  if (!user) return notFound();

  return (
    <SectionCard
      title="Postavke profila"
      description="Upravljajte podacima svog računa."
    >
      <UpdateAvatarForm userImage={user.image} />
      <UpdateProfileForm
        user={{
          name: user.name,
          username: user.username,
          emailContact: user.emailContact,
          website: user.website,
          bio: user.bio,
        }}
      />
    </SectionCard>
  );
}

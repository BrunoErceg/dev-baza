import { AddWebsiteDialog } from "@features/websites/components/add-website-dialog";
import { UserWebsiteWithCount } from "@features/websites/types";

import { EmptyState } from "@ui/empty-state";
import { SectionCard } from "@ui/section-card";

import { UserWebsiteTable } from "./user-websites-table";

export function UserWebsitesSection({
  websites,
}: {
  websites: UserWebsiteWithCount[];
}) {
  const isEmpty = websites.length === 0;
  return (
    <SectionCard
      key={websites.length}
      title="Vaše web stranice"
      description="Upravljajte svojim projektima."
      cta={<AddWebsiteDialog />}
    >
      {isEmpty ? (
        <EmptyState
          title="Još nema web stranica"
          description="Još niste dodali nijednu web stranicu. Započnite tako što ćete dodati svoju prvu stranicu."
        />
      ) : (
        <UserWebsiteTable websites={websites} />
      )}
    </SectionCard>
  );
}

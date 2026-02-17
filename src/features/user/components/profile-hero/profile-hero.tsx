import Link from "next/link";

import { User } from "@prisma/client";

import { cn } from "@/lib/utils";

import { ActionDialog } from "@ui/action-dialog";
import { Button } from "@ui/button";
import { H1, P } from "@ui/typography";

import { ProfileAvatar } from "../profile-avatar";
import { ProfileContactForm } from "./profile-contact-form";

const WebsiteButton = ({ websiteUrl }: { websiteUrl?: string | null }) => {
  return (
    <>
      {websiteUrl && (
        <Button variant="outline" size="lg" asChild>
          <Link href={websiteUrl}>Web Stranica</Link>
        </Button>
      )}
    </>
  );
};

export async function ProfileHero({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full items-center", className)}>
      <div>
        <ProfileAvatar image={user.image} className="size-20" />
        <H1 className="mt-4">{user.name}</H1>
        <P className="max-w-[60ch]">{user.bio}</P>

        <div className="mt-12 flex gap-4">
          <ActionDialog
            title="Pošalji poruku"
            description={`Ispunite sva polja u nastavku da kontaktirate ${user.name}`}
            cta={<Button size="lg">Posalji poruku</Button>}
          >
            {/* TODO: fix Type 'string | null' is not assignable to type 'string'. */}
            <ProfileContactForm profileEmail={user.emailContact ?? ""} />
          </ActionDialog>

          <WebsiteButton websiteUrl={user.website} />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

import { User } from "@prisma/client";

import { cn } from "@/lib/utils";

import { ActionDialog } from "@ui/action-dialog";
import { Button } from "@ui/button";
import { H1, P } from "@ui/typography";

import { ProfileAvatar } from "../profile-avatar";
import { ProfileContactForm } from "./profile-contact-form";

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
        <H1 className="mt-4 -translate-x-1">@{user.username}</H1>
        {user.bio && <P className="max-w-[60ch]">{user.bio}</P>}

        <div className="mt-12 flex gap-4">
          {user.emailContact && (
            <ActionDialog
              title="Pošalji poruku"
              description={`Ispunite sva polja u nastavku da kontaktirate ${user.name}`}
              cta={<Button size="lg">Pošalji poruku</Button>}
            >
              <ProfileContactForm profileEmail={user.emailContact} />
            </ActionDialog>
          )}

          {user.website && (
            <Button variant="outline" size="lg" asChild>
              <Link
                href={user.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                Web Stranica
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

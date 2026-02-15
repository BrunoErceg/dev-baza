import Link from "next/link";

import { Avatar, AvatarImage } from "@components/ui/avatar";
import { User } from "@prisma/client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";

import { ProfileContactDialog } from "./profile-contact-dialog";

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
        <Avatar className="size-20 cursor-pointer">
          <AvatarImage src={user.image} />
        </Avatar>
        <H1 className="funnel-display mt-5 text-5xl font-semibold">
          {user.name}
        </H1>
        <P className="text-foreground/80 max-w-[60ch] sm:text-lg">{user.bio}</P>
        <div className="mt-12 flex gap-4">
          <ProfileContactDialog name={user.name} email={user.email} />
          {user.website && (
            <Button variant="outline" size="lg" asChild>
              <Link href={user.website}>Web Stranica</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

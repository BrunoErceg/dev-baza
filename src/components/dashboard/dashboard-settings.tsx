import { User } from "@prisma/client";
import { ProfileForm } from "../forms/ProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { P, Muted } from "../ui/typography";
import { DashboardAvatar } from "./dashboard-avatar";
export default function DashboardSettings({ user }: { user: User }) {
  return (
    <Card className="flex gap-5 flex-col">
      <CardHeader>
        <CardTitle>Postavke profila</CardTitle>
        <CardDescription>Upravljajte podacima svog računa.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-7 items-center">
          <DashboardAvatar image={user.image} />
          <div>
            <P>{user.name}</P>
            <Muted>{user.email}</Muted>
          </div>
        </div>
        <div>
          <ProfileForm user={user} />
        </div>
      </CardContent>
    </Card>
  );
}

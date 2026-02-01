import { NameForm } from "../blocks/NameForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { P, Muted } from "../ui/typography";
import Image from "next/image";
export default function ProfileSettings({ user }: { user: any }) {
  return (
    <Card className="flex gap-5 flex-col">
      <CardHeader>
        <CardTitle>Postavke profila</CardTitle>
        <CardDescription>Upravljajte podacima svog računa.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-7 items-center">
          <div>
            <Image
              src="https://jrgxq33rwp.ufs.sh/f/BNaNzrQS3KNeOIpQ9sfX6YjFCOQ0PUb84RtzAZJkh3B95pvN"
              alt="Profile"
              width={100}
              height={100}
              className="inline-block shrink-0 align-sub text-inherit size-lg rounded-full"
            />
          </div>
          <div>
            <P>{user.name}</P>
            <Muted>{user.email}</Muted>
          </div>
        </div>
        <div className="md:w-1/2">
          <NameForm />
        </div>
      </CardContent>
    </Card>
  );
}

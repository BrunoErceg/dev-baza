"use client";
import { AddWebsite } from "@/components/blocks/AddWebsite";
import { DeleteProfile } from "@/components/blocks/DeleteProfile";
import { NameForm } from "@/components/blocks/NameForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Muted, P, Small } from "@/components/ui/typography";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function profile() {
  const { data: session } = useSession();
  return (
    <div className="container mx-auto mt-35">
      <Card className="w-full">
        <CardContent>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your account details.</CardDescription>
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                alt="Profile"
                width={100}
                height={100}
                className="inline-block shrink-0 align-sub text-inherit size-lg rounded-full"
              />
            )}
            <P>{session?.user?.name}</P>
            <Muted>{session?.user?.email}</Muted>
          </CardHeader>
          <CardContent>
            <NameForm />
            <DeleteProfile />
          </CardContent>
          <CardFooter></CardFooter>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent>
          <CardHeader>
            <CardTitle>Add WebSite</CardTitle>
            <CardDescription>Manage your websites here.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddWebsite />
          </CardContent>
          <CardFooter></CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

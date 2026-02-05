"use client";
import deleteUser from "@/actions/delete-user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { signOut } from "@/auth";

export function DashboardDeleteProfile() {
  const deleteProfile = async () => {
    const res = await deleteUser();
    if (res.success) {
      signOut({ callbackUrl: "/" });
    }
  };
  return (
    <Card className="relative rounded-4xl">
      <CardHeader>
        <CardTitle>Izbriši svoj račun</CardTitle>
        <CardDescription>
          Trajno izbrišite svoj korisnički račun i sve povezane podatke (web stranice, lajkove). Ova radnja je nepovratna.
        </CardDescription>
        <CardContent className="p-0 mt-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Izbriši račun</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Jeste li potpuno sigurni?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ova radnja je nepovratna. Vaš korisnički račun bit će trajno izbrisan, a svi povezani podaci uklonjeni s naših
                  poslužitelja.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Ne</AlertDialogCancel>
                <Button variant="destructive" onClick={deleteProfile}>
                  Da, Izbriši
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

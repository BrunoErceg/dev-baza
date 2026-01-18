import { Button } from "@/src/components/ui/button";
import { Logo } from "@/src/components/logo";
import { NavMenu } from "@/src/components/nav-menu";
import { NavigationSheet } from "@/src/components/navigation-sheet";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { signIn } from "@/src/auth";
const Navbar = () => {
  /*
  const { data: session } = useSession();
  return (
    <nav className="fixed z-999 top-6 inset-x-4 h-16 bg-background border max-w-(--breakpoint-xl) mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {session ? (
            <Button variant="outline" className="hidden sm:inline-flex rounded-full" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button variant="outline" className="hidden sm:inline-flex rounded-full">
              <Link href="/login"> Sing In </Link>
            </Button>
          )}

          <Button className="rounded-full">Get Started</Button>

         
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav> */
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
};

export default Navbar;

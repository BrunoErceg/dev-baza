"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn("github")}>Github Sign in</button>
        <button onClick={() => signIn("google")}>Google Sign in</button>
      </>
    );
  }
  return (
    <>
      Signed in as {session.user?.name} <br /> <button onClick={() => signOut()}>Logout</button>
    </>
  );
};

export function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}

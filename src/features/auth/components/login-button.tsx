import Link from "next/link";

import { Button } from "@ui/button";

export function LoginButton() {
  return (
    <Button>
      <Link href="/prijava">Prijava</Link>
    </Button>
  );
}

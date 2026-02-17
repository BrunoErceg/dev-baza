import Link from "next/link";

import { Button } from "@ui/button";

export function RegisterButton() {
  return (
    <Button variant="outline">
      <Link href="/registracija">Registracija</Link>
    </Button>
  );
}

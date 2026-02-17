import Link from "next/link";

import { Button } from "@ui/button";

export function DashboardButton() {
  return (
    <Button>
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  );
}

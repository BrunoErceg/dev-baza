import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "react";

interface DashboardCardProps {
  title: string;
  description: string;
  cta?: React.ReactNode;
  children: React.ReactNode;
  key?: Key;
}

export function DashboardCard({ title, description, cta, children, key }: DashboardCardProps) {
  return (
    <Card key={key} className="flex gap-5 flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {cta && <CardAction>{cta}</CardAction>}
      </CardHeader>

      <CardContent className="flex flex-col gap-5">{children}</CardContent>
    </Card>
  );
}

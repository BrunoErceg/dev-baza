import { cn } from "@lib/utils";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";

interface SectionCardProps {
  title: string;
  description: string;
  cta?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function SectionCard({
  title,
  description,
  cta,
  className,
  children,
}: SectionCardProps) {
  return (
    <Card className={cn("flex flex-col gap-5", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {cta && <CardAction>{cta}</CardAction>}
      </CardHeader>

      <CardContent className="flex flex-col gap-5">{children}</CardContent>
    </Card>
  );
}

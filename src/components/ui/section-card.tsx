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
  children: React.ReactNode;
}

export function SectionCard({
  title,
  description,
  cta,
  children,
}: SectionCardProps) {
  return (
    <Card className="flex flex-col gap-5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {cta && <CardAction>{cta}</CardAction>}
      </CardHeader>

      <CardContent className="flex flex-col gap-5">{children}</CardContent>
    </Card>
  );
}

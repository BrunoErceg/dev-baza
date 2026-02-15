import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description: string;
  cta?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardCard({
  title,
  description,
  cta,
  children,
}: DashboardCardProps) {
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

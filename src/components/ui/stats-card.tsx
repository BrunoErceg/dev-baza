import {
  DollarSign,
  EyeIcon,
  LucideIcon,
  ShoppingCart,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";

interface StatsCardProps {
  title: string;
  value: string | number | undefined;
  Icon: LucideIcon;
  className?: string;
}

export function StatsCard({ title, value, Icon, className }: StatsCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <div className="bg-primary/10 rounded-md p-2">
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

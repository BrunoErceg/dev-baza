"use client";
import { EyeIcon, ThumbsUp } from "lucide-react";

import { WebsitesStats } from "@/types/websites";

import { StatsCard } from "@/components/ui/stats-card";

export function DashboardStats({ stats }: { stats: WebsitesStats }) {
  const monthLikesChange = stats.thisMonthLikes - stats.lastMonthLikes;
  return (
    <div className="flex justify-between gap-5">
      <StatsCard
        title="Sveukupni pregledi"
        value={stats.totalViews}
        icon={<EyeIcon className="size-4" />}
      />
      <StatsCard
        title="Sveukupni lajkovi"
        value={stats.totalLikes}
        icon={<ThumbsUp className="size-4" />}
      />
      <StatsCard
        title="Mjesečni lajkovi"
        value={stats.thisMonthLikes}
        icon={<ThumbsUp className="size-4" />}
        subtitle={
          monthLikesChange > 0 ? (
            <span className="text-green-600">
              +{monthLikesChange} više nego zadnji mjesec
            </span>
          ) : monthLikesChange < 0 ? (
            <span className="text-red-600">
              {monthLikesChange} manje nego prošli mjesec
            </span>
          ) : (
            <span className="text-muted-foreground">
              Isto kao i prošli mjesec
            </span>
          )
        }
      />
    </div>
  );
}

"use client";
import { EyeIcon, ThumbsUp, Trophy } from "lucide-react";

import { WebsitesStats } from "@features/websites/types";

import { StatsCard } from "@ui/stats-card";

export function StatsSection({ stats }: { stats: WebsitesStats }) {
  const statsConfig = [
    {
      title: "Sveukupni pregledi",
      value: stats.totalViews,
      Icon: EyeIcon,
    },
    {
      title: "Sveukupni lajkovi",
      value: stats.totalLikes,
      Icon: ThumbsUp,
    },
    {
      title: "Mjesečni lajkovi",
      value: stats.thisMonthLikes,
      Icon: ThumbsUp,
    },
    {
      title: "Nagrade",
      value: stats.totalAwards,
      Icon: Trophy,
    },
  ];
  return (
    <div className="flex justify-between gap-5">
      {statsConfig.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          Icon={stat.Icon}
        />
      ))}
    </div>
  );
}

"use client";
import { EyeIcon, ThumbsUp, Trophy } from "lucide-react";

import { WebsitesStats } from "@/types/websites";

import { StatsCard } from "@/components/ui/stats-card";

export function DashboardStats({ stats }: { stats: WebsitesStats }) {
  const STATS_CONFIG = [
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
      value: stats.totalLikes, // Jesi siguran da ovdje ne ide neki drugi field?
      Icon: Trophy,
    },
  ];
  return (
    <div className="flex justify-between gap-5">
      {STATS_CONFIG.map((stat, index) => (
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

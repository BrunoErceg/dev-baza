import { Suspense } from "react";

import { auth } from "@/auth";
import { EyeIcon, ThumbsUp, Trophy } from "lucide-react";

import { StatsCard } from "@ui/stats-card";

import { getDashboardStats } from "../data";
import { DashboardStatsSkeleton } from "./dashboard-stats-skeleton";

export function DashboardStats() {
  return (
    <Suspense fallback={<DashboardStatsSkeleton />}>
      <DashboardStatsContent />
    </Suspense>
  );
}

async function DashboardStatsContent() {
  const session = await auth();
  const { data } = await getDashboardStats(session.user.id);
  if (!data) return null;
  const statsConfig = [
    {
      title: "Sveukupni pregledi",
      value: data.totalViews,
      Icon: EyeIcon,
    },
    {
      title: "Sveukupni lajkovi",
      value: data.totalLikes,
      Icon: ThumbsUp,
    },
    {
      title: "Mjesečni lajkovi",
      value: data.thisMonthLikes,
      Icon: ThumbsUp,
    },
    {
      title: "Nagrade",
      value: data.totalAwards,
      Icon: Trophy,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
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

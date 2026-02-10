import { Prisma } from "@prisma/client";

export type GridConfig = "small" | "big";

export type DashboardData = {
  websites: UserWebsiteWithCount[];
  stats: WebsitesStats;
};

export type UserWebsiteWithCount = Prisma.WebsiteGetPayload<{
  include: { _count: { select: { likedBy: true } } };
}>;

export type WebsitesStats = {
  totalViews: number;
  thisMonthLikes: number;
  lastMonthLikes: number;
  totalLikes: number;
};
export type WebsiteWithUserAndLikes = Prisma.WebsiteGetPayload<{
  include: { user: { select: { name: true; image: true } }; likedBy: true };
}>;

export type OrderByOption = "Datum" | "Lajkovi" | "Pregledi";

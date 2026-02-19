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
  totalAwards: number;
};

export type GridWebsiteData = Prisma.WebsiteGetPayload<{
  include: {
    user: { select: { username: true; image: true; id: true } };
    likedBy: true;
  };
}>;

export type UserWebsitesTableData = Prisma.WebsiteGetPayload<{
  include: {
    _count: { select: { likedBy: true } };
  };
}>;

export type OrderByOption = "datum" | "lajkovi" | "pregledi";

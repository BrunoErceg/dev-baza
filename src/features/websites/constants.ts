import {
  Category,
  ColorStyle,
  PrimaryColor,
  Style,
  Technology,
  WebsiteStatus,
} from "@prisma/client";
import {
  Blocks,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Database,
  Globe,
  HeartPulse,
  History,
  Home,
  Layers,
  Layout,
  LucideIcon,
  MousePointer2,
  Paintbrush,
  Palmtree,
  Server,
  ShoppingBag,
  Sparkles,
  Utensils,
  XCircle,
  Zap,
} from "lucide-react";

import { OrderByOption } from "@features/websites/types";

export const CATEGORY_MAP: Record<
  Category,
  { icon: LucideIcon; description: string; label: string; slug: string }
> = {
  TURIZAM: {
    label: "Turizam",
    slug: "turizam",
    description: "Najbolje web stranice turističkih agencija.",
    icon: Palmtree,
  },
  GASTRONOMIJA: {
    label: "Gastronomija",
    slug: "gastronomija",
    description: "Prezentacije restorana i vrhunskih recepata.",
    icon: Utensils,
  },
  NEKRETNINE: {
    label: "Nekretnine",
    slug: "nekretnine",
    description: "Moderni portali za prodaju nekretnina.",
    icon: Home,
  },
  ZDRAVLJE: {
    label: "Zdravlje",
    slug: "zdravlje",
    description: "Web stranice poliklinika i savjetovališta.",
    icon: HeartPulse,
  },
  BIZNIS: {
    label: "Biznis",
    slug: "biznis",
    description: "Korporativne stranice za ozbiljne tvrtke.",
    icon: Briefcase,
  },
  AUTOMOTO: {
    label: "Auto Moto",
    slug: "auto-moto",
    description: "Sve o vozilima na jednom mjestu.",
    icon: Car,
  },
  OSTALO: {
    label: "Ostalo",
    slug: "ostalo",
    description: "Razne web stranice unikatnih kategorija.",
    icon: Layers,
  },
};

export const STYLE_MAP: Record<
  Style,
  { label: string; slug: string; description: string; icon: any }
> = {
  MINIMALISTICKI: {
    label: "Minimalistički",
    slug: "minimalisticki",
    description: "Jednostavan dizajn s fokusom na sadržaj.",
    icon: MousePointer2,
  },
  MODERAN: {
    label: "Moderan",
    slug: "moderan",
    description: "Suvremeni trendovi i napredne animacije.",
    icon: Zap,
  },
  RETRO: {
    label: "Retro",
    slug: "retro",
    description: "Povratak u prošlost kroz estetiku.",
    icon: History,
  },
  ELEGANTAN: {
    label: "Elegantan",
    slug: "elegantan",
    description: "Profinjen kôd i vizualna harmonija.",
    icon: Sparkles,
  },
  KORPORATIVNI: {
    label: "Korporativni",
    slug: "korporativni",
    description: "Struktura i profesionalnost u dizajnu.",
    icon: Building2,
  },
  KREATIVAN: {
    label: "Kreativan",
    slug: "kreativan",
    description: "Unikatan pristup bez postavljenih granica.",
    icon: Paintbrush,
  },
  OSTALO: {
    label: "Ostalo",
    slug: "ostalo",
    description: "Stilovi koji prkose klasičnim definicijama.",
    icon: Layers,
  },
};

export const TECH_MAP: Record<
  Technology,
  { label: string; slug: string; icon: any }
> = {
  NEXTJS: { label: "Next.js", slug: "nextjs", icon: Cpu },
  REACT: { label: "React", slug: "react", icon: Code2 },
  VUE: { label: "Vue.js", slug: "vue", icon: Layout },
  ANGULAR: { label: "Angular", slug: "angular", icon: Globe },
  SVELTE: { label: "Svelte", slug: "svelte", icon: Zap },
  LARAVEL: { label: "Laravel", slug: "laravel", icon: Server },
  NODEJS: { label: "Node.js", slug: "nodejs", icon: Database },
  WORDPRESS: { label: "WordPress", slug: "wordpress", icon: Layers },
  WEBFLOW: { label: "Webflow", slug: "webflow", icon: MousePointer2 },
  SHOPIFY: { label: "Shopify", slug: "shopify", icon: ShoppingBag },
  STRAPI: { label: "Strapi", slug: "strapi", icon: Blocks },
  OTHER: { label: "Ostalo", slug: "ostalo", icon: Code2 },
};

export const PRIMARY_COLOR_MAP: Record<
  PrimaryColor,
  { label: string; slug: string; twClass: string }
> = {
  WHITE: { label: "Bijela", slug: "bijela", twClass: "bg-white border" },
  BLACK: { label: "Crna", slug: "crna", twClass: "bg-black" },
  GRAY: { label: "Siva", slug: "siva", twClass: "bg-gray-500" },
  RED: { label: "Crvena", slug: "crvena", twClass: "bg-red-500" },
  BLUE: { label: "Plava", slug: "plava", twClass: "bg-blue-500" },
  GREEN: { label: "Zelena", slug: "zelena", twClass: "bg-green-500" },
  YELLOW: { label: "Žuta", slug: "zuta", twClass: "bg-yellow-400" },
  ORANGE: { label: "Narančasta", slug: "narancasta", twClass: "bg-orange-500" },
  PURPLE: { label: "Ljubičasta", slug: "ljubicasta", twClass: "bg-purple-500" },
  PINK: { label: "Ružičasta", slug: "ruzicasta", twClass: "bg-pink-500" },
};

export const COLOR_STYLE_MAP: Record<
  ColorStyle,
  { label: string; slug: string }
> = {
  DARK: { label: "Tamni", slug: "tamni" },
  LIGHT: { label: "Svijetli", slug: "svijetli" },
  COLORFUL: { label: "Šareni", slug: "sareni" },
  MINIMALIST: { label: "Minimalistički", slug: "minimalisticki" },
  PASTEL: { label: "Pastelni", slug: "pastelni" },
  MONOCHROME: { label: "Jednobojni", slug: "jednobojni" },
};

export const ORDER_BY_MAP: Record<
  "NEWEST" | "LIKED" | "VIEWED",
  { label: string; slug: OrderByOption }
> = {
  NEWEST: { label: "Datum", slug: "datum" },
  LIKED: { label: "Lajkovi", slug: "lajkovi" },
  VIEWED: { label: "Pregledi", slug: "pregledi" },
};

export const WEBSITE_STATUS_MAP: Record<
  WebsiteStatus,
  { label: string; Icon: LucideIcon; color: string }
> = {
  PENDING: {
    label: "Na čekanju",
    Icon: Clock,
    color: "text-gray-600",
  },
  APPROVED: {
    label: "Odobreno",
    Icon: CheckCircle2,
    color: "text-green-800",
  },
  REJECTED: {
    label: "Odbijeno",
    Icon: XCircle,
    color: "text-red-600",
  },
};

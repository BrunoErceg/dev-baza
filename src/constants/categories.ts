import { Category, Style } from "@prisma/client";
import {
  Briefcase,
  Building2,
  Car,
  HeartPulse,
  History,
  Home,
  Layers,
  MousePointer2,
  Paintbrush,
  Palmtree,
  Sparkles,
  Utensils,
  Zap,
} from "lucide-react";

export const CATEGORY_MAP = {
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

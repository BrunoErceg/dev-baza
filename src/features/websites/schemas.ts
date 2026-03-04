import * as z from "zod";

import {
  CATEGORY_MAP,
  COLOR_STYLE_MAP,
  STYLE_MAP,
  TECH_MAP,
} from "./constants";

// Izvlačimo ključeve iz mapa kao "const" nizove za Zod
const CATEGORIES = Object.keys(CATEGORY_MAP) as [string, ...string[]];
const STYLES = Object.keys(STYLE_MAP) as [string, ...string[]];
const TECHS = Object.keys(TECH_MAP) as [string, ...string[]];
const COLORS = Object.keys(COLOR_STYLE_MAP) as [string, ...string[]];

export const websiteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Naziv mora imati barem 2 znaka.")
    .max(32, "Naziv može imati najviše 32 znaka."),
  url: z.url({ message: "Unesite ispravnu URL adresu." }),
  image: z.string().min(1, "Slika je obavezna."),
  category: z.enum(CATEGORIES),
  style: z.enum(STYLES),
  technology: z.enum(TECHS),
  colorStyle: z.enum(COLORS),
});

export type WebsiteFormValues = z.infer<typeof websiteSchema>;

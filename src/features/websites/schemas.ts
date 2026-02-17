import { Category, Style } from "@prisma/client";
import * as z from "zod";

export const websiteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Naziv mora imati barem 2 znaka.")
    .max(32, "Naziv može imati najviše 32 znaka."),
  url: z.url({ message: "Unesite ispravnu URL adresu." }),
  image: z.string().min(1, "Slika je obavezna."),
  category: z.enum(Object.values(Category)),
  style: z.enum(Object.values(Style)),
});

export type WebsiteFormValues = z.infer<typeof websiteSchema>;

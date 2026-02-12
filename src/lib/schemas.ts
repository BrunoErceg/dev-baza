import { Category, NotificationType, Style } from "@prisma/client";
import * as z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ime mora imati barem 3 znaka.")
    .max(32, "Ime može imati najviše 32 znaka."),
  phone: z
    .string()
    .trim()
    .min(3, "Broj mora imati barem 3 znaka.")
    .max(32, "Broj može imati najviše 32 znaka.")
    .optional(),
  email: z.email().optional(),
  website: z.url("Unesite ispravnu URL adresu.").optional(),
  company: z
    .string()
    .trim()
    .min(3, "Ime kompanije mora imati barem 3 znaka.")
    .max(32, "Ime kompanije može imati najviše 32 znaka.")
    .optional(),
});

export const avatarSchema = z.object({
  image: z.url({ error: "Unesite ispravnu URL adresu." }),
});

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

export const rejectReasonSchema = z.object({
  reason: z.string().min(1, "Komentar je obavezan."),
});

export const notificationSchema = z.object({
  type: z.enum(NotificationType),
  message: z
    .string()
    .min(1, "Poruka je obavezna.")
    .max(64, "Poruka može imati najviše 64 znaka."),
});

export const awardSchema = z.object({
  award: z
    .string()
    .min(2, "Priznanje mora imati barem 2 znaka.")
    .max(32, "Priznanje može imati najviše 32 znaka."),
});

export type AwardFormValues = z.infer<typeof awardSchema>;
export type RejectReasonFormValues = z.infer<typeof rejectReasonSchema>;
export type WebsiteFormValues = z.infer<typeof websiteSchema>;
export type AvatarFormValues = z.infer<typeof avatarSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;

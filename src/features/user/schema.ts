import z from "zod";

export const profileContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ime mora imati barem 3 znaka.")
    .max(32, "Ime može imati najviše 32 znaka."),
  fromEmail: z.email(),
  toEmail: z.email(),
  subject: z
    .string()
    .trim()
    .min(3, "Naslov mora imati barem 3 znaka.")
    .max(64, "Naslov može imati najviše 64 znaka."),
  message: z
    .string()
    .trim()
    .min(3, "Poruka mora imati barem 3 znaka.")
    .max(256, "Poruka može imati najviše 256 znaka."),
});
export type ProfileContactFormValues = z.infer<typeof profileContactSchema>;

export const avatarSchema = z.object({
  image: z.url({ error: "Unesite ispravnu URL adresu." }),
});
export type AvatarFormValues = z.infer<typeof avatarSchema>;

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
  bio: z
    .string()
    .trim()
    .min(3, "Opis mora imati barem 3 znaka.")
    .max(256, "Opis može imati najviše 256 znaka."),
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

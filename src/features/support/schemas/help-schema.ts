import z from "zod";

export const helpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ime mora imati barem 3 znaka.")
    .max(32, "Ime može imati najviše 32 znaka."),
  fromEmail: z.email(),
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

export type HelpFormValues = z.infer<typeof helpSchema>;

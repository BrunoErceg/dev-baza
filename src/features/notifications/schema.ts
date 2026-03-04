import z from "zod";

export const NotificationTypes = [
  "POSITIVE",
  "NEGATIVE",
  "NEUTRAL",
  "LIKE",
] as const;

export const notificationSchema = z.object({
  type: z.enum(NotificationTypes),
  message: z
    .string()
    .min(1, "Poruka je obavezna.")
    .max(64, "Poruka može imati najviše 64 znaka."),
});

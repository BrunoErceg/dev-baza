import { NotificationType } from "@prisma/client";
import z from "zod";

export const notificationSchema = z.object({
  type: z.enum(NotificationType),
  message: z
    .string()
    .min(1, "Poruka je obavezna.")
    .max(64, "Poruka može imati najviše 64 znaka."),
});

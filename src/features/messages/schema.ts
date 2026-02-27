import z from "zod";

export const newConversationSchema = z.object({
  username: z
    .string()
    .min(3, "Minimalno 3 znaka")
    .max(20, "Maksimalno 20 znakova")
    .toLowerCase(),
});

export type NewConversationFormValues = z.infer<typeof newConversationSchema>;

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Poruka je obavezna.")
    .max(256, "Poruka može imati najviše 256 znakova."),
});

export type MessageFormValues = z.infer<typeof messageSchema>;

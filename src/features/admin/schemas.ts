import z from "zod";

export const rejectReasonSchema = z.object({
  reason: z.string().min(1, "Komentar je obavezan."),
});
export type RejectReasonFormValues = z.infer<typeof rejectReasonSchema>;

export const awardSchema = z.object({
  award: z
    .string()
    .min(2, "Priznanje mora imati barem 2 znaka.")
    .max(32, "Priznanje može imati najviše 32 znaka."),
});

export type AwardFormValues = z.infer<typeof awardSchema>;

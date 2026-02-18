import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const onboardingSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(3, "Username mora imati barem 3 znaka.")
    .max(20, "Username može imati najviše 20 znaka.")
    .regex(/^[a-zA-Z0-9_]+$/, "Dopuštena su samo slova, brojke i podvlaka (_).")
    .toLowerCase(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

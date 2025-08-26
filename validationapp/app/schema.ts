import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Username too short."),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must contain at leat 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const signInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password too short"),
});

export type SignUpForm = z.infer<typeof signUpSchema>;
export type SignInForm = z.infer<typeof signInSchema>;

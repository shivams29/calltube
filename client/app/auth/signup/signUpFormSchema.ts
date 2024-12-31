import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, { message: "Name too short" })
      .max(30, { message: "Name too long" }),
    email: z
      .string({
        required_error: "Email address is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100, { message: "Password cannot be more than 100 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Passwords do not match" })
      .max(100, { message: "Passwords do not match" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export interface SignUpFormSchema extends z.infer<typeof signUpFormSchema> {}

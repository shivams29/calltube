import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "Email address is required",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(100, { message: "Password cannot be more than 100 characters" }),
});

export interface LoginFormSchema extends z.infer<typeof loginFormSchema> {}

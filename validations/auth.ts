import z, { email } from "zod";

export const LoginSchemaValidation = z.object({
  email: z.string().email("Invalid Email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters required.")
    .regex(/[A-Z]/, "Must Contains atleast One Uppercase Character")
    .regex(/[0-9]/, "Must contains one digit"),
});

export const RegisterSchemaValidation = z.object({
  name: z.string().min(4, "Minimum 4 characters required"),
  email: z.string().email("Invalid Email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters required.")
    .regex(/[A-Z]/, "Must Contains atleast One Uppercase Character")
    .regex(/[0-9]/, "Must contains one digit"),
});

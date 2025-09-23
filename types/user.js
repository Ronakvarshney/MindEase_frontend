import { z } from "zod";

export const registerschema = z
  .object({
    name: z.string().min(4, "minimum 4 characters required"),
    password: z
      .string()
      .min(5, "Minimum length should be 5")
      .max(20, "maximum length not more than 20")
      .regex(/[A-Z]/, "Pssword must contains atleast one uppercase")
      .regex(/[0-9]/, "Password must contains atleast one digit"),
    confirmPassword: z
      .string()
      .min(5, "Minimum length should be 5")
      .max(20, "maximum length not more than 20"),
    email: z.string().email("Invalid email format"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password were not matches",
    path: ["confirmPassword"],
  });

  
export const loginschema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(5, "Minimum length should be 5")
    .max(20, "maximum length not more than 20")
    .regex(/[A-Z]/, "Pssword must contains atleast one uppercase")
    .regex(/[0-9]/, "Password must contains atleast one digit"),
  role: z.string(),
});

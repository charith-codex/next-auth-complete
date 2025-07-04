import { UserRole } from "@/lib/generated/prisma";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

export const PasswordResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordResetSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(3, { message: "Name is required" })),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email({ message: "Email is required" })),
    password: z.optional(
      z.string().min(6, { message: "Minimum 6 characters required" })
    ),
    newPassword: z.optional(
      z.string().min(6, { message: "Minimum 6 characters required" })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

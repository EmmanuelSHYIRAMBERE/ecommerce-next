import * as z from "zod";

const passwordValidation = () => {
  const isMinLength = z
    .string()
    .min(8, "Password must be at least 8 characters long");

  const isMaxLength = z
    .string()
    .max(100, "Password must be at most 100 characters long");
  const hasUpperCase = z.string().refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  });

  const hasLowerCase = z.string().refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  });

  const hasNumber = z.string().refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  });

  const hasSpecialChar = z
    .string()
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must contain at least one special character",
    });

  return z
    .string()
    .and(isMinLength)
    .and(isMaxLength)
    .and(hasUpperCase)
    .and(hasLowerCase)
    .and(hasNumber)
    .and(hasSpecialChar);
};

export const UserDataValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),

  email: z.email("Invalid email address"),

  image: z.string().optional(),

  password: passwordValidation(),
});

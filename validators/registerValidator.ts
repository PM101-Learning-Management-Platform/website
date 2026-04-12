import z from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1, { message: "First name is required" }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["student", "instructor"])
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

import { z } from "zod";
export const loginFormSchema = z.object({
  email: z
    .string({ message: "El email es obligatorio" })
    .trim()
    .toLowerCase()
    .email("Ingresa un correo válido"),
  
  password: z
    .string({ message: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginForm = z.infer<typeof loginFormSchema>;

// Schema completo para el API
export const loginPayloadSchema = loginFormSchema.extend({
  iv: z.string(),
  platform: z.literal("backoffice"),
  type: z.enum(["lc", "fb", "gm", "apple", "bulk"]),
  pushToken: z.string().default(""),
  version: z.string().regex(/^\d+\.\d+\.\d+$/).default("0.0.1"),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
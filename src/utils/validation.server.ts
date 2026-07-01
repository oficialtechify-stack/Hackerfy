import { z } from "zod";

// Schema for Audit API endpoint
export const AuditSchema = z.object({
  code: z
    .string()
    .min(1, "Code cannot be empty")
    .max(100000, "Code is too long (maximum 100KB)"),
  filename: z.string().max(256, "Filename is too long").optional(),
  language: z.enum(["en", "pt"]).optional().default("en"),
  mode: z.string().max(64).optional(),
});

// Schema for Ask (Chatbot) API endpoint
export const MessageSchema = z.object({
  role: z.enum(["user", "model", "system", "assistant"]),
  content: z.string().max(20000, "Message content is too long"),
  attachments: z.array(z.any()).optional(),
});

export const AskSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(10000, "Message is too long"),
  history: z.array(MessageSchema).optional().default([]),
  language: z.enum(["en", "pt"]).optional().default("en"),
  personality: z.string().max(64).optional(),
  creatorModel: z.string().max(64).optional(),
  learnings: z.array(z.string()).optional(),
  userProfile: z
    .object({
      name: z.string().max(100).optional(),
      age: z.string().max(10).optional(),
      profileType: z.enum(["individual", "empresa"]).optional(),
      howToCall: z.string().max(100).optional(),
      goal: z.string().max(500).optional(),
      phone: z.string().max(30).optional(),
      cnpj: z.string().max(30).optional(),
      birthdate: z.string().max(30).optional(),
    })
    .nullable()
    .optional(),
  userLocation: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      accuracy: z.number().optional(),
      timestamp: z.number().optional(),
    })
    .nullable()
    .optional(),
});

// Schema for Register Audits (Requested by user prompt)
export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(100, "Nome muito longo")
      .trim()
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome contém caracteres inválidos"),
    email: z
      .string()
      .email("Email inválido")
      .toLowerCase()
      .trim()
      .max(254, "Email muito longo"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .max(128, "Senha muito longa")
      .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Senha deve conter pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

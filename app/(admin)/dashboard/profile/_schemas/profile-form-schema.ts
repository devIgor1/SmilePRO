import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter menos de 100 caracteres")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(
      /^(\d{2}\s?\d{4,5}-?\d{4})?$/,
      "O telefone deve estar no formato: XX XXXXX-XXXX"
    )
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, "O endereço deve ter menos de 200 caracteres")
    .optional()
    .or(z.literal("")),
  status: z.boolean(),
  timeslots: z.array(z.string()).default([]),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

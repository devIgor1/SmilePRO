import { z } from "zod";

export const serviceFormSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter menos de 100 caracteres"),
  description: z
    .string()
    .max(500, "A descrição deve ter menos de 500 caracteres")
    .optional()
    .or(z.literal("")),
  price: z
    .number()
    .min(0, "O preço deve ser positivo")
    .max(1000000, "O preço é muito alto"),
  duration: z
    .number()
    .min(5, "A duração deve ser de pelo menos 5 minutos")
    .max(480, "A duração deve ser menor que 8 horas"),
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

import { z } from "zod";

export const appointmentFormSchema = z.object({
  patientName: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter menos de 100 caracteres"),
  email: z.email("Por favor, insira um endereço de e-mail válido"),
  phone: z
    .string()
    .min(10, "O telefone deve ter pelo menos 10 caracteres")
    .max(20, "O telefone deve ter menos de 20 caracteres")
    .regex(
      /^[0-9\s\-\+\(\)]+$/,
      "Por favor, insira um número de telefone válido"
    ),
  serviceId: z.string().min(1, "Por favor, selecione um serviço"),
  appointmentDate: z.date(),
  appointmentTime: z.string().min(1, "Por favor, selecione um horário"),
  notes: z
    .string()
    .max(2000, "As observações devem ter menos de 2000 caracteres")
    .optional()
    .or(z.literal("")),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

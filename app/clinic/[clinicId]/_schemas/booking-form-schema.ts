import { z } from "zod";

/**
 * Phone number validation for booking form
 * Accepts Brazilian and international formats
 */
const phoneValidator = z
  .string()
  .min(8, "O telefone deve ter pelo menos 8 caracteres")
  .max(25, "O telefone deve ter menos de 25 caracteres")
  .regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/,
    "Por favor, insira um número de telefone válido"
  )
  .refine((phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length >= 8 && digitsOnly.length <= 15;
  }, "O número de telefone deve conter entre 8 e 15 dígitos");

export const bookingFormSchema = z.object({
  // Patient information
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter menos de 100 caracteres"),
  email: z
    .string()
    .email("Por favor, insira um endereço de e-mail válido")
    .max(255, "O e-mail deve ter menos de 255 caracteres"),
  phone: phoneValidator,
  dateOfBirth: z.date().optional().nullable(),

  // Appointment information
  serviceId: z.string().min(1, "Por favor, selecione um serviço"),
  appointmentDate: z.date({
    message: "Por favor, selecione uma data",
  }),
  appointmentTime: z.string().min(1, "Por favor, selecione um horário"),
  notes: z
    .string()
    .max(500, "As observações devem ter menos de 500 caracteres")
    .optional()
    .nullable(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

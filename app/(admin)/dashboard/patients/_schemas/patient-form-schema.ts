import { z } from "zod";

/**
 * Phone number validation that accepts both Brazilian and international formats
 *
 * Brazilian formats accepted:
 * - (11) 98765-4321
 * - (11) 3456-7890
 * - 11987654321
 * - +55 11 98765-4321
 * - +5511987654321
 *
 * International formats accepted:
 * - +1 234 567 8900
 * - +44 20 1234 5678
 * - +33123456789
 */
const phoneValidator = z
  .string()
  .min(8, "O telefone deve ter pelo menos 8 caracteres")
  .max(25, "O telefone deve ter menos de 25 caracteres")
  .regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/,
    "Por favor, insira um número de telefone válido (formato brasileiro ou internacional)"
  )
  .refine((phone) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "");

    // Brazilian numbers: should have 10-13 digits (with country code 55)
    // International: should have at least 8 digits
    return digitsOnly.length >= 8 && digitsOnly.length <= 15;
  }, "O número de telefone deve conter entre 8 e 15 dígitos");

export const patientFormSchema = z.object({
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
  address: z
    .string()
    .max(500, "O endereço deve ter menos de 500 caracteres")
    .optional()
    .nullable(),
  notes: z
    .string()
    .max(2000, "As observações devem ter menos de 2000 caracteres")
    .optional()
    .nullable(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;

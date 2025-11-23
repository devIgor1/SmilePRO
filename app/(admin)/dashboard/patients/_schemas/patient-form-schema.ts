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
  .min(8, "Phone must be at least 8 characters")
  .max(25, "Phone must be less than 25 characters")
  .regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/,
    "Please enter a valid phone number (Brazilian or international format)"
  )
  .refine((phone) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "");
    
    // Brazilian numbers: should have 10-13 digits (with country code 55)
    // International: should have at least 8 digits
    return digitsOnly.length >= 8 && digitsOnly.length <= 15;
  }, "Phone number must contain between 8 and 15 digits");

export const patientFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: phoneValidator,
  dateOfBirth: z.date().optional().nullable(),
  address: z
    .string()
    .max(500, "Address must be less than 500 characters")
    .optional()
    .nullable(),
  notes: z
    .string()
    .max(2000, "Notes must be less than 2000 characters")
    .optional()
    .nullable(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;


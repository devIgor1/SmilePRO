import { z } from "zod";

export const patientFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 characters")
    .max(20, "Phone must be less than 20 characters")
    .regex(/^[0-9\s\-\+\(\)]+$/, "Please enter a valid phone number"),
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


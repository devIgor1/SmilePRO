import { z } from "zod";

/**
 * Phone number validation for booking form
 * Accepts Brazilian and international formats
 */
const phoneValidator = z
  .string()
  .min(8, "Phone must be at least 8 characters")
  .max(25, "Phone must be less than 25 characters")
  .regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/,
    "Please enter a valid phone number"
  )
  .refine((phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length >= 8 && digitsOnly.length <= 15;
  }, "Phone number must contain between 8 and 15 digits");

export const bookingFormSchema = z.object({
  // Patient information
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

  // Appointment information
  serviceId: z.string().min(1, "Please select a service"),
  appointmentDate: z.date({
    message: "Please select a date",
  }),
  appointmentTime: z.string().min(1, "Please select a time"),
  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional()
    .nullable(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

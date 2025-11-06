import { z } from "zod";

export const serviceFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  price: z
    .number()
    .min(0, "Price must be positive")
    .max(1000000, "Price is too high"),
  duration: z
    .number()
    .min(5, "Duration must be at least 5 minutes")
    .max(480, "Duration must be less than 8 hours"),
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

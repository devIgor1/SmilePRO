import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(
      /^(\d{2}\s?\d{4,5}-?\d{4})?$/,
      "Phone must be in format: XX XXXXX-XXXX"
    )
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  status: z.boolean(),
  timezone: z.string().optional().or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

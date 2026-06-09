import { z } from "zod";

export const businessAccountSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number is required"),
  creditLimit: z.string().optional(),
  monthlyInvoiceDay: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type BusinessAccountInput = z.infer<typeof businessAccountSchema>;

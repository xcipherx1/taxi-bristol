import { z } from "zod";

export const bookingSchema = z.object({
  pickupLocation: z.string().min(3, "Enter a valid pickup location"),
  dropoffLocation: z.string().min(3, "Enter a valid dropoff location"),
  pickupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  pickupTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  passengers: z.number().int().min(1).max(8),
  childSeatRequired: z.boolean().optional(),
  childSeatAge: z.number().int().min(0).max(12).optional(),
  petTraveling: z.boolean().optional(),
  specialRequests: z.string().max(200).optional(),
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().regex(/^(\+44|0)[0-9]{9,11}$/, "Enter a valid UK phone number"),
  companyName: z.string().optional(),
  isBusinessAccount: z.boolean().optional(),
  vehicleType: z.enum(["standard", "mpv", "executive", "minibus"]).optional(),
  termsAgreed: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

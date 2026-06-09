import { z } from "zod";

export const rateSchema = z.object({
  routeName: z.string().min(3, "Route name is required"),
  pickupLocation: z.string().min(3, "Pickup location is required"),
  dropoffLocation: z.string().min(3, "Dropoff location is required"),
  pricePounds: z.string().min(1, "Price is required"),
  isActive: z.boolean().optional(),
});

export type RateInput = z.infer<typeof rateSchema>;

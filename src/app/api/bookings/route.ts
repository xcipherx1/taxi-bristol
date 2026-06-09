import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/schema";
import { bookingSchema } from "@/validations/booking";
import { generateBookingReference } from "@/lib/booking-ref";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }
    const body = await request.json();
    const validated = bookingSchema.parse(body);
    const bookingReference = generateBookingReference();
    const pickupDatetime = new Date(`${validated.pickupDate}T${validated.pickupTime}`);

    const booking = await db.insert(bookings).values({
      bookingReference,
      pickupLocation: validated.pickupLocation,
      dropoffLocation: validated.dropoffLocation,
      pickupDatetime,
      passengers: validated.passengers,
      childSeatRequired: validated.childSeatRequired || false,
      childSeatAge: validated.childSeatAge || null,
      petTraveling: validated.petTraveling || false,
      specialRequests: validated.specialRequests || null,
      fixedPrice: "35.00",
      customerName: validated.customerName,
      customerEmail: validated.customerEmail,
      customerPhone: validated.customerPhone,
      companyName: validated.companyName || null,
      isBusinessAccount: validated.isBusinessAccount || false,
      vehicleType: validated.vehicleType || "standard",
    }).returning();

    await sendBookingConfirmation({ ...validated, bookingReference, pickupDatetime: pickupDatetime.toLocaleString(), fixedPrice: "35.00" });
    await sendAdminNotification({ ...validated, bookingReference, pickupDatetime: pickupDatetime.toLocaleString(), fixedPrice: "35.00", customerEmail: validated.customerEmail, customerPhone: validated.customerPhone });

    return NextResponse.json({ success: true, bookingReference, booking: booking[0] });
  } catch (error) {
    const err = error as { name?: string; errors?: unknown[]; message?: string };
    if (err.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 });
    }
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

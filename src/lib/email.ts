import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "bookings@taxiservicebristol.uk.com";
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || "info@taxiservicebristol.uk.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://taxi-bristol.vercel.app";

export async function sendBookingConfirmation(booking: Record<string, unknown>) {
  if (!resend) { console.log("[Email] Resend not configured"); return; }
  try {
    await resend.emails.send({
      from: `Taxi Service Bristol <${FROM_EMAIL}>`,
      to: String(booking.customerEmail),
      subject: `Booking Confirmation - ${String(booking.bookingReference)}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#000;color:#FFD900;padding:24px;text-align:center;"><h1 style="margin:0;font-size:24px;">Taxi Service Bristol</h1></div><div style="padding:32px;background:#fff;color:#000;"><h2>Booking Confirmed!</h2><p>Hi ${String(booking.customerName)},</p><p>Your booking has been received.</p><div style="background:#f8f8f8;padding:20px;border-radius:8px;margin:20px 0;"><p><strong>Reference:</strong> ${String(booking.bookingReference)}</p><p><strong>From:</strong> ${String(booking.pickupLocation)}</p><p><strong>To:</strong> ${String(booking.dropoffLocation)}</p><p><strong>Date/Time:</strong> ${String(booking.pickupDatetime)}</p><p><strong>Price:</strong> &pound;${String(booking.fixedPrice)}</p></div></div></div>`,
    });
  } catch (e) { console.error("[Email] Failed:", e); }
}

export async function sendAdminNotification(booking: Record<string, unknown>) {
  if (!resend) { console.log("[Email] Resend not configured"); return; }
  try {
    await resend.emails.send({
      from: `Taxi Service Bristol <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${String(booking.bookingReference)}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;"><h2>New Booking</h2><p><strong>Ref:</strong> ${String(booking.bookingReference)}</p><p><strong>Customer:</strong> ${String(booking.customerName)}</p><p><strong>Email:</strong> ${String(booking.customerEmail)}</p><p><strong>Phone:</strong> ${String(booking.customerPhone)}</p><p><strong>Route:</strong> ${String(booking.pickupLocation)} &rarr; ${String(booking.dropoffLocation)}</p><p><strong>Price:</strong> &pound;${String(booking.fixedPrice)}</p><p><a href="${APP_URL}/admin" style="background:#FFD900;color:#000;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin-top:16px;">View in Dashboard</a></p></div>`,
    });
  } catch (e) { console.error("[Email] Failed:", e); }
}

export async function sendContactNotification(contact: Record<string, unknown>) {
  if (!resend) { console.log("[Email] Resend not configured"); return; }
  try {
    await resend.emails.send({
      from: `Taxi Service Bristol <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Contact: ${String(contact.subject)}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;"><h2>New Contact Form</h2><p><strong>Name:</strong> ${String(contact.name)}</p><p><strong>Email:</strong> ${String(contact.email)}</p><p><strong>Subject:</strong> ${String(contact.subject)}</p><p><strong>Message:</strong></p><p style="background:#f8f8f8;padding:16px;border-radius:8px;">${String(contact.message)}</p></div>`,
    });
  } catch (e) { console.error("[Email] Failed:", e); }
}

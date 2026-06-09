import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { contactSchema } from "@/validations/contact";
import { sendContactNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }
    const body = await request.json();
    const validated = contactSchema.parse(body);

    const message = await db.insert(contactMessages).values({
      name: validated.name,
      email: validated.email,
      phone: validated.phone || null,
      subject: validated.subject,
      message: validated.message,
    }).returning();

    await sendContactNotification(validated as Record<string, unknown>);
    return NextResponse.json({ success: true, message: message[0] });
  } catch (error) {
    const err = error as { name?: string; errors?: unknown[]; message?: string };
    if (err.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 });
    }
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

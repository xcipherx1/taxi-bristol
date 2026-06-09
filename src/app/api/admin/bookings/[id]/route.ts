import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const body = await request.json();
    const updated = await db.update(bookings).set({ status: body.status, updatedAt: new Date() }).where(eq(bookings.id, params.id)).returning();
    return NextResponse.json({ success: true, booking: updated[0] });
  } catch { return NextResponse.json({ error: "Failed to update" }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    await db.delete(bookings).where(eq(bookings.id, params.id));
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Failed to delete" }, { status: 500 }); }
}

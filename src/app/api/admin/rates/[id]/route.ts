import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rates } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const body = await request.json();
    const updateData: Record<string, unknown> = {};
    if (body.routeName) updateData.routeName = body.routeName;
    if (body.pickupLocation) updateData.pickupLocation = body.pickupLocation;
    if (body.dropoffLocation) updateData.dropoffLocation = body.dropoffLocation;
    if (body.pricePounds) updateData.pricePounds = body.pricePounds;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    const updated = await db.update(rates).set(updateData).where(eq(rates.id, params.id)).returning();
    return NextResponse.json({ success: true, rate: updated[0] });
  } catch { return NextResponse.json({ error: "Failed to update" }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    await db.delete(rates).where(eq(rates.id, params.id));
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Failed to delete" }, { status: 500 }); }
}

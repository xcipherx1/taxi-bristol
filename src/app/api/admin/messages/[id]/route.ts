import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const body = await request.json();
    const updated = await db.update(contactMessages).set({ status: body.status }).where(eq(contactMessages.id, params.id)).returning();
    return NextResponse.json({ success: true, message: updated[0] });
  } catch { return NextResponse.json({ error: "Failed to update" }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    await db.delete(contactMessages).where(eq(contactMessages.id, params.id));
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Failed to delete" }, { status: 500 }); }
}

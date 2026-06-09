import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { businessAccounts } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const body = await request.json();
    const updateData: Record<string, unknown> = {};
    if (body.companyName) updateData.companyName = body.companyName;
    if (body.contactName) updateData.contactName = body.contactName;
    if (body.contactEmail) updateData.contactEmail = body.contactEmail;
    if (body.contactPhone) updateData.contactPhone = body.contactPhone;
    if (body.creditLimit) updateData.creditLimit = body.creditLimit;
    if (body.monthlyInvoiceDay) updateData.monthlyInvoiceDay = parseInt(body.monthlyInvoiceDay);
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    const updated = await db.update(businessAccounts).set(updateData).where(eq(businessAccounts.id, params.id)).returning();
    return NextResponse.json({ success: true, account: updated[0] });
  } catch { return NextResponse.json({ error: "Failed to update" }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    await db.delete(businessAccounts).where(eq(businessAccounts.id, params.id));
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Failed to delete" }, { status: 500 }); }
}

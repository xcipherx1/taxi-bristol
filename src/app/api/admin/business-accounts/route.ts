import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { businessAccounts } from "@/lib/schema";
import { businessAccountSchema } from "@/validations/business-account";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const accounts = await db.select().from(businessAccounts).orderBy(desc(businessAccounts.createdAt));
    return NextResponse.json({ success: true, accounts });
  } catch { return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const body = await request.json();
    const validated = businessAccountSchema.parse(body);
    const account = await db.insert(businessAccounts).values({
      companyName: validated.companyName,
      contactName: validated.contactName,
      contactEmail: validated.contactEmail,
      contactPhone: validated.contactPhone,
      creditLimit: validated.creditLimit || "500",
      monthlyInvoiceDay: parseInt(validated.monthlyInvoiceDay || "1"),
      isActive: validated.isActive ?? true,
    }).returning();
    return NextResponse.json({ success: true, account: account[0] });
  } catch (e: unknown) {
    const err = e as { name?: string; errors?: unknown[] };
    if (err.name === "ZodError") return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 });
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}

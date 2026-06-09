import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rates } from "@/lib/schema";
import { rateSchema } from "@/validations/rate";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const allRates = await db.select().from(rates);
    return NextResponse.json({ success: true, rates: allRates });
  } catch { return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const body = await request.json();
    const validated = rateSchema.parse(body);
    const rate = await db.insert(rates).values({
      routeName: validated.routeName,
      pickupLocation: validated.pickupLocation,
      dropoffLocation: validated.dropoffLocation,
      pricePounds: validated.pricePounds,
      isActive: validated.isActive ?? true,
    }).returning();
    return NextResponse.json({ success: true, rate: rate[0] });
  } catch (e: unknown) {
    const err = e as { name?: string; errors?: unknown[] };
    if (err.name === "ZodError") return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 });
    return NextResponse.json({ error: "Failed to create rate" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rates } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }
    const { searchParams } = new URL(request.url);
    const pickup = searchParams.get("pickup");
    const dropoff = searchParams.get("dropoff");

    if (pickup && dropoff) {
      const rate = await db.select().from(rates)
        .where(eq(rates.pickupLocation, pickup))
        .limit(1);
      if (rate.length === 0) {
        return NextResponse.json({ error: "Route not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, rate: rate[0] });
    }

    const allRates = await db.select().from(rates).where(eq(rates.isActive, true));
    return NextResponse.json({ success: true, rates: allRates });
  } catch (error) {
    console.error("Rates error:", error);
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminUsers, rates } from "@/lib/schema";
import { hashPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not configured. Set DATABASE_URL environment variable." }, { status: 500 });
    }

    const existingAdmin = await db.select().from(adminUsers).limit(1);
    if (existingAdmin.length === 0) {
      const passwordHash = await hashPassword("ChangeMe123!");
      await db.insert(adminUsers).values({ email: "admin@taxiservicebristol.uk.com", passwordHash, role: "admin" });
    }

    const existingRates = await db.select().from(rates).limit(1);
    if (existingRates.length === 0) {
      await db.insert(rates).values([
        { routeName: "Bristol City to Bristol Airport", pickupLocation: "Bristol City Centre", dropoffLocation: "Bristol Airport (BRS)", pricePounds: "35" },
        { routeName: "Bristol Airport to Bristol City", pickupLocation: "Bristol Airport (BRS)", dropoffLocation: "Bristol City Centre", pricePounds: "35" },
        { routeName: "Bristol to Bath", pickupLocation: "Bristol", dropoffLocation: "Bath City Centre", pricePounds: "45" },
        { routeName: "Bristol to Heathrow", pickupLocation: "Bristol", dropoffLocation: "Heathrow Airport (LHR)", pricePounds: "150" },
        { routeName: "Bristol to Gatwick", pickupLocation: "Bristol", dropoffLocation: "Gatwick Airport (LGW)", pricePounds: "180" },
        { routeName: "Bristol to Birmingham", pickupLocation: "Bristol", dropoffLocation: "Birmingham Airport (BHX)", pricePounds: "120" },
        { routeName: "Bristol to Cardiff", pickupLocation: "Bristol", dropoffLocation: "Cardiff Airport (CWL)", pricePounds: "100" },
      ]);
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database", details: String(error) }, { status: 500 });
  }
}

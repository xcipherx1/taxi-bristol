import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, contactMessages, businessAccounts } from "@/lib/schema";
import { sql, gte, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const totalBookings = await db.select({ count: sql<number>`count(*)` }).from(bookings);
    const newBookings = await db.select({ count: sql<number>`count(*)` }).from(bookings).where(eq(bookings.status, "new"));
    const completedBookings = await db.select({ count: sql<number>`count(*)` }).from(bookings).where(eq(bookings.status, "completed"));
    const recentBookings = await db.select({ count: sql<number>`count(*)` }).from(bookings).where(gte(bookings.createdAt, thirtyDaysAgo));
    const totalMessages = await db.select({ count: sql<number>`count(*)` }).from(contactMessages);
    const newMessages = await db.select({ count: sql<number>`count(*)` }).from(contactMessages).where(eq(contactMessages.status, "new"));
    const totalAccounts = await db.select({ count: sql<number>`count(*)` }).from(businessAccounts);
    const revenue = await db.select({ total: sql<string>`COALESCE(SUM(${bookings.fixedPrice}), 0)` }).from(bookings).where(eq(bookings.status, "completed"));

    return NextResponse.json({
      success: true,
      stats: {
        bookings: { total: totalBookings[0]?.count || 0, new: newBookings[0]?.count || 0, completed: completedBookings[0]?.count || 0, recent: recentBookings[0]?.count || 0 },
        messages: { total: totalMessages[0]?.count || 0, new: newMessages[0]?.count || 0 },
        businessAccounts: { total: totalAccounts[0]?.count || 0 },
        revenue: revenue[0]?.total || "0",
      },
    });
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 }); }
}

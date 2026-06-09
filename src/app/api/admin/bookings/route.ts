import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/schema";
import { desc, sql, and, like, or, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const conditions = [];
    if (status) conditions.push(eq(bookings.status, status as "new" | "contacted" | "completed" | "cancelled"));
    if (search) conditions.push(or(like(bookings.customerName, `%${search}%`), like(bookings.customerEmail, `%${search}%`), like(bookings.bookingReference, `%${search}%`)));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const allBookings = await db.select().from(bookings).where(whereClause).orderBy(desc(bookings.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(bookings).where(whereClause);

    return NextResponse.json({ success: true, bookings: allBookings, pagination: { total: countResult[0]?.count || 0, limit, offset } });
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 }); }
}

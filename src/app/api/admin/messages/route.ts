import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const query = status
      ? db.select().from(contactMessages).where(eq(contactMessages.status, status as "new" | "read" | "replied")).orderBy(desc(contactMessages.createdAt))
      : db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    const messages = await query;
    return NextResponse.json({ success: true, messages });
  } catch { return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 }); }
}

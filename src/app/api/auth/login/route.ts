import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/schema";
import { loginSchema } from "@/validations/auth";
import { comparePassword, createToken } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }
    const body = await request.json();
    const validated = loginSchema.parse(body);

    const user = await db.select().from(adminUsers)
      .where(eq(adminUsers.email, validated.email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isValid = await comparePassword(validated.password, user[0].passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await createToken({ email: user[0].email, role: user[0].role || "admin" });

    const response = NextResponse.json({
      success: true,
      user: { email: user[0].email, role: user[0].role },
    });

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch (error) {
    const err = error as { name?: string; errors?: unknown[]; message?: string };
    if (err.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 });
    }
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

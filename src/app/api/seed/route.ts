import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminUsers, rates } from "@/lib/schema";
import { hashPassword } from "@/lib/auth";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  return seedDatabase();
}

export async function POST() {
  return seedDatabase();
}

async function seedDatabase() {
  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    // Create tables if they don't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS rates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        route_name VARCHAR(255) NOT NULL,
        pickup_location VARCHAR(255) NOT NULL,
        dropoff_location VARCHAR(255) NOT NULL,
        price_pounds DECIMAL(10,2) NOT NULL,
        is_active BOOLEAN DEFAULT true
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_reference VARCHAR(10) UNIQUE NOT NULL,
        pickup_location TEXT NOT NULL,
        dropoff_location TEXT NOT NULL,
        pickup_datetime TIMESTAMP NOT NULL,
        passengers INTEGER NOT NULL,
        child_seat_required BOOLEAN DEFAULT false,
        child_seat_age INTEGER,
        pet_traveling BOOLEAN DEFAULT false,
        special_requests TEXT,
        fixed_price DECIMAL(10,2) NOT NULL,
        customer_name VARCHAR(100) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        company_name VARCHAR(255),
        is_business_account BOOLEAN DEFAULT false,
        status VARCHAR(20) DEFAULT 'new',
        vehicle_type VARCHAR(50) DEFAULT 'standard',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS business_accounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(100) NOT NULL,
        contact_email VARCHAR(255) UNIQUE NOT NULL,
        contact_phone VARCHAR(20) NOT NULL,
        credit_limit DECIMAL(10,2) DEFAULT 500,
        monthly_invoice_day INTEGER DEFAULT 1,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed admin user
    const existingAdmin = await db.select().from(adminUsers).limit(1);
    if (existingAdmin.length === 0) {
      const passwordHash = await hashPassword("ChangeMe123!");
      await db.insert(adminUsers).values({
        email: "admin@taxiservicebristol.uk.com",
        passwordHash,
        role: "admin",
      });
    }

    // Seed default rates
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

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      adminExists: existingAdmin.length > 0,
      ratesExist: existingRates.length > 0,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: error.message },
      { status: 500 }
    );
  }
}

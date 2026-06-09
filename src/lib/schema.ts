import { pgTable, uuid, varchar, text, timestamp, integer, boolean, decimal, pgEnum } from "drizzle-orm/pg-core";

export const bookingStatusEnum = pgEnum("booking_status", ["new", "contacted", "completed", "cancelled"]);
export const vehicleTypeEnum = pgEnum("vehicle_type", ["standard", "mpv", "executive", "minibus"]);
export const messageStatusEnum = pgEnum("message_status", ["new", "read", "replied"]);

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingReference: varchar("booking_reference", { length: 10 }).notNull().unique(),
  pickupLocation: text("pickup_location").notNull(),
  dropoffLocation: text("dropoff_location").notNull(),
  pickupDatetime: timestamp("pickup_datetime").notNull(),
  passengers: integer("passengers").notNull(),
  childSeatRequired: boolean("child_seat_required").default(false),
  childSeatAge: integer("child_seat_age"),
  petTraveling: boolean("pet_traveling").default(false),
  specialRequests: text("special_requests"),
  fixedPrice: decimal("fixed_price", { precision: 10, scale: 2 }).notNull(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  companyName: varchar("company_name", { length: 255 }),
  isBusinessAccount: boolean("is_business_account").default(false),
  status: bookingStatusEnum("status").default("new"),
  vehicleType: vehicleTypeEnum("vehicle_type").default("standard"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const businessAccounts = pgTable("business_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 100 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull().unique(),
  contactPhone: varchar("contact_phone", { length: 20 }).notNull(),
  creditLimit: decimal("credit_limit", { precision: 10, scale: 2 }).default("500"),
  monthlyInvoiceDay: integer("monthly_invoice_day").default(1),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rates = pgTable("rates", {
  id: uuid("id").primaryKey().defaultRandom(),
  routeName: varchar("route_name", { length: 255 }).notNull(),
  pickupLocation: varchar("pickup_location", { length: 255 }).notNull(),
  dropoffLocation: varchar("dropoff_location", { length: 255 }).notNull(),
  pricePounds: decimal("price_pounds", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 100 }).notNull(),
  message: text("message").notNull(),
  status: messageStatusEnum("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

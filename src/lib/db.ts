import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL || "";
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (databaseUrl) {
  const sql = neon(databaseUrl);
  db = drizzle(sql, { schema });
} else {
  console.warn("DATABASE_URL not set - database operations will fail");
}

export { db };

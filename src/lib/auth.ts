import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET || "fallback-secret-key-min-32-chars-long!!";
const JWT_SECRET = new TextEncoder().encode(secret);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: { email: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

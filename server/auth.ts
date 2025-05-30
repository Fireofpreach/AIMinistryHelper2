import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme-please";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: { id: number; email: string; role?: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string; role?: string };
  } catch {
    return null;
  }
}

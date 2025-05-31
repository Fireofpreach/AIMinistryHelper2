import express, { Request, Response, NextFunction } from "express";
import { prisma } from "./prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Augment Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = express.Router();

// JWT Auth helpers
const hashPassword = (pw: string) => bcrypt.hash(pw, 10);
const comparePassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);
const generateToken = (payload: { id: number; email: string; role: string }) =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });

// Dummy auth middleware (replace with real one!)
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing auth header" });
  try {
    const token = auth.replace("Bearer ", "");
    req.user = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// --- Auth routes ---
// ... (keep all your code as you posted)
export default router;

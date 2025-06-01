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

// --- Example Auth Routes ---

// Register
router.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashed, role: "user" },
    });
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    res.json({ token });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

// Login
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });
  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token });
});

// Protected route example
router.get("/api/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user.id, email: user.email, role: user.role });
});

export default router;

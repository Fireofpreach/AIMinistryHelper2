import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token." });

  const token = authHeader.replace("Bearer ", "");
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ message: "Invalid or expired token." });

  (req as any).user = user;
  next();
}

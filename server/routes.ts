import { Router, Request, Response } from "express";
import { insertUserSchema, InsertUser } from "@shared/schema";

const router = Router();

router.get("/api/test", (req: Request, res: Response) => {
  res.json({ ok: true, message: "Router is working!" });
});

// Example route using @shared/schema and types
router.post("/api/user", (req: Request, res: Response) => {
  const parseResult = insertUserSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors });
  }
  const user: InsertUser = parseResult.data;
  // ... further logic here
  res.json({ ok: true, user });
});

export default router;

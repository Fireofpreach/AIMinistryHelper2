import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import {
  insertUserSchema,
  insertEventSchema,
  insertPrayerRequestSchema,
  insertTaskSchema,
  insertSermonSchema,
  insertTeamMemberSchema,
  insertResourceSchema,
} from "@shared/schema";
import { z, type ZodError } from "zod";
import { TheologyAggregator } from "./theologyAggregator.js";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // ...all your other routes...

  // --- Theology Aggregator Route ---
  app.get("/api/theology-aggregate", async (req: Request, res: Response) => {
    try {
      const query = (req.query.q as string) || "John 3:16";
      const result = await TheologyAggregator.getAggregatedAnswer(query);
      res.json({ result });
    } catch (error) {
      res.status(500).json({ message: "Failed to aggregate theology data" });
    }
  });

  return httpServer;
}

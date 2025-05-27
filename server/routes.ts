import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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
import { TheologyAggregator } from "./theologyAggregator";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Helper for parsing ID params or query params
  function parseId(param: string): number | null {
    const id = Number(param);
    return isNaN(id) ? null : id;
  }

  // Helper for sending Zod validation errors
  function handleZodError(res: Response, error: ZodError) {
    res.status(400).json({ message: error.errors });
  }

  // Helper for password hashing
  async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // Helper for removing password from user object before sending response
  function sanitizeUser(user: any) {
    const { password, ...rest } = user;
    return rest;
  }

  // --- User Routes ---

  app.get("/api/users/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid user ID" });

    const user = await storage.getUser(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(sanitizeUser(user));
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = z
        .object({ username: z.string(), password: z.string() })
        .parse(req.body);

      const user = await storage.getUserByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      res.json(sanitizeUser(user));
    } catch (error) {
      if (error instanceof ZodError) return handleZodError(res, error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Registration & Invite share same logic: validate, hash, save user
  async function createUserHandler(req: Request, res: Response) {
    try {
      const userData = insertUserSchema.parse(req.body);
      const hashedPassword = await hashPassword(userData.password);
      const userToSave = { ...userData, password: hashedPassword };
      const user = await storage.createUser(userToSave);
      res.status(201).json(sanitizeUser(user));
    } catch (error) {
      if (error instanceof ZodError) return handleZodError(res, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  app.post("/api/users", createUserHandler);
  app.post("/api/users/invite", createUserHandler);

  // --- Event Routes ---
  app.get("/api/events", async (req, res) => {
    const userId = parseId(req.query.userId as string);
    if (userId === null) return res.status(400).json({ message: "Invalid user ID" });
    const events = await storage.getEvents(userId);
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid event ID" });
    const event = await storage.getEvent(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof ZodError) return handleZodError(res, error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/events/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid event ID" });
    try {
      const eventData = insertEventSchema.partial().parse(req.body);
      const updatedEvent = await storage.updateEvent(id, eventData);
      if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
      res.json(updatedEvent);
    } catch (error) {
      if (error instanceof ZodError) return handleZodError(res, error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid event ID" });
    const deleted = await storage.deleteEvent(id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  });

  // --- Prayer Request Routes ---
  app.get("/api/prayer-requests", async (req, res) => {
    const userId = parseId(req.query.userId as string);
    if (userId === null) return res.status(400).json({ message: "Invalid user ID" });
    const requests = await storage.getPrayerRequests(userId);
    res.json(requests);
  });

  app.get("/api/prayer-requests/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid prayer request ID" });
    const request = await storage.getPrayerRequest(id);
    if (!request) return res.status(404).json({ message: "Prayer request not found" });
    res.json(request);
  });

  app.post("/api/prayer-requests", async (req, res) => {
    try {
      const prayerRequestData = insertPrayerRequestSchema.parse(req.body);
      const prayerRequest = await storage.createPrayerRequest(prayerRequestData);
      res.status(201).json(prayerRequest);
    } catch (error) {
      if (error instanceof ZodError) return handleZodError(res, error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/prayer-requests/:id/pray", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid prayer request ID" });
    const updated = await storage.incrementPrayerCount(id);
    if (!updated) return res.status(404).json({ message: "Prayer request not found" });
    res.json(updated);
  });

  app.delete("/api/prayer-requests/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid prayer request ID" });
    const deleted = await storage.deletePrayerRequest(id);
    if (!deleted) return res.status(404).json({ message: "Prayer request not found" });
    res.json({ message: "Prayer request deleted successfully" });
  });

  // --- Task Routes ---
  app.get("/api/tasks", async (req, res) => {
    const userId = parseId(req.query.userId as string);
    if (userId === null) return res.status(400).json({ message: "Invalid user ID" });
    const tasks = await storage.getTasks(userId);
    res.json(tasks);
  });

  app.get("/api/tasks/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid task ID" });
    const task = await storage.getTask(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof ZodError) return handleZodError(res, error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/tasks/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid task ID" });
    try {
      const taskData = insertTaskSchema.partial().parse(req.body);
      const updatedTask = await storage.updateTask(id, taskData);
      if (!updatedTask) return res.status(404).json({ message: "Task not found" });
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof ZodError) return handleZodError(res, error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: "Invalid task ID" });
    const deleted = await storage.deleteTask(id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully"


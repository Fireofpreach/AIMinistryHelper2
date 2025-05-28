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
import { z } from "zod";
import { TheologyAggregator } from "./theologyAggregator.js";
import bcrypt from "bcryptjs";

// Helper: sends 404 if not found
function notFound(res: Response, resource: string) {
  res.status(404).json({ message: `${resource} not found` });
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  //
  // --- Prayer Requests ---
  //
  app.get("/api/prayer-requests", async (_req, res) => {
    try {
      const data = await storage.getPrayerRequests();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch prayer requests" });
    }
  });
  app.get("/api/prayer-requests/:id", async (req, res) => {
    try {
      const data = await storage.getPrayerRequest(req.params.id);
      if (!data) return notFound(res, "Prayer request");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch prayer request" });
    }
  });
  app.post("/api/prayer-requests", async (req, res) => {
    try {
      const input = insertPrayerRequestSchema.parse(req.body);
      const result = await storage.addPrayerRequest(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add prayer request" });
    }
  });
  app.put("/api/prayer-requests/:id", async (req, res) => {
    try {
      const input = insertPrayerRequestSchema.parse(req.body);
      const result = await storage.updatePrayerRequest(req.params.id, input);
      if (!result) return notFound(res, "Prayer request");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update prayer request" });
    }
  });
  app.delete("/api/prayer-requests/:id", async (req, res) => {
    try {
      const result = await storage.deletePrayerRequest(req.params.id);
      if (!result) return notFound(res, "Prayer request");
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete prayer request" });
    }
  });

  //
  // --- Events ---
  //
  app.get("/api/events", async (_req, res) => {
    try {
      const data = await storage.getEvents();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app.get("/api/events/:id", async (req, res) => {
    try {
      const data = await storage.getEvent(req.params.id);
      if (!data) return notFound(res, "Event");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  app.post("/api/events", async (req, res) => {
    try {
      const input = insertEventSchema.parse(req.body);
      const result = await storage.addEvent(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add event" });
    }
  });
  app.put("/api/events/:id", async (req, res) => {
    try {
      const input = insertEventSchema.parse(req.body);
      const result = await storage.updateEvent(req.params.id, input);
      if (!result) return notFound(res, "Event");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update event" });
    }
  });
  app.delete("/api/events/:id", async (req, res) => {
    try {
      const result = await storage.deleteEvent(req.params.id);
      if (!result) return notFound(res, "Event");
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  //
  // --- Sermons ---
  //
  app.get("/api/sermons", async (_req, res) => {
    try {
      const data = await storage.getSermons();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch sermons" });
    }
  });
  app.get("/api/sermons/:id", async (req, res) => {
    try {
      const data = await storage.getSermon(req.params.id);
      if (!data) return notFound(res, "Sermon");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch sermon" });
    }
  });
  app.post("/api/sermons", async (req, res) => {
    try {
      const input = insertSermonSchema.parse(req.body);
      const result = await storage.addSermon(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add sermon" });
    }
  });
  app.put("/api/sermons/:id", async (req, res) => {
    try {
      const input = insertSermonSchema.parse(req.body);
      const result = await storage.updateSermon(req.params.id, input);
      if (!result) return notFound(res, "Sermon");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update sermon" });
    }
  });
  app.delete("/api/sermons/:id", async (req, res) => {
    try {
      const result = await storage.deleteSermon(req.params.id);
      if (!result) return notFound(res, "Sermon");
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete sermon" });
    }
  });

  //
  // --- Team Members ---
  //
  app.get("/api/team-members", async (_req, res) => {
    try {
      const data = await storage.getTeamMembers();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });
  app.get("/api/team-members/:id", async (req, res) => {
    try {
      const data = await storage.getTeamMember(req.params.id);
      if (!data) return notFound(res, "Team member");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch team member" });
    }
  });
  app.post("/api/team-members", async (req, res) => {
    try {
      const input = insertTeamMemberSchema.parse(req.body);
      const result = await storage.addTeamMember(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add team member" });
    }
  });
  app.put("/api/team-members/:id", async (req, res) => {
    try {
      const input = insertTeamMemberSchema.parse(req.body);
      const result = await storage.updateTeamMember(req.params.id, input);
      if (!result) return notFound(res, "Team member");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update team member" });
    }
  });
  app.delete("/api/team-members/:id", async (req, res) => {
    try {
      const result = await storage.deleteTeamMember(req.params.id);
      if (!result) return notFound(res, "Team member");
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });

  //
  // --- Tasks ---
  //
  app.get("/api/tasks", async (_req, res) => {
    try {
      const data = await storage.getTasks();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });
  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const data = await storage.getTask(req.params.id);
      if (!data) return notFound(res, "Task");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch task" });
    }
  });
  app.post("/api/tasks", async (req, res) => {
    try {
      const input = insertTaskSchema.parse(req.body);
      const result = await storage.addTask(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add task" });
    }
  });
  app.put("/api/tasks/:id", async (req, res) => {
    try {
      const input = insertTaskSchema.parse(req.body);
      const result = await storage.updateTask(req.params.id, input);
      if (!result) return notFound(res, "Task");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update task" });
    }
  });
  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const result = await storage.deleteTask(req.params.id);
      if (!result) return notFound(res, "Task");
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  //
  // --- Resources ---
  //
  app.get("/api/resources", async (_req, res) => {
    try {
      const data = await storage.getResources();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  app.get("/api/resources/:id", async (req, res) => {
    try {
      const data = await storage.getResource(req.params.id);
      if (!data) return notFound(res, "Resource");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });
  app.post("/api/resources", async (req, res) => {
    try {
      const input = insertResourceSchema.parse(req.body);
      const result = await storage.addResource(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add resource" });
    }
  });
  app.put("/api/resources/:id", async (req, res) => {
    try {
      const input = insertResourceSchema.parse(req.body);
      const result = await storage.updateResource(req.params.id, input);
      if (!result) return notFound(res, "Resource");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update resource" });
    }
  });
  app.delete("/api/resources/:id", async (req, res) => {
    try {
      const result = await storage.deleteResource(req.params.id);
      if (!result) return notFound(res, "Resource");
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete resource" });
    }
  });

  //
  // --- Theology Aggregator Route ---
  //
  app.get("/api/theology-aggregate", async (req, res) => {
    try {
      const query = (req.query.q as string) || "John 3:16";
      const result = await TheologyAggregator.getAggregatedAnswer(query);
      res.json({ result });
    } catch {
      res.status(500).json({ message: "Failed to aggregate theology data" });
    }
  });

  return httpServer;
}

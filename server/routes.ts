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
import { DoctrineComparer } from "./doctrineComparer.js";
import { ApologeticsResponder } from "./apologeticsResponder.js";
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
      const data = storage.getAllPrayerRequests();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch prayer requests" });
    }
  });
  app.get("/api/prayer-requests/:id", async (req, res) => {
    try {
      const data = storage.getPrayerRequestById(Number(req.params.id));
      if (!data) return notFound(res, "Prayer request");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch prayer request" });
    }
  });
  app.post("/api/prayer-requests", async (req, res) => {
    try {
      const input = insertPrayerRequestSchema.parse(req.body);
      const result = storage.createPrayerRequest(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add prayer request" });
    }
  });
  app.put("/api/prayer-requests/:id", async (req, res) => {
    try {
      const input = insertPrayerRequestSchema.parse(req.body);
      const result = storage.updatePrayerRequest(Number(req.params.id), input);
      if (!result) return notFound(res, "Prayer request");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update prayer request" });
    }
  });
  app.delete("/api/prayer-requests/:id", async (req, res) => {
    try {
      const result = storage.deletePrayerRequest(Number(req.params.id));
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
      const data = storage.getAllEvents();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app.get("/api/events/:id", async (req, res) => {
    try {
      const data = storage.getEventById(Number(req.params.id));
      if (!data) return notFound(res, "Event");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  app.post("/api/events", async (req, res) => {
    try {
      const input = insertEventSchema.parse(req.body);
      const result = storage.createEvent(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add event" });
    }
  });
  app.put("/api/events/:id", async (req, res) => {
    try {
      const input = insertEventSchema.parse(req.body);
      const result = storage.updateEvent(Number(req.params.id), input);
      if (!result) return notFound(res, "Event");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update event" });
    }
  });
  app.delete("/api/events/:id", async (req, res) => {
    try {
      const result = storage.deleteEvent(Number(req.params.id));
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
      const data = storage.getAllSermons();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch sermons" });
    }
  });
  app.get("/api/sermons/:id", async (req, res) => {
    try {
      const data = storage.getSermonById(Number(req.params.id));
      if (!data) return notFound(res, "Sermon");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch sermon" });
    }
  });
  app.post("/api/sermons", async (req, res) => {
    try {
      const input = insertSermonSchema.parse(req.body);
      const result = storage.createSermon(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add sermon" });
    }
  });
  app.put("/api/sermons/:id", async (req, res) => {
    try {
      const input = insertSermonSchema.parse(req.body);
      const result = storage.updateSermon(Number(req.params.id), input);
      if (!result) return notFound(res, "Sermon");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update sermon" });
    }
  });
  app.delete("/api/sermons/:id", async (req, res) => {
    try {
      const result = storage.deleteSermon(Number(req.params.id));
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
      const data = storage.getAllTeamMembers();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });
  app.get("/api/team-members/:id", async (req, res) => {
    try {
      const data = storage.getTeamMemberById(Number(req.params.id));
      if (!data) return notFound(res, "Team member");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch team member" });
    }
  });
  app.post("/api/team-members", async (req, res) => {
    try {
      const input = insertTeamMemberSchema.parse(req.body);
      const result = storage.createTeamMember(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add team member" });
    }
  });
  app.put("/api/team-members/:id", async (req, res) => {
    try {
      const input = insertTeamMemberSchema.parse(req.body);
      const result = storage.updateTeamMember(Number(req.params.id), input);
      if (!result) return notFound(res, "Team member");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update team member" });
    }
  });
  app.delete("/api/team-members/:id", async (req, res) => {
    try {
      const result = storage.deleteTeamMember(Number(req.params.id));
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
      const data = storage.getAllTasks();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });
  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const data = storage.getTaskById(Number(req.params.id));
      if (!data) return notFound(res, "Task");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch task" });
    }
  });
  app.post("/api/tasks", async (req, res) => {
    try {
      const input = insertTaskSchema.parse(req.body);
      const result = storage.createTask(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add task" });
    }
  });
  app.put("/api/tasks/:id", async (req, res) => {
    try {
      const input = insertTaskSchema.parse(req.body);
      const result = storage.updateTask(Number(req.params.id), input);
      if (!result) return notFound(res, "Task");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update task" });
    }
  });
  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const result = storage.deleteTask(Number(req.params.id));
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
      const data = storage.getAllResources();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  app.get("/api/resources/:id", async (req, res) => {
    try {
      const data = storage.getResourceById(Number(req.params.id));
      if (!data) return notFound(res, "Resource");
      res.json(data);
    } catch {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });
  app.post("/api/resources", async (req, res) => {
    try {
      const input = insertResourceSchema.parse(req.body);
      const result = storage.createResource(input);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to add resource" });
    }
  });
  app.put("/api/resources/:id", async (req, res) => {
    try {
      const input = insertResourceSchema.parse(req.body);
      const result = storage.updateResource(Number(req.params.id), input);
      if (!result) return notFound(res, "Resource");
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) res.status(400).json({ message: error.errors });
      else res.status(500).json({ message: "Failed to update resource" });
    }
  });
  app.delete("/api/resources/:id", async (req, res) => {
    try {
      const result = storage.deleteResource(Number(req.params.id));
      if (!result) return notFound(res, "Resource");
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete resource" });
    }
  });

  //
  // --- Doctrine Comparison Endpoint ---
  //
  app.get("/api/compare-doctrines", async (req, res) => {
    try {
      const { doctrine1, doctrine2 } = req.query;
      if (!doctrine1 || !doctrine2) {
        return res.status(400).json({ message: "Please provide two doctrines to compare." });
      }
      const result = await DoctrineComparer.compare(doctrine1 as string, doctrine2 as string);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to compare doctrines." });
    }
  });

  //
  // --- Interactive Apologetics Q&A Endpoint ---
  //
  app.post("/api/apologetics", async (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ message: "No question provided." });
      }
      const answer = await ApologeticsResponder.getAnswer(question);
      res.json({ answer });
    } catch (error) {
      res.status(500).json({ message: "Failed to get apologetics answer." });
    }
  });

  //
  // --- Theology Aggregator Route ---
  //
  app.get("/api/theology-aggregate", async (req: Request, res: Response) => {
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

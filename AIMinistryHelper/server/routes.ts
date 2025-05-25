import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertEventSchema, insertPrayerRequestSchema, 
         insertTaskSchema, insertSermonSchema, insertTeamMemberSchema, 
         insertResourceSchema } from "@shared/schema";
import { z } from "zod";
import { TheologyAggregator } from "./theologyAggregator";
import bcrypt from "bcryptjs"; // <--- bcryptjs for password hashing

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // LOGIN: uses bcryptjs for secure password check
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = z.object({
        username: z.string(),
        password: z.string()
      }).parse(req.body);

      const user = await storage.getUserByUsername(username);
      // Use bcryptjs.compare for password check
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // REGISTER: hashes password before saving
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      // Hash the password before saving:
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const userToSave = { ...userData, password: hashedPassword };
      const user = await storage.createUser(userToSave);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // INVITE: hashes password before saving (NEW ENDPOINT)
  app.post("/api/users/invite", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      // Hash the password before saving:
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const userToSave = { ...userData, password: hashedPassword };
      const user = await storage.createUser(userToSave);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // --- the rest of your routes are unchanged below ---

  // Event routes
  app.get("/api/events", async (req, res) => {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const events = await storage.getEvents(userId);
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const event = await storage.getEvent(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    try {
      const eventData = insertEventSchema.partial().parse(req.body);
      const updatedEvent = await storage.updateEvent(id, eventData);
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(updatedEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const deleted = await storage.deleteEvent(id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  });

  // Prayer Request routes
  app.get("/api/prayer-requests", async (req, res) => {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const prayerRequests = await storage.getPrayerRequests(userId);
    res.json(prayerRequests);
  });

  app.get("/api/prayer-requests/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid prayer request ID" });
    }
    const prayerRequest = await storage.getPrayerRequest(id);
    if (!prayerRequest) {
      return res.status(404).json({ message: "Prayer request not found" });
    }
    res.json(prayerRequest);
  });

  app.post("/api/prayer-requests", async (req, res) => {
    try {
      const prayerRequestData = insertPrayerRequestSchema.parse(req.body);
      const prayerRequest = await storage.createPrayerRequest(prayerRequestData);
      res.status(201).json(prayerRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/prayer-requests/:id/pray", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid prayer request ID" });
    }
    const updatedPrayerRequest = await storage.incrementPrayerCount(id);
    if (!updatedPrayerRequest) {
      return res.status(404).json({ message: "Prayer request not found" });
    }
    res.json(updatedPrayerRequest);
  });

  app.delete("/api/prayer-requests/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid prayer request ID" });
    }
    const deleted = await storage.deletePrayerRequest(id);
    if (!deleted) {
      return res.status(404).json({ message: "Prayer request not found" });
    }
    res.json({ message: "Prayer request deleted successfully" });
  });

  // Task routes
  app.get("/api/tasks", async (req, res) => {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const tasks = await storage.getTasks(userId);
    res.json(tasks);
  });

  app.get("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await storage.getTask(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    try {
      const taskData = insertTaskSchema.partial().parse(req.body);
      const updatedTask = await storage.updateTask(id, taskData);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const deleted = await storage.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  });

  // Sermon routes
  app.get("/api/sermons", async (req, res) => {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const sermons = await storage.getSermons(userId);
    res.json(sermons);
  });

  app.get("/api/sermons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid sermon ID" });
    }
    const sermon = await storage.getSermon(id);
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    res.json(sermon);
  });

  app.post("/api/sermons", async (req, res) => {
    try {
      const sermonData = insertSermonSchema.parse(req.body);
      const sermon = await storage.createSermon(sermonData);
      res.status(201).json(sermon);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/sermons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid sermon ID" });
    }
    try {
      const sermonData = insertSermonSchema.partial().parse(req.body);
      const updatedSermon = await storage.updateSermon(id, sermonData);
      if (!updatedSermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }
      res.json(updatedSermon);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/sermons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid sermon ID" });
    }
    const deleted = await storage.deleteSermon(id);
    if (!deleted) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    res.json({ message: "Sermon deleted successfully" });
  });

  // Team Member routes
  app.get("/api/team-members", async (req, res) => {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const teamMembers = await storage.getTeamMembers(userId);
    res.json(teamMembers);
  });

  app.get("/api/team-members/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid team member ID" });
    }
    const teamMember = await storage.getTeamMember(id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json(teamMember);
  });

  app.post("/api/team-members", async (req, res) => {
    try {
      const teamMemberData = insertTeamMemberSchema.parse(req.body);
      const teamMember = await storage.createTeamMember(teamMemberData);
      res.status(201).json(teamMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/team-members/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid team member ID" });
    }
    try {
      const teamMemberData = insertTeamMemberSchema.partial().parse(req.body);
      const updatedTeamMember = await storage.updateTeamMember(id, teamMemberData);
      if (!updatedTeamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }
      res.json(updatedTeamMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/team-members/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid team member ID" });
    }
    const deleted = await storage.deleteTeamMember(id);
    if (!deleted) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json({ message: "Team member deleted successfully" });
  });

  // Resource routes
  app.get("/api/resources", async (req, res) => {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const resources = await storage.getResources(userId);
    res.json(resources);
  });

  app.get("/api/resources/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid resource ID" });
    }
    const resource = await storage.getResource(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const resourceData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/resources/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid resource ID" });
    }
    try {
      const resourceData = insertResourceSchema.partial().parse(req.body);
      const updatedResource = await storage.updateResource(id, resourceData);
      if (!updatedResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(updatedResource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/resources/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid resource ID" });
    }
    const deleted = await storage.deleteResource(id);
    if (!deleted) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json({ message: "Resource deleted successfully" });
  });

  // AI Sermon assistant route
  app.post("/api/sermon-assistant", async (req, res) => {
    try {
      const { topic, scripture } = z.object({
        topic: z.string().optional(),
        scripture: z.string().optional()
      }).parse(req.body);

      // In a real implementation, this would call the OpenAI API
      // For now, we'll return a mock response
      const sermonIdeas = [
        {
          title: `Finding God's Purpose in ${topic || scripture || "Difficult Times"}`,
          scripture: scripture || "Romans 8:28",
          outline: [
            "Introduction: The challenge of finding purpose",
            "God's sovereignty in all circumstances",
            "Practical steps to discern God's purpose",
            "Conclusion: Embracing God's plan"
          ]
        },
        {
          title: `The Power of Faith: ${topic || scripture || "Believing When You Cannot See"}`,
          scripture: scripture || "Hebrews 11:1",
          outline: [
            "Introduction: The nature of faith",
            "Biblical examples of faith in action",
            "Overcoming doubt with faith",
            "Conclusion: Living by faith daily"
          ]
        },
        {
          title: `Community in Christ: ${topic || scripture || "Together in Unity"}`,
          scripture: scripture || "Ephesians 4:1-6",
          outline: [
            "Introduction: God's design for community",
            "The importance of unity in diversity",
            "Practical ways to build community",
            "Conclusion: The witness of a unified church"
          ]
        }
      ];

      res.json({ sermonIdeas });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // APOLOGETICS AGGREGATOR ROUTE
  app.post("/api/apologetics", async (req, res) => {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }
    try {
      const results = await TheologyAggregator.getAggregatedAnswer(question);
      res.json({ answer: results.filter(Boolean).join('\n\n---\n\n') });
    } catch {
      res.status(500).json({ message: "Error generating answer." });
    }
  });

  app.get("/api/debug-apologetics", async (req, res) => {
    const question = req.query.question as string;
    try {
      const results = await TheologyAggregator.getAggregatedAnswer(question || "John 3:16");
      res.json({ results });
    } catch (err) {
      res.status(500).json({ error: "Aggregator failed", details: (err as Error).message });
    }
  });
         
  return httpServer;
}

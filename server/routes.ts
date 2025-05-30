import express from "express";
import { prisma } from "./prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// JWT Auth helpers
const hashPassword = (pw: string) => bcrypt.hash(pw, 10);
const comparePassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);
const generateToken = (payload: { id: number; email: string; role: string }) =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });

// Dummy auth middleware (replace with real one!)
function requireAuth(req, res, next) {
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
router.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return res.status(409).json({ message: "Email already exists." });

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed, role: "member" },
    select: { id: true, email: true, role: true }
  });

  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user });
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials." });

  const match = await comparePassword(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials." });

  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

// --- PrayerRequests CRUD ---
router.get("/api/prayer-requests", requireAuth, async (req, res) => {
  const data = await prisma.prayerRequest.findMany({ where: { userId: req.user.id } });
  res.json(data);
});
router.post("/api/prayer-requests", requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const prayer = await prisma.prayerRequest.create({
    data: { title, content, userId: req.user.id }
  });
  res.json(prayer);
});
router.put("/api/prayer-requests/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const prayer = await prisma.prayerRequest.updateMany({
    where: { id: Number(id), userId: req.user.id },
    data: { title, content }
  });
  res.json(prayer);
});
router.delete("/api/prayer-requests/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.prayerRequest.deleteMany({ where: { id: Number(id), userId: req.user.id } });
  res.json({ message: "Deleted" });
});

// --- Events CRUD ---
router.get("/api/events", requireAuth, async (req, res) => {
  const data = await prisma.event.findMany({ where: { userId: req.user.id } });
  res.json(data);
});
router.post("/api/events", requireAuth, async (req, res) => {
  const { title, date, location, details } = req.body;
  const event = await prisma.event.create({
    data: { title, date: new Date(date), location, details, userId: req.user.id }
  });
  res.json(event);
});
router.put("/api/events/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, date, location, details } = req.body;
  const event = await prisma.event.updateMany({
    where: { id: Number(id), userId: req.user.id },
    data: { title, date: new Date(date), location, details }
  });
  res.json(event);
});
router.delete("/api/events/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.event.deleteMany({ where: { id: Number(id), userId: req.user.id } });
  res.json({ message: "Deleted" });
});

// --- Sermons CRUD ---
router.get("/api/sermons", requireAuth, async (req, res) => {
  const data = await prisma.sermon.findMany({ where: { userId: req.user.id } });
  res.json(data);
});
router.post("/api/sermons", requireAuth, async (req, res) => {
  const { title, date, scripture, outline } = req.body;
  const sermon = await prisma.sermon.create({
    data: { title, date: new Date(date), scripture, outline, userId: req.user.id }
  });
  res.json(sermon);
});
router.put("/api/sermons/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, date, scripture, outline } = req.body;
  const sermon = await prisma.sermon.updateMany({
    where: { id: Number(id), userId: req.user.id },
    data: { title, date: new Date(date), scripture, outline }
  });
  res.json(sermon);
});
router.delete("/api/sermons/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.sermon.deleteMany({ where: { id: Number(id), userId: req.user.id } });
  res.json({ message: "Deleted" });
});

// --- Resources CRUD ---
router.get("/api/resources", requireAuth, async (req, res) => {
  const data = await prisma.resource.findMany({ where: { userId: req.user.id } });
  res.json(data);
});
router.post("/api/resources", requireAuth, async (req, res) => {
  const { title, description, type, url } = req.body;
  const resource = await prisma.resource.create({
    data: { title, description, type, url, userId: req.user.id }
  });
  res.json(resource);
});
router.put("/api/resources/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, type, url } = req.body;
  const resource = await prisma.resource.updateMany({
    where: { id: Number(id), userId: req.user.id },
    data: { title, description, type, url }
  });
  res.json(resource);
});
router.delete("/api/resources/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.resource.deleteMany({ where: { id: Number(id), userId: req.user.id } });
  res.json({ message: "Deleted" });
});

// --- TeamMembers CRUD ---
router.get("/api/team-members", requireAuth, async (req, res) => {
  const data = await prisma.teamMember.findMany({ where: { userId: req.user.id } });
  res.json(data);
});
router.post("/api/team-members", requireAuth, async (req, res) => {
  const { name, position, image } = req.body;
  const member = await prisma.teamMember.create({
    data: { name, position, image, userId: req.user.id }
  });
  res.json(member);
});
router.put("/api/team-members/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, position, image } = req.body;
  const member = await prisma.teamMember.updateMany({
    where: { id: Number(id), userId: req.user.id },
    data: { name, position, image }
  });
  res.json(member);
});
router.delete("/api/team-members/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.teamMember.deleteMany({ where: { id: Number(id), userId: req.user.id } });
  res.json({ message: "Deleted" });
});

// --- Tasks CRUD ---
router.get("/api/tasks", requireAuth, async (req, res) => {
  const data = await prisma.task.findMany({ where: { userId: req.user.id } });
  res.json(data);
});
router.post("/api/tasks", requireAuth, async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;
  const task = await prisma.task.create({
    data: { title, description, dueDate: dueDate ? new Date(dueDate) : null, priority, completed: !!completed, userId: req.user.id }
  });
  res.json(task);
});
router.put("/api/tasks/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, completed } = req.body;
  const task = await prisma.task.updateMany({
    where: { id: Number(id), userId: req.user.id },
    data: { title, description, dueDate: dueDate ? new Date(dueDate) : null, priority, completed: !!completed }
  });
  res.json(task);
});
router.delete("/api/tasks/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.task.deleteMany({ where: { id: Number(id), userId: req.user.id } });
  res.json({ message: "Deleted" });
});

export default router;

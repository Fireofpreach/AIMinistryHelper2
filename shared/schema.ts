import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  church: text("church"),
  profileImage: text("profile_image"),
  isAdmin: boolean("is_admin").default(false),
  isActive: boolean("is_active").default(true),
  invitedBy: integer("invited_by"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  church: true,
  profileImage: true,
  isAdmin: true,
  isActive: true,
  invitedBy: true,
});

// Events Schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  category: text("category"),
  userId: integer("user_id").notNull(),
  participants: text("participants").array(),
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  location: true,
  startTime: true,
  endTime: true,
  category: true,
  userId: true,
  participants: true,
});

// Prayer Requests Schema
export const prayerRequests = pgTable("prayer_requests", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  submittedBy: text("submitted_by").notNull(),
  submittedAt: timestamp("submitted_at").notNull(),
  prayerCount: integer("prayer_count").default(0),
  userId: integer("user_id").notNull(),
});

export const insertPrayerRequestSchema = createInsertSchema(prayerRequests).pick({
  content: true,
  submittedBy: true,
  submittedAt: true,
  userId: true,
});

// Tasks Schema
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  priority: text("priority"),
  completed: boolean("completed").default(false),
  userId: integer("user_id").notNull(),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  description: true,
  dueDate: true,
  priority: true,
  completed: true,
  userId: true,
});

// Sermons Schema
export const sermons = pgTable("sermons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  scripture: text("scripture"),
  content: text("content"),
  outline: jsonb("outline"),
  date: timestamp("date"),
  userId: integer("user_id").notNull(),
});

export const insertSermonSchema = createInsertSchema(sermons).pick({
  title: true,
  scripture: true,
  content: true,
  outline: true,
  date: true,
  userId: true,
});

// Team Members Schema
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position"),
  image: text("image"),
  userId: integer("user_id").notNull(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).pick({
  name: true,
  position: true,
  image: true,
  userId: true,
});

// Resources Schema
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type"),
  url: text("url"),
  userId: integer("user_id").notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  type: true,
  url: true,
  userId: true,
});

// Export Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type PrayerRequest = typeof prayerRequests.$inferSelect;
export type InsertPrayerRequest = z.infer<typeof insertPrayerRequestSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Sermon = typeof sermons.$inferSelect;
export type InsertSermon = z.infer<typeof insertSermonSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertResourceSchema = exports.resources = exports.insertTeamMemberSchema = exports.teamMembers = exports.insertSermonSchema = exports.sermons = exports.insertTaskSchema = exports.tasks = exports.insertPrayerRequestSchema = exports.prayerRequests = exports.insertEventSchema = exports.events = exports.insertUserSchema = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
// User Schema
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    church: (0, pg_core_1.text)("church"),
    profileImage: (0, pg_core_1.text)("profile_image"),
    isAdmin: (0, pg_core_1.boolean)("is_admin").default(false),
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    invitedBy: (0, pg_core_1.integer)("invited_by"),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
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
exports.events = (0, pg_core_1.pgTable)("events", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    location: (0, pg_core_1.text)("location"),
    startTime: (0, pg_core_1.timestamp)("start_time").notNull(),
    endTime: (0, pg_core_1.timestamp)("end_time"),
    category: (0, pg_core_1.text)("category"),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    participants: (0, pg_core_1.text)("participants").array(),
});
exports.insertEventSchema = (0, drizzle_zod_1.createInsertSchema)(exports.events).pick({
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
exports.prayerRequests = (0, pg_core_1.pgTable)("prayer_requests", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    content: (0, pg_core_1.text)("content").notNull(),
    submittedBy: (0, pg_core_1.text)("submitted_by").notNull(),
    submittedAt: (0, pg_core_1.timestamp)("submitted_at").notNull(),
    prayerCount: (0, pg_core_1.integer)("prayer_count").default(0),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
});
exports.insertPrayerRequestSchema = (0, drizzle_zod_1.createInsertSchema)(exports.prayerRequests).pick({
    content: true,
    submittedBy: true,
    submittedAt: true,
    userId: true,
});
// Tasks Schema
exports.tasks = (0, pg_core_1.pgTable)("tasks", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    dueDate: (0, pg_core_1.timestamp)("due_date"),
    priority: (0, pg_core_1.text)("priority"),
    completed: (0, pg_core_1.boolean)("completed").default(false),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
});
exports.insertTaskSchema = (0, drizzle_zod_1.createInsertSchema)(exports.tasks).pick({
    title: true,
    description: true,
    dueDate: true,
    priority: true,
    completed: true,
    userId: true,
});
// Sermons Schema
exports.sermons = (0, pg_core_1.pgTable)("sermons", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    scripture: (0, pg_core_1.text)("scripture"),
    content: (0, pg_core_1.text)("content"),
    outline: (0, pg_core_1.jsonb)("outline"),
    date: (0, pg_core_1.timestamp)("date"),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
});
exports.insertSermonSchema = (0, drizzle_zod_1.createInsertSchema)(exports.sermons).pick({
    title: true,
    scripture: true,
    content: true,
    outline: true,
    date: true,
    userId: true,
});
// Team Members Schema
exports.teamMembers = (0, pg_core_1.pgTable)("team_members", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    position: (0, pg_core_1.text)("position"),
    image: (0, pg_core_1.text)("image"),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
});
exports.insertTeamMemberSchema = (0, drizzle_zod_1.createInsertSchema)(exports.teamMembers).pick({
    name: true,
    position: true,
    image: true,
    userId: true,
});
// Resources Schema
exports.resources = (0, pg_core_1.pgTable)("resources", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    type: (0, pg_core_1.text)("type"),
    url: (0, pg_core_1.text)("url"),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
});
exports.insertResourceSchema = (0, drizzle_zod_1.createInsertSchema)(exports.resources).pick({
    title: true,
    description: true,
    type: true,
    url: true,
    userId: true,
});

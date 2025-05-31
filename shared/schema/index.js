import { z } from "zod";
// User schema
export const insertUserSchema = z.object({
    password: z.string(),
    username: z.string(),
    name: z.string(),
    church: z.string().nullable().optional(),
    profileImage: z.string().nullable().optional(),
    isAdmin: z.boolean().optional(),
    isActive: z.boolean().optional(),
    invitedBy: z.string().optional(),
});
// Event schema
export const insertEventSchema = z.object({
    userId: z.number().int(),
    title: z.string(),
    description: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    startTime: z.date(),
    endTime: z.date().optional(),
    category: z.string().optional(),
    participants: z.array(z.string()).optional(),
});
// Prayer Request schema
export const insertPrayerRequestSchema = z.object({
    userId: z.number().int(),
    content: z.string(),
    submittedBy: z.string(),
    submittedAt: z.date(),
});
// Task schema
export const insertTaskSchema = z.object({
    userId: z.number().int(),
    title: z.string(),
    description: z.string().nullable().optional(),
    dueDate: z.date().nullable().optional(),
    priority: z.string().optional(),
    completed: z.boolean().optional(),
});
// Sermon schema
export const insertSermonSchema = z.object({
    userId: z.number().int(),
    date: z.date().nullable().optional(),
    title: z.string(),
    content: z.string().nullable().optional(),
    scripture: z.string().optional(),
    outline: z.string().optional(),
});
// Team Member schema
export const insertTeamMemberSchema = z.object({
    userId: z.number().int(),
    name: z.string(),
    position: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
});
// Resource schema
export const insertResourceSchema = z.object({
    type: z.string().nullable().optional(),
    userId: z.number().int(),
    url: z.string().nullable().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
});

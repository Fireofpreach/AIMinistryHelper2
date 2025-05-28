// Example file template for Zod schemas, adjust your types as needed
import { z } from "zod";

// Example user schema
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

// Example event schema
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

// Continue for insertPrayerRequestSchema, insertTaskSchema, insertSermonSchema, insertTeamMemberSchema, insertResourceSchema

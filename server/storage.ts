import {
  type User, type InsertUser,
  type Event, type InsertEvent,
  type PrayerRequest, type InsertPrayerRequest,
  type Task, type InsertTask,
  type Sermon, type InsertSermon,
  type TeamMember, type InsertTeamMember,
  type Resource, type InsertResource
} from "@shared/schema";

// ...rest of your IStorage and MemStorage class...

// When creating a sermon with an outline, string-ify any object:
this.createSermon({
  title: "Finding Peace in Uncertain Times",
  scripture: "Matthew 11:28-30",
  content: "Come to me, all you who are weary and burdened, and I will give you rest...",
  outline: JSON.stringify({
    introduction: "The challenge of finding peace in today's world",
    points: [
      "The source of true peace",
      "Practical steps to experiencing God's peace",
      "Sharing peace with others"
    ],
    conclusion: "Living in God's peace daily"
  }),
  date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  userId: 1
});

// When setting fields that can be undefined, use ?? undefined (not null):
const user: User = {
  ...insertUser,
  id,
  isAdmin: insertUser.isAdmin || false,
  isActive: insertUser.isActive !== false,
  invitedBy: insertUser.invitedBy ?? undefined,
  church: insertUser.church ?? undefined,
  profileImage: insertUser.profileImage ?? undefined
};

// Similarly, update other entity creation code to avoid assigning null where only undefined is allowed.

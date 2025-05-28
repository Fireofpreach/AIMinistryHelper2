import {
  type User, type InsertUser,
  type Event, type InsertEvent,
  type PrayerRequest, type InsertPrayerRequest,
  type Task, type InsertTask,
  type Sermon, type InsertSermon,
  type TeamMember, type InsertTeamMember,
  type Resource, type InsertResource
} from "@shared/schema";

// Example in-memory storage implementation
class MemStorage {
  private users: User[] = [];
  private events: Event[] = [];
  private prayerRequests: PrayerRequest[] = [];
  private tasks: Task[] = [];
  private sermons: Sermon[] = [];
  private teamMembers: TeamMember[] = [];
  private resources: Resource[] = [];

  private userId = 1;
  private eventId = 1;
  private prayerRequestId = 1;
  private taskId = 1;
  private sermonId = 1;
  private teamMemberId = 1;
  private resourceId = 1;

  createUser(insertUser: InsertUser): User {
    const user: User = {
      ...insertUser,
      id: this.userId++,
      isAdmin: insertUser.isAdmin || false,
      isActive: insertUser.isActive !== false,
      invitedBy: insertUser.invitedBy ?? undefined,
      church: insertUser.church ?? undefined,
      profileImage: insertUser.profileImage ?? undefined
    };
    this.users.push(user);
    return user;
  }

  createEvent(insertEvent: InsertEvent): Event {
    const event: Event = {
      ...insertEvent,
      id: this.eventId++,
      description: insertEvent.description ?? undefined,
      location: insertEvent.location ?? undefined,
      endTime: insertEvent.endTime ?? undefined,
      category: insertEvent.category ?? undefined,
      participants: insertEvent.participants ?? [],
    };
    this.events.push(event);
    return event;
  }

  createPrayerRequest(insertPrayerRequest: InsertPrayerRequest): PrayerRequest {
    const prayerRequest: PrayerRequest = {
      ...insertPrayerRequest,
      id: this.prayerRequestId++,
      prayerCount: 0
    };
    this.prayerRequests.push(prayerRequest);
    return prayerRequest;
  }

  createTask(insertTask: InsertTask): Task {
    const task: Task = {
      ...insertTask,
      id: this.taskId++,
      description: insertTask.description ?? undefined,
      dueDate: insertTask.dueDate ?? undefined,
      priority: insertTask.priority ?? undefined,
      completed: insertTask.completed ?? false
    };
    this.tasks.push(task);
    return task;
  }

  createSermon(insertSermon: InsertSermon): Sermon {
    const sermon: Sermon = {
      ...insertSermon,
      id: this.sermonId++,
      content: insertSermon.content ?? undefined,
      date: insertSermon.date ?? undefined,
      scripture: insertSermon.scripture ?? undefined,
      outline: typeof insertSermon.outline === "object"
        ? JSON.stringify(insertSermon.outline)
        : insertSermon.outline ?? undefined
    };
    this.sermons.push(sermon);
    return sermon;
  }

  createTeamMember(insertTeamMember: InsertTeamMember): TeamMember {
    const teamMember: TeamMember = {
      ...insertTeamMember,
      id: this.teamMemberId++,
      position: insertTeamMember.position ?? undefined,
      image: insertTeamMember.image ?? undefined
    };
    this.teamMembers.push(teamMember);
    return teamMember;
  }

  createResource(insertResource: InsertResource): Resource {
    const resource: Resource = {
      ...insertResource,
      id: this.resourceId++,
      type: insertResource.type ?? undefined,
      url: insertResource.url ?? undefined,
      description: insertResource.description ?? undefined
    };
    this.resources.push(resource);
    return resource;
  }

  // Add any other methods you need, e.g., getAllUsers(), findEventById(), etc.
}

// Export as named export (matches your routes file)
export const storage = new MemStorage();

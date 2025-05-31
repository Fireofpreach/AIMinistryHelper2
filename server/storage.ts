import {
  type InsertUser,
  type InsertEvent,
  type InsertPrayerRequest,
  type InsertTask,
  type InsertSermon,
  type InsertTeamMember,
  type InsertResource,
} from "@shared/schema";

// Define minimal entity types with IDs for in-memory storage.
type User = InsertUser & { id: number; isAdmin: boolean; isActive: boolean; invitedBy?: string; church?: string | null; profileImage?: string | null };
type Event = InsertEvent & { id: number; description?: string | null; location?: string | null; endTime?: Date; category?: string; participants?: string[] };
type PrayerRequest = InsertPrayerRequest & { id: number; prayerCount: number };
type Task = InsertTask & { id: number; description?: string | null; dueDate?: Date | null; priority?: string; completed?: boolean };
type Sermon = InsertSermon & { id: number; content?: string | null; date?: Date | null; scripture?: string; outline?: string };
type TeamMember = InsertTeamMember & { id: number; position?: string | null; image?: string | null };
type Resource = InsertResource & { id: number; type?: string | null; url?: string | null; description?: string | null };

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

  // USERS
  createUser(insertUser: InsertUser): User {
    const user: User = {
      ...insertUser,
      id: this.userId++,
      isAdmin: insertUser.isAdmin || false,
      isActive: insertUser.isActive !== false,
      invitedBy: insertUser.invitedBy ?? undefined,
      church: insertUser.church ?? undefined,
      profileImage: insertUser.profileImage ?? undefined,
    };
    this.users.push(user);
    return user;
  }
  getAllUsers(): User[] {
    return this.users;
  }
  getUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === Number(id));
  }
  updateUser(id: number, data: Partial<InsertUser>): User | undefined {
    const user = this.getUserById(id);
    if (!user) return undefined;
    Object.assign(user, data);
    return user;
  }
  deleteUser(id: number): boolean {
    const idx = this.users.findIndex((u) => u.id === Number(id));
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }

  // EVENTS
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
  getAllEvents(): Event[] {
    return this.events;
  }
  getEventById(id: number): Event | undefined {
    return this.events.find((e) => e.id === Number(id));
  }
  updateEvent(id: number, data: Partial<InsertEvent>): Event | undefined {
    const event = this.getEventById(id);
    if (!event) return undefined;
    Object.assign(event, data);
    return event;
  }
  deleteEvent(id: number): boolean {
    const idx = this.events.findIndex((e) => e.id === Number(id));
    if (idx === -1) return false;
    this.events.splice(idx, 1);
    return true;
  }

  // PRAYER REQUESTS
  createPrayerRequest(insertPrayerRequest: InsertPrayerRequest): PrayerRequest {
    const prayerRequest: PrayerRequest = {
      ...insertPrayerRequest,
      id: this.prayerRequestId++,
      prayerCount: 0,
    };
    this.prayerRequests.push(prayerRequest);
    return prayerRequest;
  }
  getAllPrayerRequests(): PrayerRequest[] {
    return this.prayerRequests;
  }
  getPrayerRequestById(id: number): PrayerRequest | undefined {
    return this.prayerRequests.find((pr) => pr.id === Number(id));
  }
  updatePrayerRequest(id: number, data: Partial<InsertPrayerRequest>): PrayerRequest | undefined {
    const req = this.getPrayerRequestById(id);
    if (!req) return undefined;
    Object.assign(req, data);
    return req;
  }
  deletePrayerRequest(id: number): boolean {
    const idx = this.prayerRequests.findIndex((pr) => pr.id === Number(id));
    if (idx === -1) return false;
    this.prayerRequests.splice(idx, 1);
    return true;
  }

  // TASKS
  createTask(insertTask: InsertTask): Task {
    const task: Task = {
      ...insertTask,
      id: this.taskId++,
      description: insertTask.description ?? undefined,
      dueDate: insertTask.dueDate ?? undefined,
      priority: insertTask.priority ?? undefined,
      completed: insertTask.completed ?? false,
    };
    this.tasks.push(task);
    return task;
  }
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: number): Task | undefined {
    return this.tasks.find((t) => t.id === Number(id));
  }
  updateTask(id: number, data: Partial<InsertTask>): Task | undefined {
    const task = this.getTaskById(id);
    if (!task) return undefined;
    Object.assign(task, data);
    return task;
  }
  deleteTask(id: number): boolean {
    const idx = this.tasks.findIndex((t) => t.id === Number(id));
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }

  // SERMONS
  createSermon(insertSermon: InsertSermon): Sermon {
    const sermon: Sermon = {
      ...insertSermon,
      id: this.sermonId++,
      content: insertSermon.content ?? undefined,
      date: insertSermon.date ?? undefined,
      scripture: insertSermon.scripture ?? undefined,
      outline:
        typeof insertSermon.outline === "object"
          ? JSON.stringify(insertSermon.outline)
          : insertSermon.outline ?? undefined,
    };
    this.sermons.push(sermon);
    return sermon;
  }
  getAllSermons(): Sermon[] {
    return this.sermons;
  }
  getSermonById(id: number): Sermon | undefined {
    return this.sermons.find((s) => s.id === Number(id));
  }
  updateSermon(id: number, data: Partial<InsertSermon>): Sermon | undefined {
    const sermon = this.getSermonById(id);
    if (!sermon) return undefined;
    Object.assign(sermon, data);
    return sermon;
  }
  deleteSermon(id: number): boolean {
    const idx = this.sermons.findIndex((s) => s.id === Number(id));
    if (idx === -1) return false;
    this.sermons.splice(idx, 1);
    return true;
  }

  // TEAM MEMBERS
  createTeamMember(insertTeamMember: InsertTeamMember): TeamMember {
    const teamMember: TeamMember = {
      ...insertTeamMember,
      id: this.teamMemberId++,
      position: insertTeamMember.position ?? undefined,
      image: insertTeamMember.image ?? undefined,
    };
    this.teamMembers.push(teamMember);
    return teamMember;
  }
  getAllTeamMembers(): TeamMember[] {
    return this.teamMembers;
  }
  getTeamMemberById(id: number): TeamMember | undefined {
    return this.teamMembers.find((tm) => tm.id === Number(id));
  }
  updateTeamMember(id: number, data: Partial<InsertTeamMember>): TeamMember | undefined {
    const member = this.getTeamMemberById(id);
    if (!member) return undefined;
    Object.assign(member, data);
    return member;
  }
  deleteTeamMember(id: number): boolean {
    const idx = this.teamMembers.findIndex((tm) => tm.id === Number(id));
    if (idx === -1) return false;
    this.teamMembers.splice(idx, 1);
    return true;
  }

  // RESOURCES
  createResource(insertResource: InsertResource): Resource {
    const resource: Resource = {
      ...insertResource,
      id: this.resourceId++,
      type: insertResource.type ?? undefined,
      url: insertResource.url ?? undefined,
      description: insertResource.description ?? undefined,
    };
    this.resources.push(resource);
    return resource;
  }
  getAllResources(): Resource[] {
    return this.resources;
  }
  getResourceById(id: number): Resource | undefined {
    return this.resources.find((r) => r.id === Number(id));
  }
  updateResource(id: number, data: Partial<InsertResource>): Resource | undefined {
    const resource = this.getResourceById(id);
    if (!resource) return undefined;
    Object.assign(resource, data);
    return resource;
  }
  deleteResource(id: number): boolean {
    const idx = this.resources.findIndex((r) => r.id === Number(id));
    if (idx === -1) return false;
    this.resources.splice(idx, 1);
    return true;
  }
}

export const storage = new MemStorage();

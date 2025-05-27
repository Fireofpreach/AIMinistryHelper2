import { 
  users, type User, type InsertUser,
  events, type Event, type InsertEvent,
  prayerRequests, type PrayerRequest, type InsertPrayerRequest,
  tasks, type Task, type InsertTask,
  sermons, type Sermon, type InsertSermon,
  teamMembers, type TeamMember, type InsertTeamMember,
  resources, type Resource, type InsertResource
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserStatus(id: number, isActive: boolean): Promise<User | undefined>;
  updateUserAdminStatus(id: number, isAdmin: boolean): Promise<User | undefined>;
  
  // Event operations
  getEvents(userId: number): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Prayer Request operations
  getPrayerRequests(userId: number): Promise<PrayerRequest[]>;
  getPrayerRequest(id: number): Promise<PrayerRequest | undefined>;
  createPrayerRequest(prayerRequest: InsertPrayerRequest): Promise<PrayerRequest>;
  incrementPrayerCount(id: number): Promise<PrayerRequest | undefined>;
  deletePrayerRequest(id: number): Promise<boolean>;
  
  // Task operations
  getTasks(userId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
  
  // Sermon operations
  getSermons(userId: number): Promise<Sermon[]>;
  getSermon(id: number): Promise<Sermon | undefined>;
  createSermon(sermon: InsertSermon): Promise<Sermon>;
  updateSermon(id: number, sermon: Partial<InsertSermon>): Promise<Sermon | undefined>;
  deleteSermon(id: number): Promise<boolean>;
  
  // Team Member operations
  getTeamMembers(userId: number): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, teamMember: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
  
  // Resource operations
  getResources(userId: number): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  deleteResource(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private prayerRequests: Map<number, PrayerRequest>;
  private tasks: Map<number, Task>;
  private sermons: Map<number, Sermon>;
  private teamMembers: Map<number, TeamMember>;
  private resources: Map<number, Resource>;
  
  private nextId: {
    users: number;
    events: number;
    prayerRequests: number;
    tasks: number;
    sermons: number;
    teamMembers: number;
    resources: number;
  };

  constructor() {
    // Initialize maps for each entity
    this.users = new Map();
    this.events = new Map();
    this.prayerRequests = new Map();
    this.tasks = new Map();
    this.sermons = new Map();
    this.teamMembers = new Map();
    this.resources = new Map();
    
    // Initialize the next ID for each entity
    this.nextId = {
      users: 1,
      events: 1,
      prayerRequests: 1,
      tasks: 1,
      sermons: 1,
      teamMembers: 1,
      resources: 1
    };
    
    // Initialize pre-connected theological resources
    this.initializePreConnectedResources();
    
    // Create a default user
    this.createUser({
      username: "drperry",
      password: "password123",
      name: "Dr. Perry Blankenship",
      church: "Gordon Road Church of God",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    });
    
    // Create some team members for the default user
    this.createTeamMember({
      name: "Sarah Miller",
      position: "Worship Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=36&h=36",
      userId: 1
    });
    
    this.createTeamMember({
      name: "Michael Thomas",
      position: "Youth Pastor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=36&h=36",
      userId: 1
    });
    
    this.createTeamMember({
      name: "Jennifer Clark",
      position: "Children's Ministry",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=36&h=36",
      userId: 1
    });
    
    this.createTeamMember({
      name: "David Wilson",
      position: "Administrative Pastor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=36&h=36",
      userId: 1
    });
    
    // Create some events for the default user
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.createEvent({
      title: "Staff Prayer Meeting",
      description: "Weekly staff prayer meeting",
      location: "Conference Room A",
      startTime: new Date(today.setHours(9, 0, 0, 0)),
      endTime: new Date(today.setHours(10, 0, 0, 0)),
      category: "Staff",
      userId: 1,
      participants: ["Sarah Miller", "Michael Thomas", "Jennifer Clark", "David Wilson"]
    });
    
    this.createEvent({
      title: "Youth Leadership Meeting",
      description: "Planning meeting for youth leaders",
      location: "Youth Room",
      startTime: new Date(today.setHours(11, 30, 0, 0)),
      endTime: new Date(today.setHours(13, 0, 0, 0)),
      category: "Youth",
      userId: 1,
      participants: ["Michael Thomas", "Sarah Miller"]
    });
    
    this.createEvent({
      title: "Bible Study Group",
      description: "Weekly Bible study",
      location: "Main Sanctuary",
      startTime: new Date(today.setHours(19, 0, 0, 0)),
      endTime: new Date(today.setHours(20, 30, 0, 0)),
      category: "Community",
      userId: 1,
      participants: []
    });
    
    this.createEvent({
      title: "Community Outreach Planning",
      description: "Planning session for upcoming outreach events",
      location: "Fellowship Hall",
      startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(11, 30, 0, 0)),
      category: "Outreach",
      userId: 1,
      participants: []
    });
    
    // Create some prayer requests for the default user
    this.createPrayerRequest({
      content: "Please pray for my mother's surgery this Friday",
      submittedBy: "Sarah Johnson",
      submittedAt: new Date(today.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      userId: 1
    });
    
    this.createPrayerRequest({
      content: "Continued prayers for the Thompson family after their loss",
      submittedBy: "Pastor",
      submittedAt: new Date(today.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      userId: 1
    });
    
    this.createPrayerRequest({
      content: "Prayers for our youth retreat this weekend",
      submittedBy: "Youth Ministry",
      submittedAt: new Date(today.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
      userId: 1
    });
    
    // Create some tasks for the default user
    this.createTask({
      title: "Finalize Sunday sermon notes",
      description: "Complete the sermon notes for this Sunday's service",
      dueDate: new Date(today.setHours(17, 0, 0, 0)),
      priority: "Urgent",
      completed: false,
      userId: 1
    });
    
    this.createTask({
      title: "Call new members from last Sunday",
      description: "Welcome call to new members who joined last week",
      dueDate: new Date(today.setHours(15, 0, 0, 0)),
      priority: "Important",
      completed: false,
      userId: 1
    });
    
    this.createTask({
      title: "Review worship slides for Sunday",
      description: "Check the slides for any errors or improvements",
      dueDate: new Date(today.setHours(18, 0, 0, 0)),
      priority: "Normal",
      completed: false,
      userId: 1
    });
    
    this.createTask({
      title: "Prepare for staff meeting",
      description: "Prepare agenda and materials for next staff meeting",
      dueDate: new Date(tomorrow.setHours(9, 0, 0, 0)),
      priority: "Normal",
      completed: false,
      userId: 1
    });
    
    this.createTask({
      title: "Finalize community event plan",
      description: "Complete planning for upcoming community event",
      dueDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      priority: "Normal",
      completed: false,
      userId: 1
    });
    
    // Create a sermon for the default user
    this.createSermon({
      title: "Finding Peace in Uncertain Times",
      scripture: "Matthew 11:28-30",
      content: "Come to me, all you who are weary and burdened, and I will give you rest...",
      outline: {
        introduction: "The challenge of finding peace in today's world",
        points: [
          "The source of true peace",
          "Practical steps to experiencing God's peace",
          "Sharing peace with others"
        ],
        conclusion: "Living in God's peace daily"
      },
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), // Next Sunday
      userId: 1
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextId.users++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin || false,
      isActive: insertUser.isActive !== false,
      invitedBy: insertUser.invitedBy || null,
      church: insertUser.church || null,
      profileImage: insertUser.profileImage || null
    };
    this.users.set(id, user);
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async updateUserStatus(id: number, isActive: boolean): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) {
      return undefined;
    }
    
    const updatedUser = { ...user, isActive };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateUserAdminStatus(id: number, isAdmin: boolean): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) {
      return undefined;
    }
    
    const updatedUser = { ...user, isAdmin };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Event operations
  async getEvents(userId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.userId === userId);
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.nextId.events++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
  
  async updateEvent(id: number, eventUpdate: Partial<InsertEvent>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...eventUpdate };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }
  
  // Prayer Request operations
  async getPrayerRequests(userId: number): Promise<PrayerRequest[]> {
    return Array.from(this.prayerRequests.values()).filter(request => request.userId === userId);
  }
  
  async getPrayerRequest(id: number): Promise<PrayerRequest | undefined> {
    return this.prayerRequests.get(id);
  }
  
  async createPrayerRequest(insertPrayerRequest: InsertPrayerRequest): Promise<PrayerRequest> {
    const id = this.nextId.prayerRequests++;
    const prayerRequest: PrayerRequest = { ...insertPrayerRequest, id, prayerCount: 0 };
    this.prayerRequests.set(id, prayerRequest);
    return prayerRequest;
  }
  
  async incrementPrayerCount(id: number): Promise<PrayerRequest | undefined> {
    const prayerRequest = this.prayerRequests.get(id);
    if (!prayerRequest) return undefined;
    
    const updatedPrayerRequest = { 
      ...prayerRequest, 
      prayerCount: (prayerRequest.prayerCount || 0) + 1 
    };
    this.prayerRequests.set(id, updatedPrayerRequest);
    return updatedPrayerRequest;
  }
  
  async deletePrayerRequest(id: number): Promise<boolean> {
    return this.prayerRequests.delete(id);
  }
  
  // Task operations
  async getTasks(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.userId === userId);
  }
  
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.nextId.tasks++;
    const task: Task = { ...insertTask, id };
    this.tasks.set(id, task);
    return task;
  }
  
  async updateTask(id: number, taskUpdate: Partial<InsertTask>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...taskUpdate };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }
  
  // Sermon operations
  async getSermons(userId: number): Promise<Sermon[]> {
    return Array.from(this.sermons.values()).filter(sermon => sermon.userId === userId);
  }
  
  async getSermon(id: number): Promise<Sermon | undefined> {
    return this.sermons.get(id);
  }
  
  async createSermon(insertSermon: InsertSermon): Promise<Sermon> {
    const id = this.nextId.sermons++;
    const sermon: Sermon = { ...insertSermon, id };
    this.sermons.set(id, sermon);
    return sermon;
  }
  
  async updateSermon(id: number, sermonUpdate: Partial<InsertSermon>): Promise<Sermon | undefined> {
    const sermon = this.sermons.get(id);
    if (!sermon) return undefined;
    
    const updatedSermon = { ...sermon, ...sermonUpdate };
    this.sermons.set(id, updatedSermon);
    return updatedSermon;
  }
  
  async deleteSermon(id: number): Promise<boolean> {
    return this.sermons.delete(id);
  }
  
  // Team Member operations
  async getTeamMembers(userId: number): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(member => member.userId === userId);
  }
  
  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }
  
  async createTeamMember(insertTeamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.nextId.teamMembers++;
    const teamMember: TeamMember = { ...insertTeamMember, id };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }
  
  async updateTeamMember(id: number, teamMemberUpdate: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const teamMember = this.teamMembers.get(id);
    if (!teamMember) return undefined;
    
    const updatedTeamMember = { ...teamMember, ...teamMemberUpdate };
    this.teamMembers.set(id, updatedTeamMember);
    return updatedTeamMember;
  }
  
  async deleteTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
  }
  
  // Resource operations
  async getResources(userId: number): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.userId === userId);
  }
  
  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.nextId.resources++;
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }
  
  async updateResource(id: number, resourceUpdate: Partial<InsertResource>): Promise<Resource | undefined> {
    const resource = this.resources.get(id);
    if (!resource) return undefined;
    
    const updatedResource = { ...resource, ...resourceUpdate };
    this.resources.set(id, updatedResource);
    return updatedResource;
  }
  
  async deleteResource(id: number): Promise<boolean> {
    return this.resources.delete(id);
  }

  // Initialize pre-connected theological resources
  initializePreConnectedResources() {
    // Free Biblical Resources
    this.createResource({
      title: "Bible Gateway",
      type: "Bible Study",
      url: "https://www.biblegateway.com/",
      description: "Access multiple Bible translations, commentaries, and study tools.",
      userId: 1
    });
    
    this.createResource({
      title: "Blue Letter Bible",
      type: "Bible Study",
      url: "https://www.blueletterbible.org/",
      description: "Powerful Bible study tool with Greek/Hebrew lexicon, concordances, and commentaries.",
      userId: 1
    });
    
    this.createResource({
      title: "STEP Bible",
      type: "Bible Study",
      url: "https://www.stepbible.org/",
      description: "Scripture Tools for Every Person - free Bible study software with original language tools.",
      userId: 1
    });
    
    // Church of God Resources
    this.createResource({
      title: "Church of God (Anderson) Theological Resources",
      type: "Denominational",
      url: "https://www.jesusisthesubject.org/resources/",
      description: "Official resources from the Church of God (Anderson, Indiana) movement.",
      userId: 1
    });
    
    this.createResource({
      title: "Warner Press",
      type: "Publishing",
      url: "https://www.warnerpress.org/",
      description: "Church of God publishing house with ministry resources and curriculum.",
      userId: 1
    });
    
    // Academic Resources
    this.createResource({
      title: "Christian Classics Ethereal Library",
      type: "Historical",
      url: "https://www.ccel.org/",
      description: "Free digital library of classic Christian books and writings throughout history.",
      userId: 1
    });
    
    this.createResource({
      title: "Biblical Training",
      type: "Course",
      url: "https://www.biblicaltraining.org/",
      description: "Free seminary-level courses on theology, church history, and biblical studies.",
      userId: 1
    });
    
    this.createResource({
      title: "Bible Hub",
      type: "Bible Study",
      url: "https://biblehub.com/",
      description: "Bible study tools with parallel translations, Greek/Hebrew resources, and commentaries.",
      userId: 1
    });
    
    // Wesleyan-Holiness Resources
    this.createResource({
      title: "Wesley Center Online",
      type: "Historical",
      url: "http://wesley.nnu.edu/",
      description: "Collection of Wesleyan/Holiness primary texts and educational materials.",
      userId: 1
    });
    
    this.createResource({
      title: "Seedbed",
      type: "Wesleyan",
      url: "https://www.seedbed.com/",
      description: "Wesleyan publishing house with articles, books, and videos on Wesleyan theology.",
      userId: 1
    });
  }
}

export const storage = new MemStorage();

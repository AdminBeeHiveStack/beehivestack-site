import { type User, type InsertUser, type EmailSubscription, type InsertEmailSubscription, users, emailSubscriptions } from "@shared/schema";
import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSubscription(emailSubscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;
  getAllEmailSubscriptions(): Promise<EmailSubscription[]>;
}

// Database setup
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createEmailSubscription(insertEmailSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const emailData = {
      ...insertEmailSubscription,
      tag: insertEmailSubscription.tag || "BeeHiveStack—Early Access"
    };
    const result = await db.insert(emailSubscriptions).values(emailData).returning();
    return result[0];
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    const result = await db.select().from(emailSubscriptions).where(eq(emailSubscriptions.email, email));
    return result[0];
  }

  async getAllEmailSubscriptions(): Promise<EmailSubscription[]> {
    return await db.select().from(emailSubscriptions);
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailSubscriptions: Map<string, EmailSubscription>;

  constructor() {
    this.users = new Map();
    this.emailSubscriptions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmailSubscription(insertEmailSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const id = randomUUID();
    const emailSubscription: EmailSubscription = { 
      ...insertEmailSubscription, 
      id,
      tag: insertEmailSubscription.tag || "BeeHiveStack—Early Access",
      createdAt: new Date()
    };
    this.emailSubscriptions.set(id, emailSubscription);
    return emailSubscription;
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    return Array.from(this.emailSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }

  async getAllEmailSubscriptions(): Promise<EmailSubscription[]> {
    return Array.from(this.emailSubscriptions.values());
  }
}

// Use database storage in production, memory storage in development if no DATABASE_URL
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();

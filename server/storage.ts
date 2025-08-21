import { 
  type User, 
  type InsertUser, 
  type EmailSubscription, 
  type InsertEmailSubscription,
  type Investor,
  type InsertInvestor,
  type Seller,
  type InsertSeller,
  users, 
  emailSubscriptions,
  investors,
  sellers
} from "@shared/schema";
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
  createInvestor(investor: InsertInvestor): Promise<Investor>;
  getInvestorByEmail(email: string): Promise<Investor | undefined>;
  getAllInvestors(): Promise<Investor[]>;
  createSeller(seller: InsertSeller): Promise<Seller>;
  getSellerByEmail(email: string): Promise<Seller | undefined>;
  getAllSellers(): Promise<Seller[]>;
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

  async createInvestor(insertInvestor: InsertInvestor): Promise<Investor> {
    const result = await db.insert(investors).values(insertInvestor).returning();
    return result[0];
  }

  async getInvestorByEmail(email: string): Promise<Investor | undefined> {
    const result = await db.select().from(investors).where(eq(investors.email, email));
    return result[0];
  }

  async getAllInvestors(): Promise<Investor[]> {
    return await db.select().from(investors);
  }

  async createSeller(insertSeller: InsertSeller): Promise<Seller> {
    const result = await db.insert(sellers).values(insertSeller).returning();
    return result[0];
  }

  async getSellerByEmail(email: string): Promise<Seller | undefined> {
    const result = await db.select().from(sellers).where(eq(sellers.email, email));
    return result[0];
  }

  async getAllSellers(): Promise<Seller[]> {
    return await db.select().from(sellers);
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailSubscriptions: Map<string, EmailSubscription>;
  private investors: Map<string, Investor>;
  private sellers: Map<string, Seller>;

  constructor() {
    this.users = new Map();
    this.emailSubscriptions = new Map();
    this.investors = new Map();
    this.sellers = new Map();
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

  async createInvestor(insertInvestor: InsertInvestor): Promise<Investor> {
    const id = randomUUID();
    const investor: Investor = { 
      ...insertInvestor, 
      id,
      createdAt: new Date()
    };
    this.investors.set(id, investor);
    return investor;
  }

  async getInvestorByEmail(email: string): Promise<Investor | undefined> {
    return Array.from(this.investors.values()).find(
      (investor) => investor.email === email,
    );
  }

  async getAllInvestors(): Promise<Investor[]> {
    return Array.from(this.investors.values());
  }

  async createSeller(insertSeller: InsertSeller): Promise<Seller> {
    const id = randomUUID();
    const seller: Seller = { 
      ...insertSeller, 
      id,
      createdAt: new Date()
    };
    this.sellers.set(id, seller);
    return seller;
  }

  async getSellerByEmail(email: string): Promise<Seller | undefined> {
    return Array.from(this.sellers.values()).find(
      (seller) => seller.email === email,
    );
  }

  async getAllSellers(): Promise<Seller[]> {
    return Array.from(this.sellers.values());
  }
}

// Use database storage in production, memory storage in development if no DATABASE_URL
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();

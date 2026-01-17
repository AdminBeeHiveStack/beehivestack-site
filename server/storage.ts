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
    // Normalize phone number for A2P compliance (digits-only)
    let normalizedPhone: string = insertEmailSubscription.phone;
    if (normalizedPhone) {
      const digitsOnly = normalizedPhone.replace(/\D/g, '');
      normalizedPhone = digitsOnly.length === 10 ? digitsOnly : normalizedPhone;
    }
    
    const emailData = {
      ...insertEmailSubscription,
      phone: normalizedPhone,
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
    // Normalize phone number for A2P compliance (digits-only) - defense-in-depth
    let normalizedPhone: string | undefined = insertInvestor.phone ?? undefined;
    if (normalizedPhone) {
      const digitsOnly = normalizedPhone.replace(/\D/g, '');
      normalizedPhone = digitsOnly.length === 10 ? digitsOnly : normalizedPhone;
    }
    
    const investorData = {
      ...insertInvestor,
      phone: normalizedPhone
    };
    const result = await db.insert(investors).values(investorData).returning();
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
    // Normalize phone number for A2P compliance (digits-only) - defense-in-depth
    let normalizedPhone: string | undefined = insertSeller.phone ?? undefined;
    if (normalizedPhone) {
      const digitsOnly = normalizedPhone.replace(/\D/g, '');
      normalizedPhone = digitsOnly.length === 10 ? digitsOnly : normalizedPhone;
    }
    
    const sellerData = {
      ...insertSeller,
      phone: normalizedPhone
    };
    const result = await db.insert(sellers).values(sellerData).returning();
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
    
    // Normalize phone number for A2P compliance (digits-only)
    let normalizedPhone: string | null = insertEmailSubscription.phone ?? null;
    if (normalizedPhone) {
      const digitsOnly = normalizedPhone.replace(/\D/g, '');
      normalizedPhone = digitsOnly.length === 10 ? digitsOnly : normalizedPhone;
    }
    
    const emailSubscription: EmailSubscription = { 
      id,
      name: insertEmailSubscription.name ?? null,
      email: insertEmailSubscription.email,
      phone: normalizedPhone,
      consentToSMS: insertEmailSubscription.consentToSMS ?? false,
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
    
    // Normalize phone number for A2P compliance (digits-only)
    let normalizedPhone: string | null = insertInvestor.phone ?? null;
    if (normalizedPhone) {
      const digitsOnly = normalizedPhone.replace(/\D/g, '');
      normalizedPhone = digitsOnly.length === 10 ? digitsOnly : normalizedPhone;
    }
    
    const investor: Investor = { 
      id,
      name: insertInvestor.name,
      email: insertInvestor.email,
      phone: normalizedPhone,
      consentToSMS: insertInvestor.consentToSMS ?? false,
      linkedin: insertInvestor.linkedin ?? null,
      investmentBudget: insertInvestor.investmentBudget,
      investmentStructure: insertInvestor.investmentStructure,
      businessTypes: insertInvestor.businessTypes,
      targetRevenue: insertInvestor.targetRevenue,
      dealSizeComfort: insertInvestor.dealSizeComfort,
      timeline: insertInvestor.timeline,
      involvement: insertInvestor.involvement,
      keepConfidential: insertInvestor.keepConfidential ?? false,
      premiumDeals: insertInvestor.premiumDeals ?? false,
      convertKitTag: insertInvestor.convertKitTag ?? "Investor—Pending Onboarding",
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
    
    // Normalize phone number for A2P compliance (digits-only)
    let normalizedPhone: string | null = insertSeller.phone ?? null;
    if (normalizedPhone) {
      const digitsOnly = normalizedPhone.replace(/\D/g, '');
      normalizedPhone = digitsOnly.length === 10 ? digitsOnly : normalizedPhone;
    }
    
    const seller: Seller = { 
      id,
      name: insertSeller.name,
      email: insertSeller.email,
      phone: normalizedPhone,
      consentToSMS: insertSeller.consentToSMS ?? false,
      linkedin: insertSeller.linkedin ?? null,
      websiteUrls: insertSeller.websiteUrls,
      businessType: insertSeller.businessType,
      monetizationMethods: insertSeller.monetizationMethods,
      currentRevenue: insertSeller.currentRevenue,
      revenueTrend: insertSeller.revenueTrend,
      monthlyTraffic: insertSeller.monthlyTraffic,
      trafficSources: insertSeller.trafficSources,
      operationalLoad: insertSeller.operationalLoad,
      teamSize: insertSeller.teamSize,
      exitTimeline: insertSeller.exitTimeline,
      valuationExpectation: insertSeller.valuationExpectation ?? null,
      willingToConsider: insertSeller.willingToConsider,
      keepAnonymized: insertSeller.keepAnonymized ?? false,
      fastTrack: insertSeller.fastTrack ?? false,
      documentsUploaded: insertSeller.documentsUploaded ?? null,
      convertKitTag: insertSeller.convertKitTag ?? "Seller—Pending Onboarding",
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

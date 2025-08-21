import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const emailSubscriptions = pgTable("email_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  tag: text("tag").notNull().default("BeeHiveStack—Early Access"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const investors = pgTable("investors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  linkedin: text("linkedin"),
  investmentBudget: text("investment_budget").notNull(),
  investmentStructure: text("investment_structure").notNull(),
  businessTypes: text("business_types").array().notNull(),
  targetRevenue: text("target_revenue").notNull(),
  dealSizeComfort: text("deal_size_comfort").notNull(),
  timeline: text("timeline").notNull(),
  involvement: text("involvement").notNull(),
  keepConfidential: boolean("keep_confidential").notNull().default(false),
  premiumDeals: boolean("premium_deals").notNull().default(false),
  convertKitTag: text("convertkit_tag").notNull().default("Investor—Pending Onboarding"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sellers = pgTable("sellers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  linkedin: text("linkedin"),
  websiteUrls: text("website_urls").array().notNull(),
  businessType: text("business_type").notNull(),
  monetizationMethods: text("monetization_methods").array().notNull(),
  currentRevenue: text("current_revenue").notNull(),
  revenueTrend: text("revenue_trend").notNull(),
  monthlyTraffic: text("monthly_traffic").notNull(),
  trafficSources: text("traffic_sources").notNull(),
  operationalLoad: text("operational_load").notNull(),
  teamSize: text("team_size").notNull(),
  exitTimeline: text("exit_timeline").notNull(),
  valuationExpectation: text("valuation_expectation"),
  willingToConsider: text("willing_to_consider").array().notNull(),
  keepAnonymized: boolean("keep_anonymized").notNull().default(false),
  fastTrack: boolean("fast_track").notNull().default(false),
  documentsUploaded: text("documents_uploaded"),
  convertKitTag: text("convertkit_tag").notNull().default("Seller—Pending Onboarding"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).pick({
  email: true,
  tag: true,
});

export const insertInvestorSchema = createInsertSchema(investors).omit({
  id: true,
  createdAt: true,
});

export const insertSellerSchema = createInsertSchema(sellers).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type InsertInvestor = z.infer<typeof insertInvestorSchema>;
export type Investor = typeof investors.$inferSelect;
export type InsertSeller = z.infer<typeof insertSellerSchema>;
export type Seller = typeof sellers.$inferSelect;

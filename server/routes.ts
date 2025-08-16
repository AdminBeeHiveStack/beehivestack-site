import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/emails", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscriptionByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(400).json({ 
          message: "This email address is already subscribed to our updates." 
        });
      }

      // Create new subscription
      const emailSubscription = await storage.createEmailSubscription(validatedData);
      
      res.status(201).json({ 
        message: "Successfully subscribed to updates!",
        subscription: {
          id: emailSubscription.id,
          email: emailSubscription.email,
          createdAt: emailSubscription.createdAt
        }
      });
    } catch (error) {
      console.error("Email subscription error:", error);
      res.status(400).json({ 
        message: "Invalid email address. Please check and try again." 
      });
    }
  });

  // Get all email subscriptions (for admin purposes)
  app.get("/api/emails", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      res.json({ subscriptions });
    } catch (error) {
      console.error("Get subscriptions error:", error);
      res.status(500).json({ message: "Failed to retrieve subscriptions" });
    }
  });

  // Report endpoint for email capture (alias for backward compatibility)
  app.post("/report", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      const existingSubscription = await storage.getEmailSubscriptionByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(400).json({ 
          message: "This email address is already subscribed to our updates." 
        });
      }

      const emailSubscription = await storage.createEmailSubscription(validatedData);
      
      res.status(201).json({ 
        message: "Successfully subscribed to updates!",
        subscription: {
          id: emailSubscription.id,
          email: emailSubscription.email,
          createdAt: emailSubscription.createdAt
        }
      });
    } catch (error) {
      console.error("Report endpoint error:", error);
      res.status(400).json({ 
        message: "Invalid email address. Please check and try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

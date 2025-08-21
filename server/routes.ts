import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { sendWelcomeEmail, sendAdminNotification, sendNewsletter } from "./email";

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
      
      // Send welcome email (non-blocking)
      sendWelcomeEmail(emailSubscription.email).catch(error => {
        console.error("Failed to send welcome email:", error);
      });
      
      // Send admin notification (non-blocking)
      storage.getAllEmailSubscriptions().then(subscriptions => {
        sendAdminNotification(
          emailSubscription.email, 
          emailSubscription.tag || "BeeHiveStack—Early Access",
          subscriptions.length
        ).catch(error => {
          console.error("Failed to send admin notification:", error);
        });
      });
      
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
      
      // Send welcome email (non-blocking)
      sendWelcomeEmail(emailSubscription.email).catch(error => {
        console.error("Failed to send welcome email:", error);
      });
      
      // Send admin notification (non-blocking)
      storage.getAllEmailSubscriptions().then(subscriptions => {
        sendAdminNotification(
          emailSubscription.email, 
          emailSubscription.tag || "BeeHiveStack—Early Access",
          subscriptions.length
        ).catch(error => {
          console.error("Failed to send admin notification:", error);
        });
      });
      
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

  // Newsletter management endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { subject, htmlContent, textContent } = req.body;
      
      if (!subject || !htmlContent || !textContent) {
        return res.status(400).json({ 
          message: "Subject, htmlContent, and textContent are required" 
        });
      }

      const subscribers = await storage.getAllEmailSubscriptions();
      
      if (subscribers.length === 0) {
        return res.status(400).json({ 
          message: "No subscribers found" 
        });
      }

      const result = await sendNewsletter(subject, htmlContent, textContent, subscribers);
      
      res.json({ 
        message: `Newsletter sent successfully`,
        results: {
          totalSubscribers: subscribers.length,
          successfulSends: result.success,
          failedSends: result.failed
        }
      });
    } catch (error) {
      console.error("Newsletter send error:", error);
      res.status(500).json({ 
        message: "Failed to send newsletter" 
      });
    }
  });

  // Test email endpoint (for testing email functionality)
  app.post("/api/test-email", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email address is required" });
      }

      const success = await sendWelcomeEmail(email);
      
      if (success) {
        res.json({ message: "Test email sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send test email" });
      }
    } catch (error) {
      console.error("Test email error:", error);
      res.status(500).json({ message: "Failed to send test email" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

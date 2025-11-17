import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema, insertInvestorSchema, insertSellerSchema } from "@shared/schema";
import { sendWelcomeEmail, sendAdminNotification, sendNewsletter } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/emails", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // A2P Compliance: If user consents to SMS, phone number is required
      if (validatedData.consentToSMS && !validatedData.phone) {
        return res.status(400).json({ 
          message: "Phone number is required when opting in to SMS notifications." 
        });
      }
      
      // Basic phone number format validation (US format)
      if (validatedData.phone) {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(validatedData.phone)) {
          return res.status(400).json({ 
            message: "Please provide a valid phone number." 
          });
        }
      }
      
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
      sendWelcomeEmail(emailSubscription.email, emailSubscription.consentToSMS || false).catch(error => {
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
          name: emailSubscription.name,
          phone: emailSubscription.phone,
          consentToSMS: emailSubscription.consentToSMS,
          createdAt: emailSubscription.createdAt
        }
      });
    } catch (error) {
      console.error("Email subscription error:", error);
      res.status(400).json({ 
        message: "Invalid data. Please check your information and try again." 
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

  // Investor onboarding endpoints
  app.post("/api/investors", async (req, res) => {
    try {
      const validatedData = insertInvestorSchema.parse(req.body);
      
      // Check if investor already exists
      const existingInvestor = await storage.getInvestorByEmail(validatedData.email);
      if (existingInvestor) {
        return res.status(400).json({ 
          message: "An investor profile already exists with this email address." 
        });
      }

      // Create new investor
      const investor = await storage.createInvestor(validatedData);
      
      // Also add to email subscriptions with investor tag
      const emailSubscriptionData = {
        email: validatedData.email,
        tag: "Investor—Pending Onboarding"
      };
      
      try {
        await storage.createEmailSubscription(emailSubscriptionData);
      } catch (error) {
        // Email might already exist in subscriptions - that's okay
        console.log("Email already in subscriptions:", validatedData.email);
      }
      
      res.status(201).json({ 
        message: "Investor profile created successfully!",
        investor: {
          id: investor.id,
          name: investor.name,
          email: investor.email,
          createdAt: investor.createdAt
        }
      });
    } catch (error) {
      console.error("Investor creation error:", error);
      res.status(400).json({ 
        message: "Invalid investor data. Please check all fields and try again." 
      });
    }
  });

  app.get("/api/investors", async (req, res) => {
    try {
      const investors = await storage.getAllInvestors();
      res.json({ investors });
    } catch (error) {
      console.error("Get investors error:", error);
      res.status(500).json({ message: "Failed to retrieve investors" });
    }
  });

  // Seller onboarding endpoints
  app.post("/api/sellers", async (req, res) => {
    try {
      const validatedData = insertSellerSchema.parse(req.body);
      
      // Check if seller already exists
      const existingSeller = await storage.getSellerByEmail(validatedData.email);
      if (existingSeller) {
        return res.status(400).json({ 
          message: "A seller profile already exists with this email address." 
        });
      }

      // Create new seller
      const seller = await storage.createSeller(validatedData);
      
      // Also add to email subscriptions with seller tag
      const emailSubscriptionData = {
        email: validatedData.email,
        tag: "Seller—Pending Onboarding"
      };
      
      try {
        await storage.createEmailSubscription(emailSubscriptionData);
      } catch (error) {
        // Email might already exist in subscriptions - that's okay
        console.log("Email already in subscriptions:", validatedData.email);
      }
      
      res.status(201).json({ 
        message: "Seller profile created successfully!",
        seller: {
          id: seller.id,
          name: seller.name,
          email: seller.email,
          createdAt: seller.createdAt
        }
      });
    } catch (error) {
      console.error("Seller creation error:", error);
      res.status(400).json({ 
        message: "Invalid seller data. Please check all fields and try again." 
      });
    }
  });

  app.get("/api/sellers", async (req, res) => {
    try {
      const sellers = await storage.getAllSellers();
      res.json({ sellers });
    } catch (error) {
      console.error("Get sellers error:", error);
      res.status(500).json({ message: "Failed to retrieve sellers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

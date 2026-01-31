
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth first
  await setupAuth(app);
  registerAuthRoutes(app);

  // Helper for sending emails
  const sendEmail = async (to: string, subject: string, text: string) => {
    const s = await storage.getSettings();
    if (!s.smtpHost || !s.smtpUser || !s.smtpPass) return;
    
    const transporter = nodemailer.createTransport({
      host: s.smtpHost,
      port: s.smtpPort,
      secure: s.smtpPort === 465,
      auth: { user: s.smtpUser, pass: s.smtpPass }
    });
    
    await transporter.sendMail({ from: s.smtpUser, to, subject, text });
  };

  // Helper for WhatsApp alert (Simulated as per constraints)
  const sendWhatsAppAlert = async (message: string) => {
    const s = await storage.getSettings();
    if (!s.whatsappNumber) return;
    console.log(`[WhatsApp API Simulation] To: ${s.whatsappNumber}, Msg: ${message}`);
  };

  // Profiles
  app.get(api.profiles.list.path, async (req, res) => {
    const profiles = await storage.getProfiles(req.query);
    res.json(profiles);
  });

  app.post(api.profiles.create.path, async (req, res) => {
    try {
      const input = api.profiles.create.input.parse(req.body);
      const profile = await storage.createProfile(input);
      
      // Notify Admin
      const s = await storage.getSettings();
      if (s.adminEmail) {
        await sendEmail(s.adminEmail, "New Registration", `New profile: ${profile.name} registered.`);
      }
      await sendWhatsAppAlert(`New profile registration: ${profile.name}`);
      
      // Notify User
      await sendEmail(profile.email, "Welcome to dulha-dulhan.com", "Your profile has been created. We will review it soon.");

      res.status(201).json(profile);
    } catch (err) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  app.put(api.profiles.update.path, isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);
    const updated = await storage.updateProfile(id, req.body);
    res.json(updated);
  });

  // Services
  app.get(api.services.list.path, async (req, res) => {
    const servicesList = await storage.getServices();
    res.json(servicesList);
  });

  app.post(api.services.create.path, isAuthenticated, async (req, res) => {
    const service = await storage.createService(req.body);
    res.status(201).json(service);
  });

  // Settings
  app.get(api.settings.get.path, isAuthenticated, async (req, res) => {
    const s = await storage.getSettings();
    res.json(s);
  });

  app.put(api.settings.update.path, isAuthenticated, async (req, res) => {
    const updated = await storage.updateSettings(req.body);
    res.json(updated);
  });

  // Seed initial data
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({ title: "Personal Matchmaking", description: "Get hand-picked matches.", icon: "Heart" });
    await storage.createService({ title: "Privacy Protection", description: "You control your visibility.", icon: "Shield" });
  }

  return httpServer;
}

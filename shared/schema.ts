
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  whatsappNumber: text("whatsapp_number").default("").notNull(),
  whatsappApiKey: text("whatsapp_api_key").default("").notNull(),
  smtpHost: text("smtp_host").default("").notNull(),
  smtpPort: integer("smtp_port").default(587).notNull(),
  smtpUser: text("smtp_user").default("").notNull(),
  smtpPass: text("smtp_pass").default("").notNull(),
  adminEmail: text("admin_email").default("").notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
});

export const PROFILE_STATUS = ["New", "Contacted", "Interested", "Closed"] as const;

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id"), 
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  age: integer("age").notNull(),
  city: text("city").notNull(),
  community: text("community").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  bio: text("bio").default("").notNull(),
  imageUrl: text("image_url").default("").notNull(),
  status: text("status").default("New").notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  isFeaturedOnHome: boolean("is_featured_on_home").default(false).notNull(),
  adminNotes: text("admin_notes").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({ id: true, createdAt: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertSettingsSchema = createInsertSchema(settings).omit({ id: true });

export type Profile = typeof profiles.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Settings = typeof settings.$inferSelect;

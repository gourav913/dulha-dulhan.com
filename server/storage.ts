
import { db } from "./db";
import { profiles, services, settings, type Profile, type Service, type Settings, type CreateProfileRequest, type UpdateProfileRequest, type CreateServiceRequest, type UpdateServiceRequest, type UpdateSettingsRequest } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Profiles
  getProfiles(filters?: any): Promise<Profile[]>;
  getProfile(id: number): Promise<Profile | undefined>;
  getProfileByUserId(userId: string): Promise<Profile | undefined>;
  createProfile(profile: CreateProfileRequest): Promise<Profile>;
  updateProfile(id: number, updates: UpdateProfileRequest): Promise<Profile>;
  deleteProfile(id: number): Promise<void>;

  // Services
  getServices(): Promise<Service[]>;
  createService(service: CreateServiceRequest): Promise<Service>;
  updateService(id: number, updates: UpdateServiceRequest): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Settings
  getSettings(): Promise<Settings>;
  updateSettings(updates: UpdateSettingsRequest): Promise<Settings>;
}

export class DatabaseStorage implements IStorage {
  async getProfiles(filters: any = {}): Promise<Profile[]> {
    let query = db.select().from(profiles);
    // Real implementation would use filters if needed
    return await query;
  }

  async getProfile(id: number): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.id, id));
    return profile;
  }

  async getProfileByUserId(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile;
  }

  async createProfile(profile: CreateProfileRequest): Promise<Profile> {
    const [newProfile] = await db.insert(profiles).values(profile).returning();
    return newProfile;
  }

  async updateProfile(id: number, updates: UpdateProfileRequest): Promise<Profile> {
    const [updated] = await db.update(profiles).set(updates).where(eq(profiles.id, id)).returning();
    return updated;
  }

  async deleteProfile(id: number): Promise<void> {
    await db.delete(profiles).where(eq(profiles.id, id));
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(service: CreateServiceRequest): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: number, updates: UpdateServiceRequest): Promise<Service> {
    const [updated] = await db.update(services).set(updates).where(eq(services.id, id)).returning();
    return updated;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  async getSettings(): Promise<Settings> {
    const [s] = await db.select().from(settings);
    if (!s) {
      const [newS] = await db.insert(settings).values({}).returning();
      return newS;
    }
    return s;
  }

  async updateSettings(updates: UpdateSettingsRequest): Promise<Settings> {
    const s = await this.getSettings();
    const [updated] = await db.update(settings).set(updates).where(eq(settings.id, s.id)).returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();

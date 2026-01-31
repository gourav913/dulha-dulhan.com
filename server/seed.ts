
import { db } from "./db";
import { services, settings, profiles } from "@shared/schema";

async function seed() {
  console.log("Seeding initial data...");

  // Seed Settings
  await db.insert(settings).values({
    whatsappNumber: "919876543210",
    whatsappApiKey: "simulated_key",
    smtpHost: "smtp.example.com",
    smtpPort: 587,
    smtpUser: "admin@dulha-dulhan.com",
    smtpPass: "secure_password",
    adminEmail: "admin@dulha-dulhan.com",
  }).onConflictDoNothing();

  // Seed Services
  await db.insert(services).values([
    {
      title: "Verified Profiles",
      description: "Every profile is manually verified by our team for authenticity.",
      icon: "ShieldCheck",
    },
    {
      title: "Privacy Control",
      description: "You decide who sees your photos and contact details.",
      icon: "Lock",
    },
    {
      title: "Personal Matchmaker",
      description: "Get assistance from our experienced matchmakers to find the one.",
      icon: "UserHeart",
    },
  ]);

  // Seed Sample Profile
  await db.insert(profiles).values({
    name: "Aisha Sharma",
    gender: "Female",
    age: 26,
    city: "Mumbai",
    community: "Brahmin",
    phone: "919000000000",
    email: "aisha@example.com",
    bio: "Looking for a compatible partner who values tradition and growth.",
    status: "New",
    isPublic: true,
    isFeaturedOnHome: true,
  });

  console.log("Seeding completed!");
}

seed().catch(console.error);

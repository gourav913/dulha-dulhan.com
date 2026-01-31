import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display text-primary mb-6">About Vivah Matrimony</h1>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border/50 mb-12">
            <h2 className="text-2xl font-display font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Vivah Matrimony, we believe that marriage is not just a union of two individuals but a coming together of two families, cultures, and traditions. Our mission is to provide a safe, secure, and convenient platform for Indians globally to find their life partners. We blend technology with tradition to help you find the one made for you.
            </p>

            <h2 className="text-2xl font-display font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the most trusted matchmaking service in the world, known for our integrity, innovation, and customer-centric approach. We strive to create millions of happy stories and be the catalyst for lifelong companionship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
              <h3 className="text-xl font-bold font-display text-primary mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  "Strict Profile Screening",
                  "Privacy & Security Controls",
                  "Dedicated Customer Support",
                  "Verified Contact Details",
                  "Intelligent Matchmaking Algorithms"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border overflow-hidden relative">
              {/* Unsplash image: Traditional Indian decor flowers */}
              {/* <!-- Indian marigold flowers decoration blur background --> */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533420808269-e763131b79f2?q=80&w=1000&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-display text-primary mb-4">Our Promise</h3>
                <p className="text-muted-foreground">
                  We promise to maintain the highest standards of integrity and confidentiality. Your trust is our most valuable asset, and we work tirelessly to ensure a respectful and secure environment for your partner search.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Heart, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-primary/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-10" />
          {/* Unsplash image: Indian Wedding Couple */}
          {/* <!-- Indian wedding couple holding hands traditional attire --> */}
          <img 
            src="/images/hero-ceremony.jpg" 
            alt="Wedding Ceremony"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6 px-4"
          >
            <div className="inline-block px-4 py-1 border border-secondary/50 rounded-full bg-black/20 backdrop-blur-sm mb-4">
              <span className="text-secondary text-sm font-semibold tracking-wider uppercase">India's Most Trusted</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white drop-shadow-lg leading-tight md:leading-snug px-4">
              Find Your Soulmate <br className="hidden md:block"/>
              <span className="text-secondary italic">on dulha-dulhan.com</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Discover millions of profiles and find your perfect life partner with trust, tradition, and technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold text-lg px-8 py-6 rounded-full shadow-xl shadow-black/20 transition-all hover:scale-105">
                  Register Free
                </Button>
              </Link>
              <Link href="/stories">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-full backdrop-blur-sm">
                  Success Stories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white relative -mt-8 mx-4 md:mx-12 lg:mx-24 rounded-2xl shadow-xl z-30 border border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "100% Verified Profiles", desc: "Every profile undergoes a manual verification process." },
              { icon: Users, title: "10 Lakh+ Members", desc: "Largest community of eligible brides and grooms." },
              { icon: Heart, title: "Privacy Control", desc: "You decide who sees your contact information." },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-secondary/5 transition-colors"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display text-primary mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Finding your soulmate is now easier than ever. Follow these simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
            
            {[
              { step: "01", title: "Sign Up", desc: "Register for free & put up your profile." },
              { step: "02", title: "Connect", desc: "Select & connect with matches you like." },
              { step: "03", title: "Interact", desc: "Become a premium member & start a conversation." },
              { step: "04", title: "Marriage", desc: "Get married and live happily ever after." },
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-primary/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Heart className="w-64 h-64 rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to find your Perfect Match?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy souls who found love on dulha-dulhan.com. Your story could be next.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold px-10 py-6 text-lg rounded-full shadow-2xl">
              Create Your Profile Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

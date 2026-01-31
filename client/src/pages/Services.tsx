import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Phone, Shield } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: UserPlus,
      title: "Premium Matchmaking",
      desc: "Get a dedicated relationship manager who shortlists matches based on your preferences and arranges meetings.",
      price: "₹ 5,000 / mo"
    },
    {
      icon: Search,
      title: "Assisted Search",
      desc: "Our team helps you search through thousands of profiles to find the best matches for you.",
      price: "₹ 2,500 / mo"
    },
    {
      icon: Shield,
      title: "Privacy Plus",
      desc: "Enhanced privacy settings allowing you to keep your photo and details visible only to people you accept.",
      price: "₹ 1,000 / mo"
    },
    {
      icon: Phone,
      title: "Verified Contacts",
      desc: "Access verified phone numbers and email addresses of profiles you are interested in.",
      price: "Free with Registration"
    }
  ];

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-6">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the right plan for your journey. We offer a range of services designed to help you find your partner faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-6">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 min-h-[80px]">{service.desc}</p>
              <div className="pt-6 border-t border-border">
                <p className="text-primary font-bold text-lg mb-4">{service.price}</p>
                <Link href="/contact">
                  <Button className="w-full bg-secondary/10 text-secondary-foreground hover:bg-secondary hover:text-white border border-secondary/20">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-4">Need help choosing?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Our customer support team is available 24/7 to answer your queries and help you select the best membership plan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="flex items-center justify-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="font-semibold">+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <span className="font-semibold">support@vivahmatrimony.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

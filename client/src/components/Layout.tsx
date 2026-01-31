import { Link, useLocation } from "wouter";
import { Menu, X, HeartHandshake } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/stories", label: "Success Stories" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-primary rounded-full text-white shadow-lg group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-primary block leading-none">
                  dulha-dulhan
                </span>
                <span className="text-xs font-medium text-secondary tracking-widest uppercase">
                  .com
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary relative py-1
                    ${location === link.href ? "text-primary" : "text-muted-foreground"}
                  `}
                >
                  {link.label}
                  {location === link.href && (
                    <motion.div 
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-secondary"
                    />
                  )}
                </Link>
              ))}
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                  Register Free
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-border"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors
                      ${location === link.href ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-50"}
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link href="/register">
                    <Button className="w-full bg-primary text-white rounded-full">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-full">
                  <HeartHandshake className="w-6 h-6 text-secondary" />
                </div>
                <span className="font-display font-bold text-xl">dulha-dulhan.com</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Empowering hearts to find their perfect match since 2024. Privacy, trust, and tradition at the core of our matchmaking service.
              </p>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-secondary mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-secondary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li><Link href="/admin/login" className="hover:text-secondary transition-colors">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-secondary mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>123 Wedding Avenue</li>
                <li>Mumbai, Maharashtra 400001</li>
                <li>+91 98765 43210</li>
                <li>support@vivahmatrimony.com</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-secondary mb-4">Newsletter</h4>
              <p className="text-xs text-white/70 mb-3">Subscribe for success stories and tips.</p>
              <div className="flex gap-2">
                <input 
                  placeholder="Email address" 
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-secondary"
                />
                <Button size="sm" className="bg-secondary text-primary hover:bg-secondary/90 font-bold">
                  Join
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 Vivah Matrimony. All rights reserved.</p>
            <p>Designed with ❤️ for happy beginnings.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

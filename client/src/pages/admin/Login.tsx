import { useState } from "react";
import { useAdminLogin } from "@/hooks/use-profiles";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useLocation();
  const login = useAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { username, password }, 
      { onSuccess: () => setLocation("/admin/dashboard") }
    );
  };

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Lock className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-display text-primary">dulha-dulhan Admin</CardTitle>
            <p className="text-sm text-muted-foreground">Secure access to matchmaking management</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-center text-muted-foreground bg-primary/5 p-3 rounded-md border border-primary/10">
              Access is restricted to authorized personnel. Use your Replit account to sign in.
            </p>
            <Button 
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11"
            >
              <a href="/api/login">
                <Lock className="w-4 h-4 mr-2" />
                Sign In with Replit
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

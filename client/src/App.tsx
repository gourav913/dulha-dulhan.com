
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import SuccessStories from "@/pages/SuccessStories";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import Dashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/Login";
import { Layout } from "@/components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/stories" component={SuccessStories} />
        <Route path="/contact" component={Contact} />
        <Route path="/register" component={Register} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

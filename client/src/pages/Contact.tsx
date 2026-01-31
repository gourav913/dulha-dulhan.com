import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = (data: any) => {
    // Simulate form submission
    console.log(data);
    toast({
      title: "Message Sent",
      description: "We've received your query and will get back to you shortly.",
    });
    reset();
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-6">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
              <h3 className="text-2xl font-display font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Our Office</h4>
                    <p className="text-muted-foreground">123 Wedding Avenue, Bandra West<br/>Mumbai, Maharashtra 400050</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Phone</h4>
                    <p className="text-muted-foreground">+91 98765 43210 (Mon-Sat, 9am - 7pm)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground">support@vivahmatrimony.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border"
          >
            <h3 className="text-2xl font-display font-bold text-primary mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input {...register("firstName")} placeholder="Rahul" className="h-11 bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <Input {...register("lastName")} placeholder="Sharma" className="h-11 bg-muted/30" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input {...register("email")} type="email" placeholder="rahul@example.com" className="h-11 bg-muted/30" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea {...register("message")} placeholder="How can we help you?" className="min-h-[150px] bg-muted/30 resize-none" />
              </div>

              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

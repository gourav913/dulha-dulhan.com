import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProfileSchema } from "@shared/schema";
import { z } from "zod";
import { useCreateProfile } from "@/hooks/use-profiles";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

// Extended schema to handle strings from inputs that need coercion
const formSchema = insertProfileSchema.extend({
  age: z.coerce.number().min(18, "Must be at least 18").max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const createProfile = useCreateProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "",
      age: undefined,
      city: "",
      community: "",
      email: "",
      phone: "",
    },
    mode: "onChange"
  });

  const { register, control, handleSubmit, formState: { errors, isValid }, trigger } = form;

  const handleNext = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(["name", "gender", "age", "community"]);
    } else if (step === 2) {
      valid = await trigger(["city", "email", "phone"]);
    }
    
    if (valid) setStep(step + 1);
  };

  const onSubmit = (data: FormValues) => {
    createProfile.mutate(data, {
      onSuccess: () => {
        setStep(3); // Success step
        setTimeout(() => setLocation("/"), 3000);
      }
    });
  };

  return (
    <div className="min-h-screen py-20 bg-pattern flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-primary mb-2">Create Your Profile</h1>
          <p className="text-muted-foreground">Join the largest community of verified profiles.</p>
        </motion.div>

        <Card className="border-border/50 shadow-xl bg-white/95 backdrop-blur">
          <CardContent className="p-8">
            {step < 3 && (
              <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 rounded-full" />
                <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
                
                {[1, 2].map((i) => (
                  <div 
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                      ${step >= i ? "bg-primary text-white" : "bg-muted text-muted-foreground"}
                    `}
                  >
                    {i}
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input {...register("name")} placeholder="Enter your name" />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <Select onValueChange={(val) => form.setValue("gender", val)} defaultValue={form.getValues("gender")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Age</label>
                        <Input type="number" {...register("age")} placeholder="25" />
                        {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Community</label>
                        <Input {...register("community")} placeholder="e.g. Brahmin, Punjabi" />
                        {errors.community && <p className="text-xs text-red-500">{errors.community.message}</p>}
                      </div>
                    </div>

                    <Button type="button" onClick={handleNext} className="w-full mt-4 bg-primary text-white hover:bg-primary/90">
                      Next Step
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input {...register("city")} placeholder="Current city" />
                      {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input {...register("phone")} placeholder="+91 9876543210" />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input {...register("email")} type="email" placeholder="you@example.com" />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3">
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={createProfile.isPending}
                        className="w-2/3 bg-primary text-white hover:bg-primary/90"
                      >
                        {createProfile.isPending ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting</>
                        ) : (
                          "Complete Registration"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                      <Check className="w-10 h-10" />
                    </div>
                    <p className="text-2xl font-bold text-primary">Registration Successful!</p>
                    <p className="text-muted-foreground">
                      Welcome to dulha-dulhan.com. We will review your profile and get back to you shortly.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">Redirecting to home...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

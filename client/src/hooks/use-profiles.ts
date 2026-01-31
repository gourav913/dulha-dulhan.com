import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertProfile, type Profile, errorSchemas } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Admin Login Hook
export function useAdminLogin() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (credentials: z.infer<typeof api.admin.login.input>) => {
      const res = await fetch(api.admin.login.path, {
        method: api.admin.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid username or password");
        throw new Error("Login failed");
      }
      return api.admin.login.responses[200].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Fetch Profiles (Admin)
export function useProfiles(filters?: { search?: string; gender?: string; status?: string }) {
  return useQuery({
    queryKey: [api.profiles.list.path, filters],
    queryFn: async () => {
      let url = api.profiles.list.path;
      if (filters) {
        const params = new URLSearchParams();
        if (filters.search) params.append("search", filters.search);
        if (filters.gender && filters.gender !== "all") params.append("gender", filters.gender);
        if (filters.status && filters.status !== "all") params.append("status", filters.status);
        url += `?${params.toString()}`;
      }

      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to fetch profiles");
      }
      return api.profiles.list.responses[200].parse(await res.json());
    },
  });
}

// Public Create Profile
export function useCreateProfile() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertProfile) => {
      const validated = api.profiles.create.input.parse(data);
      const res = await fetch(api.profiles.create.path, {
        method: api.profiles.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = errorSchemas.validation.parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to register profile");
      }
      return api.profiles.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Your profile has been submitted for review. We will contact you soon.",
        variant: "default", 
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Admin Update Profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<InsertProfile> & { status?: string, adminNotes?: string }) => {
      const url = buildUrl(api.profiles.update.path, { id });
      const res = await fetch(url, {
        method: api.profiles.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update profile");
      return api.profiles.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.profiles.list.path] });
      toast({ title: "Profile Updated", description: "Changes saved successfully." });
    },
    onError: (error) => {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    },
  });
}

// Admin Delete Profile
export function useDeleteProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.profiles.delete.path, { id });
      const res = await fetch(url, {
        method: api.profiles.delete.method,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete profile");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.profiles.list.path] });
      toast({ title: "Profile Deleted", description: "Record removed successfully." });
    },
    onError: (error) => {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
    },
  });
}

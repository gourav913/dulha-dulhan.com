import { useState } from "react";
import { useProfiles, useUpdateProfile, useDeleteProfile } from "@/hooks/use-profiles";
import { useLocation } from "wouter";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Trash2, Edit, LogOut, Filter } from "lucide-react";
import { PROFILE_STATUS, type Profile } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Queries
  const { data: profiles, isLoading } = useProfiles({ 
    search, 
    status: statusFilter,
    gender: genderFilter 
  });
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();

  // Handlers
  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;
    
    // Form logic normally here, but we'll just grab values from controlled inputs if we had them or refs
    // For simplicity, we assume state is updated.
    // However, we need a separate form state or use controlled inputs on the dialog.
    // Let's rely on the UpdateDialog component's internal state for cleaner code.
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      deleteProfile.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Contacted": return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      case "Interested": return "bg-green-100 text-green-700 hover:bg-green-100";
      case "Closed": return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      {/* Topbar */}
      <header className="bg-white border-b border-border sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold font-display text-primary">dulha-dulhan.com Admin</h1>
        <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
          <a href="/api/logout">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </a>
        </Button>
      </header>

      <main className="flex-1 container mx-auto p-6 max-w-7xl">
        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-border mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search by name, email, city..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {PROFILE_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Community</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : profiles?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No profiles found matching criteria.
                  </TableCell>
                </TableRow>
              ) : (
                profiles?.map((profile) => (
                  <TableRow key={profile.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{profile.name}</TableCell>
                    <TableCell>{profile.age} / {profile.gender}</TableCell>
                    <TableCell>{profile.city}</TableCell>
                    <TableCell>{profile.community}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex flex-col">
                        <span>{profile.phone}</span>
                        <span className="text-muted-foreground text-xs">{profile.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(profile.status)} shadow-none border-none`}>
                        {profile.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(profile)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(profile.id)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Edit Dialog */}
      {editingProfile && (
        <EditDialog 
          profile={editingProfile} 
          open={!!editingProfile} 
          onOpenChange={(open) => !open && setEditingProfile(null)}
          onSave={(updates) => {
            updateProfile.mutate({ id: editingProfile.id, ...updates });
            setEditingProfile(null);
          }}
        />
      )}
    </div>
  );
}

// Separate component to manage edit state cleanly
function EditDialog({ 
  profile, open, onOpenChange, onSave 
}: { 
  profile: Profile; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onSave: (updates: { status: string; adminNotes: string }) => void;
}) {
  const [status, setStatus] = useState(profile.status);
  const [notes, setNotes] = useState(profile.adminNotes || "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile: {profile.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROFILE_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Admin Notes</label>
            <Textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Internal notes about this candidate..."
              className="h-32"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onSave({ status, adminNotes: notes })}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

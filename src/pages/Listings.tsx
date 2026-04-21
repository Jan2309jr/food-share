import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";
import FoodCard from "@/components/FoodCard";
import { foodTypes, areas } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";
import { food } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

const Listings = () => {
  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("All");
  const [area, setArea] = useState("All Areas");
  const [urgentOnly, setUrgentOnly] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['food', { foodType, area, urgent: urgentOnly }],
    queryFn: async () => {
      const response = await food.getAll({ foodType, area, urgent: urgentOnly });
      return response.data;
    }
  });

  const claimMutation = useMutation({
    mutationFn: (id: string) => food.claim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food'] });
      toast({ title: "Food Claimed! 🎉", description: "You've claimed this listing. Check your dashboard for pickup details." });
    },
    onError: (error: any) => {
      toast({ 
        title: "Claim Failed", 
        description: error.response?.data?.error || "You must be logged in as a recipient to claim food.", 
        variant: "destructive" 
      });
    }
  });

  const filtered = listings.filter((l: any) => {
    if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.donorName?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-serif font-bold mb-3">Available Food Donations</h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl">Browse and claim fresh surplus food from local donors in Bangalore. Every meal saved is a life touched.</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white shadow-xl shadow-primary/5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by food or donor name..." 
                className="pl-10 h-12 bg-white border-none rounded-xl" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger className="w-full h-12 bg-white border-none rounded-xl shadow-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {foodTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger className="w-full h-12 bg-white border-none rounded-xl shadow-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {areas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="flex items-center justify-between gap-3 bg-white border-none rounded-xl px-4 h-12 shadow-sm">
                <Label htmlFor="urgent" className="text-sm font-medium cursor-pointer">Urgent only</Label>
                <Switch id="urgent" checked={urgentOnly} onCheckedChange={setUrgentOnly} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Fetching fresh listings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <div className="w-20 h-20 bg-muted mx-auto rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-serif font-semibold mb-2">No listings found</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">Try adjusting your search or filters to find more food near you.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <p className="text-sm font-medium text-muted-foreground">Showing {filtered.length} available donation{filtered.length !== 1 ? "s" : ""}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((listing: any) => (
                <FoodCard 
                  key={listing.id} 
                  listing={{
                    ...listing,
                    donor: listing.donorName // Adapt to component's expected prop
                  }} 
                  onClaim={() => claimMutation.mutate(listing.id)} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Forgot motion import
import { motion } from "framer-motion";

export default Listings;


import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Clock, CheckCircle, TrendingUp, Loader2 } from "lucide-react";
import { foodTypes } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";
import { food } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { motion } from "framer-motion";

const DonorDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("listings");

  const { data = [], isLoading } = useQuery({
    queryKey: ['my-listings'],
    queryFn: async () => {
      const response = await food.getMyListings();
      return Array.isArray(response.data) ? response.data : [];
    }
  });
  const myListings = Array.isArray(data) ? data : [];

  const createMutation = useMutation({
    mutationFn: (data: any) => food.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      queryClient.invalidateQueries({ queryKey: ['food'] });
      toast({ title: "Donation listed! 🎉", description: "Your food donation is now visible to recipients." });
      setTab("listings");
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to post", 
        description: error.response?.data?.error || "Something went wrong", 
        variant: "destructive" 
      });
    }
  });

  const [formData, setFormData] = useState({
    title: "",
    foodType: "",
    description: "",
    quantity: "",
    location: "",
    area: "",
    pickupTime: "",
    expiresAt: "",
    image: "",
    urgent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const stats = [
    { label: "Total Donations", value: myListings.length.toString(), icon: Package, color: "text-primary" },
    { label: "Active Listings", value: myListings.filter((l: any) => !l.claimed).length.toString(), icon: Clock, color: "text-warm" },
    { label: "Claimed", value: myListings.filter((l: any) => l.claimed).length.toString(), icon: CheckCircle, color: "text-success" },
    { label: "Impact", value: "High", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-serif font-bold text-primary">Donor Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Welcome back, {user?.name}. Track your contributions and save more food.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-muted/50 ${s.color}`}><s.icon className="w-6 h-6" /></div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-8">
          <TabsList className="bg-white/50 backdrop-blur-md p-1 rounded-xl shadow-sm border border-white">
            <TabsTrigger value="listings" className="rounded-lg px-6"><Package className="w-4 h-4 mr-2" /> My Listings</TabsTrigger>
            <TabsTrigger value="new" className="rounded-lg px-6"><Plus className="w-4 h-4 mr-2" /> Post New Donation</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
            ) : myListings.length === 0 ? (
              <Card className="text-center py-20 bg-white/50 border-dashed border-2">
                <p className="text-muted-foreground">You haven't posted any donations yet.</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myListings.map((l: any) => (
                  <Card key={l.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 flex flex-col sm:flex-row gap-6">
                      <img src={l.image || "https://images.unsplash.com/photo-1488459711635-de84efce8000?w=400"} alt={l.title} className="w-full sm:w-40 h-28 rounded-xl object-cover" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-serif font-bold text-primary">{l.title}</h3>
                          <Badge variant={l.claimed ? "secondary" : "default"} className="rounded-full px-3">
                            {l.claimed ? "Claimed" : "Active"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{l.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
                          <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {l.quantity}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {l.pickupTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="new">
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="font-serif text-2xl font-bold text-primary">List New Surplus Food</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Food Item Name</Label>
                      <Input 
                        placeholder="e.g. Fresh Biryani - 50 servings" 
                        required 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select onValueChange={(val) => setFormData({...formData, foodType: val})}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {foodTypes.filter(t => t !== "All").map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Describe the food, ingredients, preparation info..." 
                      rows={3} 
                      required 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input 
                        placeholder="e.g. 50 servings" 
                        required 
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Area (Bangalore)</Label>
                      <Input 
                        placeholder="e.g. Yelahanka" 
                        required 
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Pickup Location (Full Address)</Label>
                    <Input 
                      placeholder="Detailed address for pickup" 
                      required 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Pickup Time Window</Label>
                      <Input 
                        placeholder="e.g. Today, 3-5 PM" 
                        required 
                        value={formData.pickupTime}
                        onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Date/Time</Label>
                      <Input 
                        type="datetime-local" 
                        required 
                        value={formData.expiresAt}
                        onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Food Photo URL</Label>
                    <Input 
                      placeholder="https://images.unsplash.com/..." 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <input 
                      type="checkbox" 
                      id="urgent" 
                      className="w-5 h-5 accent-red-500"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({...formData, urgent: e.target.checked})}
                    />
                    <Label htmlFor="urgent" className="text-red-700 font-bold">Mark as Urgent (Expires soon)</Label>
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Posting..." : "Publish Donation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DonorDashboard;


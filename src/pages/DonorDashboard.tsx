import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { sampleListings, foodTypes } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

const myListings = sampleListings.slice(0, 4).map((l, i) => ({
  ...l,
  donor: "Your Restaurant",
  claimed: i > 1,
}));

const DonorDashboard = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("listings");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Donation listed! 🎉", description: "Your food donation is now visible to recipients." });
    setTab("listings");
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold">Donor Dashboard</h1>
          <p className="text-muted-foreground">Manage your food donations and track your impact</p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Donations", value: "24", icon: Package, color: "text-primary" },
            { label: "Active Listings", value: "2", icon: Clock, color: "text-warm" },
            { label: "Claimed", value: "22", icon: CheckCircle, color: "text-success" },
            { label: "Meals Provided", value: "1,200", icon: TrendingUp, color: "text-primary" },
          ].map((s, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${s.color}`}><s.icon className="w-5 h-5" /></div>
                <div>
                  <p className="text-2xl font-serif font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="listings"><Package className="w-4 h-4 mr-1" /> My Listings</TabsTrigger>
            <TabsTrigger value="new"><Plus className="w-4 h-4 mr-1" /> New Donation</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            <div className="space-y-4">
              {myListings.map((l) => (
                <Card key={l.id}>
                  <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <img src={l.image} alt={l.title} className="w-full sm:w-32 h-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-serif font-semibold">{l.title}</h3>
                        <Badge variant={l.claimed ? "secondary" : "default"}>
                          {l.claimed ? "Claimed" : "Active"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{l.quantity} · {l.pickupTime}</p>
                      <p className="text-sm text-muted-foreground">{l.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Post a New Food Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Food Title</Label><Input placeholder="e.g. Fresh Biryani - 50 servings" required /></div>
                    <div>
                      <Label>Food Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {foodTypes.filter(t => t !== "All").map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div><Label>Description</Label><Textarea placeholder="Describe the food, preparation details..." rows={3} required /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Quantity</Label><Input placeholder="e.g. 50 servings" required /></div>
                    <div><Label>Pickup Location</Label><Input placeholder="Full address" required /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Pickup Time</Label><Input placeholder="e.g. Today, 3:00 PM - 5:00 PM" required /></div>
                    <div><Label>Expires At</Label><Input type="datetime-local" required /></div>
                  </div>
                  <div><Label>Photo URL (optional)</Label><Input placeholder="https://..." /></div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Publish Donation
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

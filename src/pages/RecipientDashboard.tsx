import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Clock, CheckCircle, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import FoodCard from "@/components/FoodCard";
import { sampleListings } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

const claimedItems = sampleListings.slice(0, 3).map((l) => ({ ...l, claimed: true }));

const RecipientDashboard = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const available = sampleListings.filter(
    (l) => !l.claimed && (!search || l.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleClaim = (id: string) => {
    toast({ title: "Food Claimed! 🎉", description: "Contact the donor for pickup details." });
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold">Recipient Dashboard</h1>
          <p className="text-muted-foreground">Find and claim available food donations near you</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 -mt-2">
          {[
            { label: "Claims Made", value: "12", icon: Package },
            { label: "Meals Received", value: "340", icon: CheckCircle },
            { label: "Nearby Listings", value: available.length.toString(), icon: MapPin },
          ].map((s, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted text-primary"><s.icon className="w-5 h-5" /></div>
                <div>
                  <p className="text-2xl font-serif font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="browse">
          <TabsList>
            <TabsTrigger value="browse"><Search className="w-4 h-4 mr-1" /> Browse Food</TabsTrigger>
            <TabsTrigger value="history"><Clock className="w-4 h-4 mr-1" /> Claim History</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search available food..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {available.map((l) => (
                <FoodCard key={l.id} listing={l} onClaim={handleClaim} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6 space-y-4">
            {claimedItems.map((l) => (
              <Card key={l.id}>
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                  <img src={l.image} alt={l.title} className="w-full sm:w-32 h-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif font-semibold">{l.title}</h3>
                      <Badge variant="secondary">Claimed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{l.donor} · {l.quantity}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {l.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecipientDashboard;

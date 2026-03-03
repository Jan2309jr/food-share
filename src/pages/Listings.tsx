import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import FoodCard from "@/components/FoodCard";
import { sampleListings, foodTypes, areas } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

const Listings = () => {
  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("All");
  const [area, setArea] = useState("All Areas");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const { toast } = useToast();

  const filtered = sampleListings.filter((l) => {
    if (l.claimed) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.donor.toLowerCase().includes(search.toLowerCase())) return false;
    if (foodType !== "All" && l.foodType !== foodType) return false;
    if (area !== "All Areas" && l.area !== area) return false;
    if (urgentOnly && !l.urgent) return false;
    return true;
  });

  const handleClaim = (id: string) => {
    toast({ title: "Food Claimed! 🎉", description: "You've claimed this listing. Check your dashboard for pickup details." });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-2">Available Food Donations</h1>
          <p className="text-muted-foreground mb-8">Browse and claim fresh surplus food in Bangalore</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by food or donor name..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={foodType} onValueChange={setFoodType}>
              <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                {foodTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                {areas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <Switch id="urgent" checked={urgentOnly} onCheckedChange={setUrgentOnly} />
              <Label htmlFor="urgent" className="text-sm whitespace-nowrap">Urgent only</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} listing{filtered.length !== 1 ? "s" : ""} available</p>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-serif font-semibold mb-2">No listings found</p>
            <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((listing) => (
              <FoodCard key={listing.id} listing={listing} onClaim={handleClaim} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;

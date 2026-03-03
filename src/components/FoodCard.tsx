import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users, AlertTriangle } from "lucide-react";
import type { FoodListing } from "@/data/sampleData";

interface FoodCardProps {
  listing: FoodListing;
  onClaim?: (id: string) => void;
}

const FoodCard = ({ listing, onClaim }: FoodCardProps) => (
  <Card className="card-hover overflow-hidden group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute top-3 left-3 flex gap-2">
        <Badge variant="secondary" className="bg-card/90 text-card-foreground backdrop-blur-sm text-xs">
          {listing.foodType}
        </Badge>
        {listing.urgent && (
          <Badge className="bg-destructive text-destructive-foreground text-xs flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Urgent
          </Badge>
        )}
      </div>
      {listing.claimed && (
        <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
          <span className="text-background font-bold text-lg font-serif">Claimed</span>
        </div>
      )}
    </div>
    <CardContent className="p-4 space-y-3">
      <h3 className="font-serif font-semibold text-lg leading-tight">{listing.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-primary" />{listing.donor} ({listing.donorType})</div>
        <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" />{listing.location}</div>
        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" />{listing.pickupTime}</div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-medium text-muted-foreground">{listing.quantity}</span>
        {!listing.claimed && (
          <Button size="sm" onClick={() => onClaim?.(listing.id)}>
            Claim Food
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default FoodCard;

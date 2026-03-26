import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Heart, Utensils, Users, Leaf, ArrowRight, Quote } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import FoodCard from "@/components/FoodCard";
import { sampleListings , stats } from "@/data/sampleData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const statItems = [
  { label: "Meals Served", value: stats.mealsServed.toLocaleString(), icon: Utensils },
  { label: "Food Saved (kg)", value: stats.foodSavedKg.toLocaleString(), icon: Leaf },
  { label: "Active Donors", value: stats.activeDonors.toString(), icon: Heart },
  { label: "Cities Covered", value: stats.citiesCovered.toString(), icon: Users },
];

const Index = () => {
  const featured = sampleListings.filter((l) => !l.claimed).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Community sharing food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
              🍽️ From Plate to Plate — No Food Wasted
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6">
              Donate Excess Food,{" "}
              <span className="underline decoration-warm decoration-4 underline-offset-4">Feed the Hungry</span>
            </h1>
            <p className="text-lg text-primary-foreground/85 mb-8 max-w-lg">
              Connect restaurants, events, and generous donors with orphanages, charities, and families in need across Bangalore.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/auth?mode=register&role=donor">
                <Button size="lg" variant="secondary" className="font-semibold text-base">
                  Donate Food <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/listings">
                <Button size="lg" variant="outline" className="font-semibold text-base bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">
                  Find Food Near You
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

     
      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground mb-12 max-w-md mx-auto">Three simple steps to save food and feed the hungry</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "List Your Surplus", desc: "Restaurants & donors post available food with pickup details." },
              { step: "2", title: "Claim & Collect", desc: "Recipients browse nearby listings and claim what they need." },
              { step: "3", title: "Share the Joy", desc: "Food reaches those in need. No waste, just smiles." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-serif font-bold">
                  {item.step}
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Donations */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold">Available Now</h2>
              <p className="text-muted-foreground mt-1">Fresh food waiting to be claimed</p>
            </div>
            <Link to="/listings">
              <Button variant="outline">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((listing) => (
              <FoodCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Whether you have food to share or need a meal — FoodShare connects you with your community.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/auth?mode=register&role=donor">
              <Button size="lg" variant="secondary" className="font-semibold">
                I Want to Donate
              </Button>
            </Link>
            <Link to="/auth?mode=register&role=recipient">
              <Button size="lg" variant="outline" className="font-semibold text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 hover:bg-primary-foreground/20">
                I Need Food
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

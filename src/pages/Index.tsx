import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Heart, Utensils, Users, Leaf, ArrowRight, Quote, Loader2 } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import FoodCard from "@/components/FoodCard";
import { stats } from "@/data/sampleData";
import { useQuery } from "@tanstack/react-query";
import { food } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['featured-food'],
    queryFn: async () => {
      const response = await food.getAll({ urgent: true });
      return Array.isArray(response.data) ? response.data : [];
    }
  });
  const listings = Array.isArray(data) ? data : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Community sharing food" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-bold mb-8 backdrop-blur-md border border-white/10"
            >
              <span className="mr-2">🍽️</span> From Plate to Plate — No Food Wasted
            </motion.span>
            <h1 className="text-5xl sm:text-7xl font-serif font-black text-white leading-[1.1] mb-8">
              Donate Excess Food,{" "}
              <span className="text-primary italic underline decoration-white/30 decoration-8 underline-offset-8">Feed the Hungry</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed font-medium">
              Join Bangalore's most impactful community. Connect surplus food from restaurants and events to those who need it most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth?mode=register&role=donor">
                <Button size="lg" className="h-14 px-10 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                  Donate Food <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/listings">
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl font-bold text-lg bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md">
                  Find Food
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats - Premium Glass Bar */}
      <section className="relative -mt-16 z-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-black/5 p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Meals Served", value: "15.4k+", icon: Utensils, color: "text-orange-500" },
              { label: "Food Saved", value: "8.7 Tons", icon: Leaf, color: "text-green-500" },
              { label: "Active Donors", value: "142", icon: Heart, color: "text-red-500" },
              { label: "Locations", value: "Bangalore", icon: Users, color: "text-blue-500" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-2 border-r last:border-r-0 border-muted/50"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-muted/50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-black">{stat.value}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-serif font-black mb-6">Simple Steps to Save Lives</h2>
            <p className="text-muted-foreground text-xl mb-20 max-w-2xl mx-auto">Our platform bridges the gap between surplus and scarcity in just three steps.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "List Your Surplus", desc: "Snap a photo, add details, and set a pickup time. It only takes 60 seconds." },
              { step: "02", title: "Claim & Collect", desc: "Charities and families browse nearby listings and claim what they need instantly." },
              { step: "03", title: "Real-Time Impact", desc: "Track your contribution and see the immediate difference you're making." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-[120px] font-black leading-none text-muted/20 absolute -top-16 left-1/2 -translate-x-1/2 transition-colors group-hover:text-primary/10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground relative z-10 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Donations */}
      <section className="py-32 bg-cream/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-serif font-black">Urgent Food Needs</h2>
              <p className="text-muted-foreground text-lg font-medium">Fresh food currently waiting for pickup in your city.</p>
            </div>
            <Link to="/listings">
              <Button variant="ghost" className="text-primary font-bold text-lg hover:bg-primary/5">
                Explore All <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="font-bold text-muted-foreground">Loading community updates...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-muted">
              <p className="text-xl font-bold text-muted-foreground">No urgent listings right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {listings.map((listing: any) => (
                <FoodCard 
                  key={listing.id} 
                  listing={{
                    ...listing,
                    donor: listing.donorName
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-serif font-black mb-8 leading-tight">
                Be the Hero Your <br /> Community Needs.
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto font-medium">
                Whether you're a restaurant with surplus or a citizen who wants to help, there's a place for you in FoodShare.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/auth?mode=register&role=donor">
                  <Button size="lg" variant="secondary" className="h-16 px-12 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform">
                    Start Donating Today
                  </Button>
                </Link>
                <Link to="/auth?mode=register&role=recipient">
                  <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl font-black text-xl bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md">
                    Request Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;


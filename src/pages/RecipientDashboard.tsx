import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, CheckCircle, Package, Loader2 } from "lucide-react";
import { food } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { motion } from "framer-motion";

const RecipientDashboard = () => {
  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ['my-claims'],
    queryFn: async () => {
      const response = await food.getMyClaims();
      return Array.isArray(response.data) ? response.data : [];
    }
  });
  const claims = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-cream pb-20 font-sans">
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-serif font-black text-primary leading-tight">Recipient Dashboard</h1>
            <p className="text-muted-foreground mt-4 text-xl font-medium max-w-2xl">Hello, {user?.name || 'Recpient'}. Track your claimed meals and find pickup details to help reduce food waste.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-shadow bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner"><Package className="w-8 h-8" /></div>
                <div><p className="text-3xl font-black text-primary">{claims.length}</p><p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Total Claims</p></div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-none shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-shadow bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 shadow-inner"><Clock className="w-8 h-8" /></div>
                <div><p className="text-3xl font-black text-blue-600">Pending</p><p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Status</p></div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-none shadow-xl shadow-green-500/5 hover:shadow-green-500/10 transition-shadow bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-green-50 text-green-600 shadow-inner"><CheckCircle className="w-8 h-8" /></div>
                <div><p className="text-3xl font-black text-green-600">100%</p><p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Success Rate</p></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif font-black text-primary flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transform rotate-3">
                <Package className="w-5 h-5 text-white" />
              </div>
              My Collections
            </h2>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin w-10 h-10 text-primary" />
              <p className="font-bold text-muted-foreground">Retrieving your meals...</p>
            </div>
          ) : claims.length === 0 ? (
            <div className="text-center py-32 bg-white/50 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-muted/50">
              <div className="w-20 h-20 bg-muted/30 mx-auto rounded-full flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-serif font-black text-muted-foreground mb-2">No active claims found</h2>
              <p className="text-muted-foreground max-w-sm mx-auto font-medium">Browse available food listings and start making a difference today!</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {claims.map((claim: any, i: number) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden border-none shadow-xl hover:shadow-primary/10 transition-all rounded-[2rem] bg-white group">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-80 h-56 md:h-auto overflow-hidden">
                          <img 
                            src={claim.image || "https://images.unsplash.com/photo-1488459711635-de84efce8000?w=600"} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            alt={claim.title} 
                          />
                        </div>
                        <div className="p-8 flex-1 space-y-6 flex flex-col justify-center">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="space-y-1">
                              <h3 className="text-2xl font-serif font-black text-primary leading-tight">{claim.title}</h3>
                              <p className="text-sm font-bold text-muted-foreground">Donated by <span className="text-primary underline underline-offset-4 decoration-primary/30">{claim.donorName || 'Community Member'}</span></p>
                            </div>
                            <Badge className="bg-green-500 text-white rounded-full px-6 py-1.5 font-black shadow-lg shadow-green-500/20 border-none">Ready for Pickup</Badge>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-8 border-t border-muted/50 pt-6">
                            <div className="space-y-3">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                                  <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Location</p>
                                  <p className="font-bold text-foreground">{claim.location}, {claim.area}</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                  <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Available Time</p>
                                  <p className="font-bold text-foreground">{claim.pickupTime}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default RecipientDashboard;

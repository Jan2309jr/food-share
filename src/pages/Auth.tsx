import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const defaultTab = params.get("mode") === "register" ? "register" : "login";
  const defaultRole = params.get("role") || "donor";
  
  const [role, setRole] = useState(defaultRole);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", phone: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await auth.login(loginData);
      login(response.data.user, response.data.token);
      toast({ title: "Welcome back! 👋", description: "Successfully logged in." });
    } catch (error: any) {
      toast({ 
        title: "Login Failed", 
        description: error.response?.data?.error || "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await auth.register({ ...registerData, role });
      login(response.data.user, response.data.token);
      toast({ title: "Account created! 🎉", description: "Welcome to FoodShare!" });
    } catch (error: any) {
      toast({ 
        title: "Registration Failed", 
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-cream">
      <Card className="w-full max-w-md shadow-xl border-none bg-white/80 backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center shadow-lg transform rotate-3">
            <Heart className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
          </div>
          <CardTitle className="font-serif text-3xl font-bold text-primary">FoodShare</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">From Plate to Plate — No Food Wasted</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <LogIn className="w-4 h-4 mr-2" /> Log In
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <UserPlus className="w-4 h-4 mr-2" /> Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@email.com" 
                    required 
                    className="rounded-lg"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="rounded-lg"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input 
                    id="reg-name" 
                    placeholder="John Doe" 
                    required 
                    className="rounded-lg"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="you@email.com" 
                      required 
                      className="rounded-lg"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="reg-phone">Phone</Label>
                    <Input 
                      id="reg-phone" 
                      type="tel" 
                      placeholder="+91..." 
                      className="rounded-lg"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="rounded-lg"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">I want to</Label>
                  <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">
                    <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-lg flex-1 border border-border/50">
                      <RadioGroupItem value="donor" id="reg-donor" />
                      <Label htmlFor="reg-donor" className="cursor-pointer">Donate Food</Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-lg flex-1 border border-border/50">
                      <RadioGroupItem value="recipient" id="reg-recipient" />
                      <Label htmlFor="reg-recipient" className="cursor-pointer">Receive Food</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;


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

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const defaultTab = params.get("mode") === "register" ? "register" : "login";
  const defaultRole = params.get("role") || "donor";
  const [role, setRole] = useState(defaultRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Welcome back! 👋", description: "Redirecting to your dashboard..." });
    setTimeout(() => navigate(role === "donor" ? "/donor" : "/recipient"), 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Account created! 🎉", description: "Welcome to FoodShare!" });
    setTimeout(() => navigate(role === "donor" ? "/donor" : "/recipient"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-cream">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <CardTitle className="font-serif text-2xl">FoodShare</CardTitle>
          <CardDescription>From Plate to Plate — No Food Wasted</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login"><LogIn className="w-4 h-4 mr-1" /> Log In</TabsTrigger>
              <TabsTrigger value="register"><UserPlus className="w-4 h-4 mr-1" /> Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div><Label>Email</Label><Input type="email" placeholder="you@email.com" required /></div>
                <div><Label>Password</Label><Input type="password" placeholder="••••••••" required /></div>
                <div>
                  <Label className="mb-2 block">I am a</Label>
                  <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="donor" id="login-donor" />
                      <Label htmlFor="login-donor">Donor</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="recipient" id="login-recipient" />
                      <Label htmlFor="login-recipient">Recipient</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="admin" id="login-admin" />
                      <Label htmlFor="login-admin">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full">Log In</Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div><Label>Full Name</Label><Input placeholder="Your full name" required /></div>
                <div><Label>Email</Label><Input type="email" placeholder="you@email.com" required /></div>
                <div><Label>Phone</Label><Input type="tel" placeholder="+91 98765 43210" required /></div>
                <div><Label>Password</Label><Input type="password" placeholder="••••••••" required /></div>
                <div>
                  <Label className="mb-2 block">I want to</Label>
                  <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="donor" id="reg-donor" />
                      <Label htmlFor="reg-donor">Donate Food</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="recipient" id="reg-recipient" />
                      <Label htmlFor="reg-recipient">Receive Food</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

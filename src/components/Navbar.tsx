import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Heart, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/listings", label: "Food Listings" },
  ];

  if (user) {
    if (user.role === 'donor') {
      navLinks.push({ to: "/donor", label: "Donor Dashboard" });
    } else if (user.role === 'recipient') {
      navLinks.push({ to: "/recipient", label: "Recipient Dashboard" });
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
            <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-serif text-2xl font-bold text-primary leading-tight">FoodShare</span>
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Plate to Plate</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 bg-muted/30 p-1.5 rounded-2xl border border-muted/50">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === link.to
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-primary/20 p-0.5">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user.name?.[0] || user.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={logout} className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost" className="font-bold text-primary hover:bg-primary/5 rounded-xl">Log In</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button className="rounded-xl px-6 font-bold shadow-lg shadow-primary/20">Join Now</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="rounded-xl">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] border-none bg-cream rounded-l-3xl shadow-2xl">
            <div className="flex flex-col gap-6 mt-12">
              {user && (
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl mb-4 border border-white">
                  <Avatar className="h-14 w-14 border-4 border-primary/10 shadow-sm">
                    <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">{user.name?.[0] || user.email?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold">{user.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-between ${
                      location.pathname === link.to
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pb-4 pt-8 border-t border-muted">
                {user ? (
                  <Button onClick={logout} variant="destructive" className="w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2">
                    <LogOut className="w-5 h-5" /> Log Out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-2">Log In</Button>
                    </Link>
                    <Link to="/auth?mode=register" onClick={() => setOpen(false)}>
                      <Button className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-primary/30">Join Now</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;


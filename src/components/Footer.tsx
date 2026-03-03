import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold">FoodShare</span>
          </div>
          <p className="text-sm opacity-70 mb-4">From Plate to Plate — No Food Wasted. Connecting surplus food with those who need it most.</p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/listings" className="hover:opacity-100 transition-opacity">Food Listings</Link>
            <Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link>
            <Link to="/auth" className="hover:opacity-100 transition-opacity">Sign Up</Link>
          </div>
        </div>

        <div>
          <h4 className="font-serif font-semibold mb-4">For Partners</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/donor" className="hover:opacity-100 transition-opacity">Donor Dashboard</Link>
            <Link to="/recipient" className="hover:opacity-100 transition-opacity">Recipient Dashboard</Link>
            <a href="#" className="hover:opacity-100 transition-opacity">Volunteer</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
          </div>
        </div>

        <div>
          <h4 className="font-serif font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> Yelahanka, Bangalore 560064</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> +91 98765 43210</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> hello@foodshare.org</div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 mt-8 pt-6 text-center text-sm opacity-50">
        © 2026 FoodShare. Built with ❤️ for a hunger-free world.
      </div>
    </div>
  </footer>
);

export default Footer;

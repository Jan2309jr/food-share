import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Target, Eye, Users, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  const { toast } = useToast();

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent! 📬", description: "We'll get back to you within 24 hours." });
  };

  return (
    <div className="min-h-screen">
      {/* Mission */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h1 className="text-4xl font-serif font-bold mb-4">Our Mission</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FoodShare was born from a simple belief: no food should go to waste while people go hungry. We connect surplus food from restaurants, events, and individuals with orphanages, shelters, and families in need across Bangalore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Compassion First", desc: "Every action we take is driven by empathy for those facing food insecurity." },
              { icon: Target, title: "Zero Waste Goal", desc: "We aim to redirect every edible surplus to someone who needs it." },
              { icon: Eye, title: "Full Transparency", desc: "Track every donation from listing to delivery. Complete visibility." },
            ].map((v, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <v.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-10">Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Arjun Reddy", role: "Founder & CEO", initials: "AR" },
              { name: "Sneha Patil", role: "Head of Operations", initials: "SP" },
              { name: "Karthik Rao", role: "Tech Lead", initials: "KR" },
              { name: "Divya Nair", role: "Community Manager", initials: "DN" },
            ].map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-serif font-bold text-lg">{m.initials}</span>
                </div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-serif font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {[
              { q: "How does FoodShare work?", a: "Donors list surplus food with pickup details. Recipients browse, claim, and collect. It's that simple!" },
              { q: "Is the food safe to eat?", a: "All donors are verified and food is listed with expiry information. We recommend consuming within the stated timeframe." },
              { q: "How can I volunteer?", a: "Visit our sign-up page and select 'Volunteer'. You can help with food pickup, delivery, or community outreach." },
              { q: "Is FoodShare free to use?", a: "Yes, FoodShare is completely free for both donors and recipients. Our mission is to reduce food waste, not make a profit." },
              { q: "Which areas do you cover?", a: "We currently operate in the Yelahanka and North Bangalore region, with plans to expand across the city." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-lg">
          <h2 className="text-3xl font-serif font-bold text-center mb-2">Get In Touch</h2>
          <p className="text-muted-foreground text-center mb-8">Have questions? We'd love to hear from you.</p>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleContact} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Name</Label><Input placeholder="Your name" required /></div>
                  <div><Label>Email</Label><Input type="email" placeholder="you@email.com" required /></div>
                </div>
                <div><Label>Subject</Label><Input placeholder="How can we help?" required /></div>
                <div><Label>Message</Label><Textarea placeholder="Tell us more..." rows={4} required /></div>
                <Button type="submit" className="w-full">
                  <Mail className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;

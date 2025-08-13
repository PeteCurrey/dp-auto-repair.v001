import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const services = [
    "General Repairs",
    "Diagnostics", 
    "Routine Servicing",
    "Auto Electrical Services",
    "Performance Tuning",
    "Collision Repair"
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Client Login", href: "/auth" },
    { name: "MOT Testing", href: "/mot" },
    { name: "Fleet Support", href: "/fleet-support" }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-bold text-lg">DP Automotive</h3>
              <p className="text-sm opacity-80">Repair & Diagnostics</p>
            </div>
            <p className="text-sm opacity-80 mb-6">
              Professional automotive service you can trust. Serving our community 
              with honest, reliable repairs and maintenance since 2010.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="border-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary" asChild>
                <a href="https://www.facebook.com/dpautorepairanddiagnostics1/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="border-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary" asChild>
                <a href="https://www.instagram.com/dpautorepairdiagnostics" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/general-repairs"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                >
                  General Repairs
                </Link>
              </li>
              <li>
                <Link 
                  to="/diagnostics"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Diagnostics
                </Link>
              </li>
              <li>
                <Link 
                  to="/routine-servicing"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Routine Servicing
                </Link>
              </li>
              <li>
                <Link 
                  to="/electrical-services"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Auto Electrical Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/performance-tuning"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Performance Tuning
                </Link>
              </li>
              <li>
                <Link 
                  to="/collision-repair"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Collision Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Unit 5 Vanguard Trading Estate</p>
                  <p className="text-sm opacity-80">Chesterfield S40 2TZ</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+441246233483" className="text-sm hover:text-primary transition-colors">
                  (01246) 233483
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:hello@dpautorepair.co.uk" className="text-sm hover:text-primary transition-colors">
                  hello@dpautorepair.co.uk
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
                  <p className="opacity-80">Closed Sat & Sun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-sm opacity-80">
              © 2025 DP Automotive Repair & Diagnostics. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <div className="flex gap-6">
                <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm opacity-80 hover:opacity-100 transition-colors">
                  Terms of Service
                </Link>
              </div>
              <p className="text-xs opacity-60 flex items-center gap-2">
                <img src="/lovable-uploads/a40ce8a0-f5e2-429f-9811-0318072bfe29.png" alt="Peter A Currey Signature" className="h-6 w-auto transform rotate-[-1deg]" /> <span className="font-montserrat font-extralight">Signature Build by</span> <a href="https://avorria.com" target="_blank" rel="noopener noreferrer" className="font-montserrat font-extralight tracking-wider hover:text-primary transition-colors">AVORRIA</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
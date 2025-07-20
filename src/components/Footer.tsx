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
    "Preventive Maintenance",
    "Electrical Services",
    "Performance Tuning",
    "Collision Repair"
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Book Service", href: "/book" },
    { name: "Emergency Service", href: "/emergency" },
    { name: "Reviews", href: "/reviews" }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">DP</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">DP Automotive</h3>
                <p className="text-sm opacity-80">Repair & Diagnostics</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-6">
              Professional automotive service you can trust. Serving our community 
              with honest, reliable repairs and maintenance since 1998.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
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
                  <p className="text-sm">123 Main Street</p>
                  <p className="text-sm opacity-80">Your City, ST 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+01246233483" className="text-sm hover:text-primary transition-colors">
                  (01246) 233483
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@dpautomotive.com" className="text-sm hover:text-primary transition-colors">
                  info@dpautomotive.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p className="opacity-80">Sat: 8:00 AM - 4:00 PM</p>
                  <p className="opacity-80">Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80">
              © 2024 DP Automotive Repair & Diagnostics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm opacity-80 hover:opacity-100 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Clock, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Tuning", href: "/tuning" },
    { name: "MOT", href: "/mot" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceItems = [
    { name: "All Services", href: "/services" },
    { name: "Routine Servicing", href: "/routine-servicing" },
    { name: "Air Conditioning Regas", href: "/air-conditioning" },
    { name: "Tyre Installation", href: "/tyre-installation" },
    { name: "Recovery & Breakdown", href: "/recovery-breakdown" },
    { name: "DPF", href: "/dpf" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isServiceActive = () => serviceItems.some(item => location.pathname === item.href);

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 9AM-5PM | Closed Sat & Sun</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+01246233483" className="hover:text-primary transition-colors">
                (01246) 233483
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/c3927aa1-9371-4ab3-9c52-b465d6ea5ed5.png" 
              alt="DP Auto Repair & Diagnostics Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`text-sm font-medium transition-colors hover:text-primary ${
                    isServiceActive() ? "text-primary" : "text-foreground"
                  }`}>
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {serviceItems.map((item) => (
                        <NavigationMenuLink key={item.name} asChild>
                          <Link
                            to={item.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive(item.href) ? "bg-accent text-accent-foreground" : ""
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="gradient-primary text-primary-foreground shadow-elegant">
              Book Service
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Services</div>
                <div className="flex flex-col gap-2 pl-4">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm transition-colors hover:text-primary ${
                        isActive(item.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="gradient-primary text-primary-foreground w-fit">
                Book Service
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
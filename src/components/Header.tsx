import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Clock, ChevronDown, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "MOT", href: "/mot" },
    { name: "Fleet Support", href: "/fleet-support" },
  ];

  const tuningItems = [
    { name: "ECU Remapping", href: "/tuning/ecu-remapping" },
    { name: "Exhaust Fabrication", href: "/tuning/exhaust-fabrication" },
    { name: "Performance Parts Installation", href: "/tuning/performance-parts" },
  ];

  const serviceItems = [
    { name: "Routine Servicing", href: "/routine-servicing" },
    { name: "Air Conditioning Regas", href: "/air-conditioning" },
    { name: "Tyre Installation", href: "/tyre-installation" },
    { name: "DPF", href: "/dpf" },
    { name: "Clutch Replacement", href: "/clutch-replacement" },
    { name: "Timing Chain & Belt", href: "/timing-chain-belt" },
    { name: "Brake Service", href: "/brake-service" },
    { name: "Suspension Repairs", href: "/suspension-repairs" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isServiceActive = () => serviceItems.some(item => location.pathname === item.href);

  const handleBookService = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-transparent">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0 text-white" />
              <span className="text-center sm:text-left text-white">Mon-Fri: 9AM-5PM | Closed Sat & Sun</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0 text-white" />
              <a href="tel:+441246233483" className="hover:text-primary transition-colors text-white">
                (01246) 233483
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/c3927aa1-9371-4ab3-9c52-b465d6ea5ed5.png" 
              alt="DP Auto Repair & Diagnostics Logo" 
              className="h-10 sm:h-12 w-auto max-w-[200px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={() => navigate('/services')}
                    className={`text-sm font-medium transition-colors hover:text-primary bg-transparent ${
                      isServiceActive() ? "text-primary" : "text-white"
                    }`}
                  >
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
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={() => navigate('/tuning')}
                    className={`text-sm font-medium transition-colors hover:text-primary bg-transparent ${
                      isActive("/tuning") ? "text-primary" : "text-white"
                    }`}
                  >
                    Tuning
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[300px] gap-3 p-4">
                      {tuningItems.map((item) => (
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
                  isActive(item.href) ? "text-primary" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  asChild
                  className="gradient-primary text-primary-foreground shadow-elegant"
                >
                  <Link to="/contact">
                    Book Service
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Link to="/auth">
                    Client Login
                  </Link>
                </Button>
                <Button 
                  asChild
                  className="gradient-primary text-primary-foreground shadow-elegant"
                >
                  <Link to="/contact">
                    Book Service
                  </Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col gap-4">
              <div>
                <div className="text-sm font-medium text-white mb-2">Services</div>
                <div className="flex flex-col gap-2 pl-4">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm transition-colors hover:text-primary ${
                        isActive(item.href) ? "text-primary" : "text-white/80"
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
                    isActive(item.href) ? "text-primary" : "text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex flex-col gap-4">
                  <Button 
                    asChild
                    variant="outline" 
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-fit"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/dashboard">
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    className="gradient-primary text-primary-foreground w-fit"
                  >
                    <Link to="/contact">
                      Book Service
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Button 
                    asChild
                    variant="outline" 
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-fit"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/auth">
                      Client Login
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    className="gradient-primary text-primary-foreground w-fit"
                  >
                    <Link to="/contact">
                      Book Service
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
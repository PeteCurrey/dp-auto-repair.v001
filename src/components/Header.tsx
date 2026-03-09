import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Clock, ChevronDown, Wrench, Gauge, Car, FileText, Snowflake, CircleDot, Settings, Disc3, Flame, Cog, Package } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [tuningOpen, setTuningOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>
        <div className="bg-transparent">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 flex-shrink-0 text-white" />
                <span className="text-center sm:text-left text-white font-thin">Mon-Fri: 9AM-5PM | Closed Sat & Sun</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 flex-shrink-0 text-white" />
                <a href="tel:+441246233483" className="hover:text-primary transition-colors text-white font-thin">
                  (01246) 233483
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border-none ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-[0_1px_3px_hsl(0_0%_0%/0.1)]' 
          : 'bg-white/40 backdrop-blur-sm'
      }`} style={!scrolled ? { backgroundColor: 'rgba(255, 255, 255, 0.4)' } : undefined}>
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/c3927aa1-9371-4ab3-9c52-b465d6ea5ed5.png" 
              alt="DP Auto Repair & Diagnostics Logo" 
              className={`w-auto max-w-[200px] object-contain transition-all duration-500 ${scrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-14'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={() => navigate('/services')}
                    className={`text-sm font-extralight transition-colors hover:text-primary bg-transparent ${
                      isServiceActive() ? "text-primary" : "text-foreground"
                    }`}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-1 p-4 bg-popover text-popover-foreground">
                      {serviceItems.map((item) => (
                        <NavigationMenuLink key={item.name} asChild>
                          <Link
                            to={item.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive(item.href) ? "bg-accent text-accent-foreground" : "text-popover-foreground"
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
                    className={`text-sm font-extralight transition-colors hover:text-primary bg-transparent ${
                      isActive("/tuning") ? "text-primary" : "text-foreground"
                    }`}
                  >
                    Tuning
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[300px] gap-1 p-4 bg-popover text-popover-foreground">
                      {tuningItems.map((item) => (
                        <NavigationMenuLink key={item.name} asChild>
                          <Link
                            to={item.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive(item.href) ? "bg-accent text-accent-foreground" : "text-popover-foreground"
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
                className={`text-sm font-extralight transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-white/10 text-black border-red-500 hover:bg-white/20 text-sm font-extralight"
                >
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  asChild
                  className="gradient-primary text-black shadow-elegant text-sm font-extralight"
                >
                  <Link to="/book">
                    Book Now
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-white/10 text-black border-red-500 hover:bg-white/20 text-sm font-extralight"
                >
                  <Link to="/auth">
                    Client Login
                  </Link>
                </Button>
                <Button 
                  asChild
                  className="gradient-primary text-black shadow-elegant text-sm font-extralight"
                >
                  <Link to="/book">
                    Book Now
                  </Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:bg-black/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
           </div>
        </div>
      </div>

      {/* Full-Screen Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 z-[60] bg-gray-950/98 backdrop-blur-xl animate-fade-in overflow-y-auto pt-4">
          <div className="flex justify-end px-6 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pb-6 max-w-md mx-auto">
            
            {/* Services Accordion */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-primary" />
                  <span className="text-base font-medium text-white">Services</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/60 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${servicesOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-1 pl-8">
                  {serviceItems.map((item, index) => {
                    const icons = [Settings, Snowflake, CircleDot, Disc3, Wrench, Cog, Gauge, Settings];
                    const Icon = icons[index] || Settings;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-all duration-200 hover:bg-white/5 ${
                          isActive(item.href) ? "text-primary bg-white/5" : "text-white/80"
                        }`}
                        onClick={() => { setIsMenuOpen(false); setServicesOpen(false); }}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0 text-white/40" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tuning Accordion */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setTuningOpen(!tuningOpen)}
                className="flex items-center justify-between w-full py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-primary" />
                  <span className="text-base font-medium text-white">Tuning</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/60 transition-transform duration-300 ${tuningOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${tuningOpen ? 'max-h-[300px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-1 pl-8">
                  {tuningItems.map((item, index) => {
                    const icons = [Cog, Flame, Package];
                    const Icon = icons[index] || Cog;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-all duration-200 hover:bg-white/5 ${
                          isActive(item.href) ? "text-primary bg-white/5" : "text-white/80"
                        }`}
                        onClick={() => { setIsMenuOpen(false); setTuningOpen(false); }}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0 text-white/40" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direct Nav Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 py-4 border-b border-white/10 text-base font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name === "MOT" ? <FileText className="h-5 w-5 text-primary" /> : <Car className="h-5 w-5 text-primary" />}
                {item.name}
              </Link>
            ))}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-6">
              {user ? (
                <>
                  <Button 
                    asChild
                    variant="outline" 
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-full h-12 font-medium text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button 
                    asChild
                    className="gradient-primary text-white w-full h-12 font-medium text-base shadow-glow"
                  >
                    <Link to="/book" onClick={() => setIsMenuOpen(false)}>Book Now</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    asChild
                    variant="outline" 
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-full h-12 font-medium text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/auth">Client Login</Link>
                  </Button>
                  <Button 
                    asChild
                    className="gradient-primary text-white w-full h-12 font-medium text-base shadow-glow"
                  >
                    <Link to="/book" onClick={() => setIsMenuOpen(false)}>Book Now</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex items-center justify-center gap-2 pt-6 mt-2 border-t border-white/10">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+441246233483" className="text-sm text-white/70 hover:text-primary transition-colors">
                (01246) 233483
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

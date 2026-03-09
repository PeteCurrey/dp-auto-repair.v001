import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-garage.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-[140px] pt-[140px]">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${offsetY}px) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          {/* Trust Badges - stagger 1 */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center sm:justify-start opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              5-Star Service
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Award className="w-4 h-4 mr-1" />
              Certified Mechanics
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Users className="w-4 h-4 mr-1" />
              15+ Years Experience
            </Badge>
          </div>

          {/* Main Heading - stagger 2 */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-extralight mb-2 leading-tight">
              Expert Auto
              <span className="block text-primary-glow">Repair & Diagnostics</span>
            </h1>
            {/* Gradient accent line */}
            <div className="h-0.5 w-24 gradient-primary rounded-full mb-6" />
          </div>

          {/* Subheading - stagger 3 */}
          <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-2xl leading-relaxed font-extralight md:text-lg opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Professional automotive repair, diagnostics and service. From routine servicing to performance tuning, DP Auto Repair & Diagnostics. Your trusted mechanic.
          </p>

          {/* CTA Buttons - stagger 4 */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <Button size="lg" className="gradient-primary text-black shadow-glow hover-lift text-sm font-extralight" asChild>
              <Link to="/book">
                <Wrench className="w-5 h-5 mr-2" />
                Book Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-sm font-extralight" asChild>
              <Link to="/tuning">Tuning</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

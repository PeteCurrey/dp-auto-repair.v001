"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-garage.jpg";
import Link from "next/link";

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
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-[160px] pt-[160px]">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          transform: `translateY(${offsetY}px) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-foreground">
          {/* Trust Badges - stagger 1 */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center sm:justify-start animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Badge variant="outline" className="bg-transparent text-muted-foreground border-border rounded-full px-3 py-1 font-light backdrop-blur-sm">
              <Star className="w-4 h-4 mr-1 text-primary" />
              5-Star Service
            </Badge>
            <Badge variant="outline" className="bg-transparent text-muted-foreground border-border rounded-full px-3 py-1 font-light backdrop-blur-sm">
              <Award className="w-4 h-4 mr-1" />
              Certified Mechanics
            </Badge>
            <Badge variant="outline" className="bg-transparent text-muted-foreground border-border rounded-full px-3 py-1 font-light backdrop-blur-sm">
              <Users className="w-4 h-4 mr-1" />
              15+ Years Experience
            </Badge>
          </div>

          {/* Main Heading - stagger 2 */}
          <div className="animate-fade-in text-center sm:text-left" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h1 className="text-5xl md:text-7xl font-light mb-2 leading-tight">
              Expert Auto
              <span className="block text-primary font-normal mt-2">
                Repair & Diagnostics
              </span>
            </h1>
            {/* Gradient accent line */}
            <div className="h-0.5 w-16 bg-primary rounded-full mb-8 mt-6 mx-auto sm:mx-0" />
          </div>

          {/* Subheading - stagger 3 */}
          <p className="text-lg sm:text-xl mb-8 text-muted-foreground max-w-2xl leading-relaxed font-extralight md:text-lg animate-fade-in" style={{ animationDelay: '600ms' }}>
            Professional automotive repair, diagnostics and service. From routine servicing to performance tuning, DP Auto Repair & Diagnostics. Your trusted mechanic.
          </p>

          {/* CTA Buttons - stagger 4 */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-md text-sm font-light transition-all shadow-lg" asChild>
              <Link href="/book">
                <Wrench className="w-5 h-5 mr-2" />
                Book Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-accent/30 text-foreground border-border hover:bg-accent/50 rounded-md text-sm font-light backdrop-blur-sm transition-all" asChild>
              <Link href="/tuning">Tuning</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-accent/30 text-foreground border-border hover:bg-accent/50 rounded-md text-sm font-light backdrop-blur-sm transition-all" asChild>
              <Link href="/tuning/ecu-remapping#performance-calculator">Performance Calculator</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

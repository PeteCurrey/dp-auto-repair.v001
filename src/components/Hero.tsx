import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-garage.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 mb-6 animate-fade-up">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              5-Star Service
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Award className="w-4 h-4 mr-1" />
              Certified Mechanics
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Users className="w-4 h-4 mr-1" />
              15+ Years Experience
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-extralight mb-6 animate-fade-up">
            Expert Auto
            <span className="block text-primary-glow">Repair & Diagnostics</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl animate-fade-up">
            Professional automotive service you can trust. From routine maintenance to complex repairs, 
            we keep your vehicle running at its best.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow hover-lift">
              <Wrench className="w-5 h-5 mr-2" />
              Book Service Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              View Our Services
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-garage.jpg";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center overflow-hidden -mt-[140px] pt-[140px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 animate-fade-up justify-center sm:justify-start">
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-extralight mb-6 animate-fade-up leading-tight">
            Expert Auto
            <span className="block text-primary-glow">Repair & Diagnostics</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-2xl animate-fade-up leading-relaxed font-extralight md:text-lg">
            Professional automotive repair, diagnostics and service. From routine servicing to performance tuning, DP Auto Repair & Diagnostics. Your trusted mechanic.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
            <Button size="lg" className="gradient-primary text-black shadow-glow hover-lift text-sm font-extralight" asChild>
              <Link to="/contact">
                <Wrench className="w-5 h-5 mr-2" />
                Book Service Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-black border-red-500 hover:bg-white/20 text-sm font-extralight" asChild>
              <Link to="/tuning">Tuning</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>;
};
export default Hero;
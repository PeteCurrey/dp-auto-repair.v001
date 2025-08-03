import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Zap, 
  Shield, 
  Settings, 
  Gauge, 
  Car,
  ArrowRight,
  Clock,
  CheckCircle 
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Services = () => {
  useSEO({
    title: "Auto Repair Services Chesterfield | DP Automotive Services",
    description: "Complete automotive repair services in Chesterfield. Engine diagnostics, brake repair, MOT testing, routine servicing, and performance tuning by ASE certified technicians.",
    keywords: "engine diagnostics Chesterfield, brake repair, MOT testing, routine servicing, performance tuning, automotive repair services, car maintenance",
    canonical: "https://dpautomotive.co.uk/services",
    ogTitle: "Auto Repair Services Chesterfield | DP Automotive Services", 
    ogDescription: "Complete automotive repair services in Chesterfield. Engine diagnostics, brake repair, MOT testing, routine servicing, and performance tuning."
  });

  const services = [
    {
      icon: Wrench,
      title: "General Repairs",
      description: "Complete automotive repair services for all makes and models. Our experienced technicians handle everything from minor fixes to major overhauls.",
      features: [
        "Engine repair and rebuilds",
        "Transmission service and repair", 
        "Brake system maintenance and repair",
        "Suspension and steering work",
        "Cooling system repairs",
        "Exhaust system service"
      ],
      price: "From £89",
      duration: "2-5 hours"
    },
    {
      icon: Gauge,
      title: "Diagnostics",
      description: "State-of-the-art computer diagnostics to quickly identify issues and provide accurate solutions for your vehicle.",
      features: [
        "Engine diagnostics and analysis",
        "Electrical system testing",
        "Performance analysis and optimization",
        "Error code reading and clearing",
        "Pre-purchase inspections",
        "Emissions testing"
      ],
      price: "From £119",
      duration: "1-2 hours"
    },
    {
      icon: Shield,
      title: "Routine Servicing",
      description: "Keep your vehicle running smoothly and efficiently with our comprehensive maintenance packages.",
      features: [
        "Oil and filter changes",
        "Fluid level checks and top-ups",
        "Tire pressure and tread inspection",
        "Battery testing and replacement",
        "Light and signal checks",
        "Safety inspections"
      ],
      price: "From £49",
      duration: "30-60 minutes"
    },
    {
      icon: Zap,
      title: "Electrical Services",
      description: "Complete electrical system diagnosis and repair for all vehicle electrical components and systems.",
      features: [
        "Battery testing and replacement",
        "Alternator repair and replacement",
        "Starter motor service",
        "Wiring repairs and upgrades",
        "Lighting system repairs",
        "Electronic component diagnosis"
      ],
      price: "From £99",
      duration: "1-3 hours"
    },
    {
      icon: Settings,
      title: "Performance Tuning",
      description: "Optimize your vehicle's performance, efficiency, and driving experience with our tuning services.",
      features: [
        "Engine tuning and optimization",
        "Performance chip installation",
        "Exhaust system upgrades",
        "Air intake improvements",
        "Suspension tuning",
        "ECU remapping"
      ],
      price: "From £199",
      duration: "2-4 hours"
    },
    {
      icon: Car,
      title: "Collision Repair",
      description: "Professional bodywork and collision repair services to restore your vehicle to its original condition.",
      features: [
        "Dent repair and removal",
        "Paint restoration and touch-ups",
        "Frame alignment and straightening",
        "Insurance claim assistance",
        "Parts replacement",
        "Quality assurance inspections"
      ],
      price: "Quote Required",
      duration: "1-7 days"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/50">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6">
              Professional Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-montserrat font-extralight mb-6">
              Professional Auto
              <span className="block text-primary-glow">Repair Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From routine maintenance to complex repairs, our certified technicians 
              provide comprehensive automotive services with precision and care.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={service.title} 
                  className="hover-lift shadow-card border-0 bg-card/80 backdrop-blur-sm h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                        <Button variant="outline" size="sm">
                          Book Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't see what you're looking for? Contact us for custom automotive 
              solutions tailored to your specific needs.
            </p>
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
              Get Custom Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
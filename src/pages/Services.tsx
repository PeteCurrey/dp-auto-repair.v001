import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
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
  CheckCircle,
  Star 
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
      ]
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
      ]
    },
    {
      icon: Shield,
      title: "Routine Servicing",
      description: "Keep your vehicle running smoothly and efficiently with our comprehensive maintenance packages.",
      features: [
        "Oil and filter changes",
        "Fluid level checks and top-ups",
        "Tyre pressure and tread inspection",
        "Battery testing and replacement",
        "Light and signal checks",
        "Safety inspections"
      ]
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
      ]
    },
    {
      icon: Settings,
      title: "Performance Tuning",
      description: "Optimise your vehicle's performance, efficiency, and driving experience with our tuning services.",
      features: [
        "Engine tuning and optimisation",
        "Performance parts installation",
        "Exhaust system upgrades",
        "Air intake improvements",
        "Suspension tuning",
        "ECU remapping"
      ]
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
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/50">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-8" />
            <div className="text-center">
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
                     <CardTitle className="text-xl">
                       <h3>{service.title}</h3>
                     </CardTitle>
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
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Button variant="outline" size="sm" className="ml-auto">
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

        {/* Customer Reviews */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Don't just take our word for it. Here's what our satisfied customers have to say about our service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  review: "Excellent service! The team diagnosed my car's problem quickly and fixed it at a fair price. Highly recommend DP Automotive.",
                  rating: 5,
                  service: "Engine Diagnostics"
                },
                {
                  name: "Mike Thompson", 
                  review: "Professional and reliable. They've been servicing my family's cars for years. Always honest about what needs doing.",
                  rating: 5,
                  service: "Routine Servicing"
                },
                {
                  name: "Emma Davies",
                  review: "Great experience from start to finish. Clear communication, quality work, and no hidden charges. Will definitely return.",
                  rating: 5,
                  service: "Brake Repair"
                }
              ].map((review, index) => (
                <Card key={review.name} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{review.review}"</p>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.service}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
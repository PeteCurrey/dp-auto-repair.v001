import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Zap, Shield, Settings, Gauge, Car, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const ServicesOverview = () => {
  const services = [{
    icon: Wrench,
    title: "General Repairs",
    description: "Complete automotive repair services for all makes and models",
    features: ["Engine repair", "Transmission service", "Brake systems", "Suspension work"],
    href: "/general-repairs"
  }, {
    icon: Gauge,
    title: "Diagnostics",
    description: "Advanced computer diagnostics to identify issues quickly",
    features: ["Engine diagnostics", "Electrical testing", "Performance analysis", "Error code reading"],
    href: "/diagnostics"
  }, {
    icon: Shield,
    title: "Routine Servicing",
    description: "Keep your vehicle running smoothly with regular maintenance",
    features: ["Oil changes", "Filter replacements", "Fluid checks", "Safety inspections"],
    href: "/routine-servicing"
  }, {
    icon: Zap,
    title: "Electrical Services",
    description: "Complete electrical system diagnosis and repair",
    features: ["Battery testing", "Alternator repair", "Starter service", "Wiring repairs"],
    href: "/electrical-services"
  }, {
    icon: Settings,
    title: "Performance Tuning",
    description: "Optimise your vehicle's performance and efficiency",
    features: ["Engine tuning", "Performance upgrades", "Exhaust systems", "Air intake"],
    href: "/performance-tuning"
  }, {
    icon: Car,
    title: "Collision Repair",
    description: "Professional body work and collision repair services",
    features: ["Dent repair", "Paint restoration", "Frame alignment", "Insurance work"],
    href: "/collision-repair"
  }];
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl mb-6 font-extralight md:text-5xl">
            Complete Automotive
            <span className="block text-primary font-extralight text-5xl">Service Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            From routine maintenance to complex repairs, our certified technicians 
            provide comprehensive automotive services with precision and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => <Card key={service.title} className="hover-lift shadow-card border-0 bg-card/80 backdrop-blur-sm" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <h4 className="text-muted-foreground">{service.description}</h4>
              </CardHeader>
              <CardContent className="pt-0">
                <h5 className="font-medium mb-3">Our Services Include:</h5>
                <ul className="space-y-2 mb-6">
                  {service.features.map(feature => <li key={feature} className="flex items-center text-sm">
                      <ArrowRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>)}
                </ul>
                <div className="pt-4 border-t border-border">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default ServicesOverview;
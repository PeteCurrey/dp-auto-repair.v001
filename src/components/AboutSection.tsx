import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, Shield } from "lucide-react";
import mechanicImage from "@/assets/mechanic-diagnostics.jpg";
import workshopImage from "@/assets/workshop-tools.jpg";

const AboutSection = () => {
  const credentials = [
    { icon: Award, text: "ASE Certified Technicians" },
    { icon: Shield, text: "Qualified & Insured" },
    { icon: Users, text: "Independently Owned & Operated" },
    { icon: Clock, text: "15+ Years in Business" }
  ];

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Satisfied Customers" },
    { number: "98%", label: "Customer Retention" },
    { number: "24hr", label: "Emergency Service" }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-slide-in">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted Automotive
                <span className="block text-primary">Excellence Since 2010</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                DP Automotive Repair & Diagnostics has been serving our community with 
                honest, reliable automotive service for fifteen years. Our commitment 
                to quality workmanship and customer satisfaction has made us the trusted 
                choice for hundreds of vehicle owners.
              </p>
              <p className="text-muted-foreground">
                We combine old-school values with cutting-edge technology to provide 
                comprehensive automotive solutions. Our ASE-certified technicians use 
                state-of-the-art diagnostic equipment to ensure accurate, efficient service 
                on all makes and models.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {credentials.map((credential) => (
                <Badge 
                  key={credential.text}
                  variant="secondary" 
                  className="p-3 justify-start bg-card border-border hover:bg-muted/50 transition-colors"
                >
                  <credential.icon className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm text-foreground">{credential.text}</span>
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-up">
            <div className="space-y-6">
              <Card className="overflow-hidden shadow-card border-0">
                <CardContent className="p-0">
                   <img 
                     src={mechanicImage} 
                     alt="Professional automotive technician performing advanced computer diagnostics on a vehicle engine at DP Automotive workshop in Chesterfield"
                     className="w-full h-64 object-cover"
                   />
                </CardContent>
              </Card>
              <div className="bg-secondary text-secondary-foreground p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Professional Diagnostics</h4>
                <p className="text-sm opacity-90">
                  Advanced computer diagnostics ensure accurate problem identification
                </p>
              </div>
            </div>
            <div className="space-y-6 sm:mt-8">
              <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Quality Guarantee</h4>
                <p className="text-sm opacity-90">
                  All work backed by our comprehensive warranty program
                </p>
              </div>
              <Card className="overflow-hidden shadow-card border-0">
                <CardContent className="p-0">
                   <img 
                     src={workshopImage} 
                     alt="Modern automotive workshop at DP Automotive featuring professional diagnostic equipment, tools, and service bays in Chesterfield"
                     className="w-full h-64 object-cover"
                   />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Phone } from 'lucide-react';

interface LocalAreaLinksProps {
  serviceType?: string;
  className?: string;
}

const LocalAreaLinks = ({ serviceType = "automotive services", className = "" }: LocalAreaLinksProps) => {
  const nearbyAreas = [
    { name: "Sheffield", distance: "12 miles", popular: true },
    { name: "Rotherham", distance: "15 miles", popular: true },
    { name: "Mansfield", distance: "18 miles", popular: false },
    { name: "Worksop", distance: "20 miles", popular: false },
    { name: "Matlock", distance: "16 miles", popular: false },
    { name: "Alfreton", distance: "14 miles", popular: true },
    { name: "Clay Cross", distance: "6 miles", popular: true },
    { name: "Staveley", distance: "4 miles", popular: true },
    { name: "Dronfield", distance: "8 miles", popular: true },
    { name: "Eckington", distance: "10 miles", popular: false },
    { name: "Killamarsh", distance: "12 miles", popular: false },
    { name: "Bolsover", distance: "8 miles", popular: false }
  ];

  const localFeatures = [
    {
      title: "Central Chesterfield Location",
      description: "Easy to find on Sheepbridge Lane with free parking",
      icon: <MapPin className="h-5 w-5 text-primary" />
    },
    {
      title: "Serving Derbyshire & South Yorkshire", 
      description: "Convenient access from A61, M1, and surrounding areas",
      icon: <Navigation className="h-5 w-5 text-primary" />
    },
    {
      title: "Local Collection Service",
      description: "Vehicle collection available within 10 miles of Chesterfield",
      icon: <Phone className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <section className={`py-12 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Serving Chesterfield & Surrounding Areas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              DP Auto Repair provides {serviceType} throughout Derbyshire and South Yorkshire. 
              We're conveniently located for customers across the region.
            </p>
          </div>

          {/* Local Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {localFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Nearby Areas */}
          <div className="bg-background rounded-lg p-6 border">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              Areas We Serve
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {nearbyAreas.map((area, index) => (
                <div 
                  key={index} 
                  className={`text-center p-3 rounded-lg transition-colors ${
                    area.popular 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-muted/50'
                  }`}
                >
                  <div className="text-sm font-medium text-foreground">
                    {area.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {area.distance}
                  </div>
                  {area.popular && (
                    <div className="text-xs text-primary font-medium mt-1">
                      Popular
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Don't see your area? We serve customers throughout Derbyshire and South Yorkshire.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="sm">
                  <Link to="/contact">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="tel:+441246233483">
                    <Phone className="h-4 w-4 mr-2" />
                    Call to Arrange Collection
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalAreaLinks;
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Star, ArrowRight, Clock, MapPin } from 'lucide-react';

interface PopularServicesProps {
  currentService?: string;
  layout?: 'grid' | 'horizontal';
  showLocation?: boolean;
  className?: string;
}

const PopularServices = ({ 
  currentService, 
  layout = 'grid',
  showLocation = true,
  className = "" 
}: PopularServicesProps) => {
  const popularServices = [
    {
      title: "MOT Testing",
      href: "/mot",
      price: "from £45",
      duration: "1 hour",
      badge: "Most Popular",
      rating: 4.9,
      description: "Comprehensive MOT testing with same-day results"
    },
    {
      title: "Car Service",
      href: "/routine-servicing", 
      price: "from £95",
      duration: "2-3 hours",
      badge: "Essential",
      rating: 4.8,
      description: "Full vehicle service to manufacturer standards"
    },
    {
      title: "ECU Remapping",
      href: "/ecu-remapping",
      price: "from £250",
      duration: "2-4 hours", 
      badge: "Performance",
      rating: 4.9,
      description: "Professional ECU remapping for increased power"
    },
    {
      title: "Brake Service",
      href: "/brake-service",
      price: "from £150",
      duration: "2-3 hours",
      badge: "Safety",
      rating: 4.7,
      description: "Complete brake system inspection and repair"
    },
    {
      title: "BMW Servicing",
      href: "/bmw-servicing-chesterfield",
      price: "from £120",
      duration: "2-4 hours",
      badge: "Specialist",
      rating: 4.8,
      description: "Expert BMW servicing and diagnostics"
    },
    {
      title: "Clutch Replacement",
      href: "/clutch-replacement",
      price: "from £450",
      duration: "4-6 hours",
      badge: "Expert",
      rating: 4.6,
      description: "Professional clutch replacement service"
    }
  ];

  // Filter out current service if specified
  const filteredServices = currentService 
    ? popularServices.filter(service => 
        service.title.toLowerCase() !== currentService.toLowerCase()
      )
    : popularServices;

  const badgeVariants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Most Popular": "default",
    "Essential": "secondary", 
    "Performance": "default",
    "Safety": "destructive",
    "Specialist": "outline",
    "Expert": "secondary"
  };

  if (layout === 'horizontal') {
    return (
      <section className={`py-8 bg-muted/30 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Popular Services</h2>
              <p className="text-sm text-muted-foreground">Our most requested automotive services</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/services">
                View All Services
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredServices.slice(0, 6).map((service, index) => (
              <Card key={index} className="hover-lift transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={badgeVariants[service.badge] || "default"} className="text-xs">
                      {service.badge}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{service.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-medium text-primary">{service.price}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <Button asChild size="sm" variant="outline" className="w-full text-xs">
                    <Link href={service.href}>
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Popular Automotive Services in Chesterfield
            </h2>
            <p className="text-muted-foreground">
              Our most trusted and frequently requested services
            </p>
            {showLocation && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Located in Chesterfield, serving Derbyshire
                </span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.slice(0, 6).map((service, index) => (
              <Card key={index} className="hover-lift transition-all duration-300 hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={badgeVariants[service.badge] || "default"}>
                      {service.badge}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-xs text-muted-foreground">(50+ reviews)</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="font-semibold text-primary text-lg">{service.price}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href={service.href}>
                      Book Service
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                View All Services
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
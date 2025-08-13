import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Car, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedService {
  title: string;
  description: string;
  link: string;
  icon?: React.ReactNode;
  category: 'service' | 'manufacturer' | 'tuning' | 'information';
}

interface RelatedServicesProps {
  currentService: string;
  currentCategory: 'service' | 'manufacturer' | 'tuning' | 'information';
  limit?: number;
  className?: string;
}

const RelatedServices = ({ 
  currentService, 
  currentCategory, 
  limit = 3,
  className = "" 
}: RelatedServicesProps) => {
  // Comprehensive service mapping for internal linking
  const allServices: RelatedService[] = [
    // MOT & Testing Services
    { title: "MOT Testing", description: "Annual MOT testing with same-day results", link: "/mot", icon: <Car className="h-5 w-5" />, category: 'service' },
    { title: "MOT & Service Combined", description: "Save time with our combined MOT and service package", link: "/mot-and-service", icon: <Wrench className="h-5 w-5" />, category: 'service' },
    { title: "MOT Retest", description: "Quick and convenient MOT retesting service", link: "/mot-retest", icon: <Car className="h-5 w-5" />, category: 'service' },
    
    // Servicing
    { title: "Routine Servicing", description: "Comprehensive vehicle servicing to manufacturer standards", link: "/routine-servicing", icon: <Wrench className="h-5 w-5" />, category: 'service' },
    { title: "Oil Change Service", description: "Quick oil change service in Chesterfield", link: "/oil-change-chesterfield", icon: <Wrench className="h-5 w-5" />, category: 'service' },
    
    // Repairs
    { title: "Brake Repairs", description: "Complete brake system repairs and replacements", link: "/brake-service", icon: <Wrench className="h-5 w-5" />, category: 'service' },
    { title: "Clutch Replacement", description: "Professional clutch repair and replacement", link: "/clutch-replacement", icon: <Wrench className="h-5 w-5" />, category: 'service' },
    { title: "Timing Chain/Belt", description: "Timing chain and belt replacement service", link: "/timing-chain-belt", icon: <Wrench className="h-5 w-5" />, category: 'service' },
    { title: "Suspension Repairs", description: "Complete suspension system diagnosis and repair", link: "/suspension-repairs", icon: <Wrench className="h-5 w-5" />, category: 'service' },
    
    // Tuning & Performance
    { title: "ECU Remapping", description: "Professional ECU remapping for increased performance", link: "/ecu-remapping", icon: <Zap className="h-5 w-5" />, category: 'tuning' },
    { title: "Car Tuning", description: "Complete car tuning services in Chesterfield", link: "/car-tuning-chesterfield", icon: <Zap className="h-5 w-5" />, category: 'tuning' },
    { title: "Performance Tuning", description: "Advanced performance tuning and optimization", link: "/performance-tuning", icon: <Zap className="h-5 w-5" />, category: 'tuning' },
    { title: "Car Remap", description: "Professional car remapping services", link: "/car-remap", icon: <Zap className="h-5 w-5" />, category: 'tuning' },
    
    // Information Pages
    { title: "MOT Due Checker", description: "Check when your MOT is due with our DVLA tool", link: "/when-mot-due", icon: <Car className="h-5 w-5" />, category: 'information' },
    { title: "Remapping Guide", description: "Complete guide to car remapping", link: "/remapping-guide", icon: <Zap className="h-5 w-5" />, category: 'information' },
    { title: "What is Car Remapping?", description: "Learn about ECU remapping and its benefits", link: "/what-is-car-remapping", icon: <Zap className="h-5 w-5" />, category: 'information' },
    
    // Manufacturers (top ones)
    { title: "BMW Servicing", description: "Specialist BMW servicing in Chesterfield", link: "/bmw-servicing-chesterfield", icon: <Car className="h-5 w-5" />, category: 'manufacturer' },
    { title: "Audi Servicing", description: "Expert Audi servicing and repairs", link: "/audi-servicing-chesterfield", icon: <Car className="h-5 w-5" />, category: 'manufacturer' },
    { title: "Mercedes Servicing", description: "Professional Mercedes-Benz servicing", link: "/mercedes-servicing-chesterfield", icon: <Car className="h-5 w-5" />, category: 'manufacturer' },
    { title: "Ford Servicing", description: "Comprehensive Ford servicing and repairs", link: "/ford-servicing-chesterfield", icon: <Car className="h-5 w-5" />, category: 'manufacturer' },
    { title: "Volkswagen Servicing", description: "VW specialist servicing in Chesterfield", link: "/volkswagen-servicing-chesterfield", icon: <Car className="h-5 w-5" />, category: 'manufacturer' }
  ];

  // Filter related services based on current service and category
  const getRelatedServices = (): RelatedService[] => {
    // Remove current service from suggestions
    const filtered = allServices.filter(service => 
      service.title.toLowerCase() !== currentService.toLowerCase()
    );

    // Prioritize same category, then related categories
    const sameCategoryServices = filtered.filter(service => service.category === currentCategory);
    const otherServices = filtered.filter(service => service.category !== currentCategory);

    // Smart related service logic
    let relatedServices: RelatedService[] = [];

    if (currentCategory === 'service') {
      // For service pages, suggest other services + some manufacturer services
      relatedServices = [
        ...sameCategoryServices.slice(0, 2),
        ...otherServices.filter(s => s.category === 'manufacturer').slice(0, 1),
        ...otherServices.filter(s => s.category === 'information').slice(0, 1)
      ];
    } else if (currentCategory === 'manufacturer') {
      // For manufacturer pages, suggest services + other manufacturers
      relatedServices = [
        ...otherServices.filter(s => s.category === 'service').slice(0, 2),
        ...sameCategoryServices.slice(0, 2)
      ];
    } else if (currentCategory === 'tuning') {
      // For tuning pages, suggest other tuning + some services
      relatedServices = [
        ...sameCategoryServices.slice(0, 2),
        ...otherServices.filter(s => s.category === 'service').slice(0, 1),
        ...otherServices.filter(s => s.category === 'information').slice(0, 1)
      ];
    } else if (currentCategory === 'information') {
      // For info pages, suggest related services + other info
      relatedServices = [
        ...otherServices.filter(s => s.category === 'service').slice(0, 2),
        ...sameCategoryServices.slice(0, 2)
      ];
    }

    // Shuffle and limit
    return relatedServices
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const relatedServices = getRelatedServices();

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Related Services
            </h2>
            <p className="text-muted-foreground">
              Other services you might be interested in
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <Card key={index} className="hover-lift transition-all duration-300 hover:shadow-elegant">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    {service.icon && (
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {service.icon}
                      </div>
                    )}
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full group">
                    <Link to={service.link}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
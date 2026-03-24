import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Car, 
  Wrench, 
  Zap, 
  Shield, 
  Clock, 
  FileText,
  CheckCircle,
  Settings
} from 'lucide-react';

interface ServiceCategoryNavProps {
  currentCategory?: 'service' | 'manufacturer' | 'tuning' | 'information';
  className?: string;
}

const ServiceCategoryNav = ({ currentCategory, className = "" }: ServiceCategoryNavProps) => {
  const categories = [
    {
      id: 'service',
      title: 'General Services',
      icon: <Wrench className="h-5 w-5" />,
      description: 'MOT, servicing, repairs',
      count: '25+',
      links: [
        { title: 'MOT Testing', href: '/mot' },
        { title: 'Routine Servicing', href: '/routine-servicing' },
        { title: 'Brake Service', href: '/brake-service' },
        { title: 'Clutch Replacement', href: '/clutch-replacement' }
      ]
    },
    {
      id: 'manufacturer',
      title: 'Manufacturer Specialists',
      icon: <Car className="h-5 w-5" />,
      description: 'Brand-specific expertise',
      count: '40+',
      links: [
        { title: 'BMW Servicing', href: '/bmw-servicing-chesterfield' },
        { title: 'Audi Servicing', href: '/audi-servicing-chesterfield' },
        { title: 'Mercedes Servicing', href: '/mercedes-servicing-chesterfield' },
        { title: 'Ford Servicing', href: '/ford-servicing-chesterfield' }
      ]
    },
    {
      id: 'tuning',
      title: 'Performance & Tuning',
      icon: <Zap className="h-5 w-5" />,
      description: 'ECU remapping, performance',
      count: '10+',
      links: [
        { title: 'ECU Remapping', href: '/ecu-remapping' },
        { title: 'Car Tuning', href: '/car-tuning-chesterfield' },
        { title: 'Performance Tuning', href: '/performance-tuning' },
        { title: 'Car Remap', href: '/car-remap' }
      ]
    },
    {
      id: 'information',
      title: 'Information & Tools',
      icon: <FileText className="h-5 w-5" />,
      description: 'Guides, checkers, advice',
      count: '15+',
      links: [
        { title: 'MOT Due Checker', href: '/when-mot-due' },
        { title: 'Remapping Guide', href: '/remapping-guide' },
        { title: 'Service vs MOT Difference', href: '/service-vs-mot-difference' },
        { title: 'How Long MOT Takes', href: '/how-long-mot-takes' }
      ]
    }
  ];

  const trustIndicators = [
    {
      icon: <Shield className="h-4 w-4" />,
      text: "12 Month Warranty"
    },
    {
      icon: <Clock className="h-4 w-4" />,
      text: "Same Day Service"
    },
    {
      icon: <CheckCircle className="h-4 w-4" />,
      text: "Qualified Technicians"
    },
    {
      icon: <Settings className="h-4 w-4" />,
      text: "Latest Equipment"
    }
  ];

  return (
    <section className={`py-8 bg-background border-t ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Explore Our Services
            </h2>
            <p className="text-muted-foreground">
              Browse our comprehensive range of automotive services in Chesterfield
            </p>
          </div>

          {/* Service Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className={`hover-lift transition-all duration-300 ${
                  currentCategory === category.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-elegant'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{category.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.count} services
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-4">
                    {category.description}
                  </p>

                  <div className="space-y-2">
                    {category.links.map((link, index) => (
                      <Link 
                        key={index}
                        href={link.href}
                        className="block text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        • {link.title}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2 justify-center p-3 bg-muted/30 rounded-lg">
                {indicator.icon}
                <span className="text-sm font-medium text-muted-foreground">
                  {indicator.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoryNav;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import Breadcrumb from '@/components/Breadcrumb';
import { useSEO } from '@/hooks/useSEO';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Award, 
  Wrench, 
  Calendar,
  Phone,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SchemaMarkup from '@/components/SchemaMarkup';

interface ManufacturerLandingProps {
  manufacturer: string;
  manufacturerLogo?: string;
  specialServices: string[];
  commonIssues: string[];
  servicePackages: {
    name: string;
    price: string;
    services: string[];
    interval: string;
  }[];
}

export const ManufacturerLandingTemplate = ({ 
  manufacturer, 
  manufacturerLogo,
  specialServices,
  commonIssues,
  servicePackages
}: ManufacturerLandingProps) => {
  useSEO({
    title: `${manufacturer} Routine Servicing in Chesterfield | DP Automotive`,
    description: `Expert ${manufacturer} routine servicing in Chesterfield. Specialist knowledge, genuine parts, competitive prices. Book your ${manufacturer} service today.`,
    keywords: `${manufacturer} service, ${manufacturer} servicing Chesterfield, ${manufacturer} garage, ${manufacturer} specialist, routine service ${manufacturer.toLowerCase()}`,
    canonical: `https://dpautorepair.co.uk/${manufacturer.toLowerCase()}-servicing-chesterfield`,
    ogTitle: `${manufacturer} Servicing Specialists in Chesterfield`,
    ogDescription: `Trust DP Automotive for your ${manufacturer} routine servicing in Chesterfield. Expert technicians, genuine parts, competitive prices.`
  });

  const benefits = [
    'Specialist knowledge of your vehicle make',
    'Genuine and quality replacement parts',
    'Competitive pricing with transparent quotes',
    'Experienced and certified technicians',
    'Convenient location in Chesterfield',
    'Full service history documentation'
  ];

  const faqs = [
    {
      question: `How often should I service my ${manufacturer}?`,
      answer: `We recommend following ${manufacturer}'s service schedule, typically every 6-12 months or 10,000-15,000 miles depending on your model and driving conditions. Regular servicing helps maintain your warranty and ensures optimal performance.`
    },
    {
      question: `Do you use genuine ${manufacturer} parts?`,
      answer: `We use a combination of genuine ${manufacturer} parts and high-quality OEM equivalent parts. We'll always discuss part options with you and use genuine parts where they provide the best value and performance for your vehicle.`
    },
    {
      question: `What does a ${manufacturer} service include?`,
      answer: `Our ${manufacturer} service includes oil and filter changes, multi-point inspection, fluid checks, brake inspection, and diagnostic scan using ${manufacturer}-specific equipment. We follow manufacturer guidelines to maintain your warranty.`
    },
    {
      question: `How much does ${manufacturer} servicing cost?`,
      answer: `Our ${manufacturer} servicing starts from competitive rates with transparent pricing. The exact cost depends on your vehicle model, service requirements, and any additional work needed. We always provide a detailed quote before starting work.`
    },
    {
      question: `Can you maintain my ${manufacturer} warranty?`,
      answer: `Yes, our services are designed to maintain your manufacturer warranty. We follow all ${manufacturer} service requirements and use approved procedures and parts where necessary.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer
      }
    }))
  };


  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup schema={faqSchema} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            className="mb-8"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: `${manufacturer} Servicing` }
            ]}
          />
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              {manufacturerLogo && (
                <img src={manufacturerLogo} alt={`${manufacturer} logo`} className="h-12 w-auto" />
              )}
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {manufacturer} Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Expert {manufacturer} Servicing in Chesterfield
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keep your {manufacturer} running at its best with our specialist servicing. 
              Our experienced technicians understand your vehicle inside and out, ensuring optimal performance and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/contact">Book Your Service</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8">
                <a href="tel:01246123456">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose DP Automotive for Your {manufacturer}?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {manufacturer} Service Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {servicePackages.map((pkg, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription>Every {pkg.interval}</CardDescription>
                    <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pkg.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {manufacturer} Specialist Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {specialServices.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-6 w-6 text-primary" />
                      <h4 className="font-semibold">{service}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common {manufacturer} Issues We Address
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {commonIssues.map((issue, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-primary mt-1" />
                      <p>{issue}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Trusted by Chesterfield Drivers</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">15+ Years Experience</h4>
                <p className="text-muted-foreground">Serving Chesterfield since 2008</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Same Day Service</h4>
                <p className="text-muted-foreground">Quick turnaround times</p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">12 Month Warranty</h4>
                <p className="text-muted-foreground">On all parts and labour</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Central Location</h4>
                <p className="text-muted-foreground">Easy to find in Chesterfield</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title={`${manufacturer} Servicing FAQs`}
        subtitle={`Common questions about ${manufacturer} servicing and maintenance`}
        faqs={faqs}
        className="bg-muted/30"
      />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Book Your {manufacturer} Service?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get in touch today for a quote or to schedule your appointment. 
              Our team is ready to keep your {manufacturer} in perfect condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link to="/contact">Book Online</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Phone className="h-5 w-5 mr-2" />
                01246 123456
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
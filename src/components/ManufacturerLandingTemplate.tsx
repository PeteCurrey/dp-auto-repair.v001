"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import ServiceCategoryNav from '@/components/ServiceCategoryNav';
import LocalAreaLinks from '@/components/LocalAreaLinks';
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
import Link from 'next/link';
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
      <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-32">
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
            <h1 className="text-4xl md:text-5xl font-extralight text-foreground mb-6">
              Expert {manufacturer} Servicing in Chesterfield
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keep your {manufacturer} running at its best with our specialist servicing. 
              Our experienced technicians understand your vehicle inside and out, ensuring optimal performance and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/contact">Book Your Service</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8">
                <a href="tel:+441246233483">
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
            <h2 className="text-3xl font-bold text-center mb-4">
              {manufacturer} Service Packages in Chesterfield
            </h2>
            <h3 className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Tailored service packages designed specifically for {manufacturer} vehicles
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {servicePackages.map((pkg, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <h4 className="text-xl font-semibold">{pkg.name}</h4>
                    <h5 className="text-muted-foreground">Every {pkg.interval}</h5>
                    <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                  </CardHeader>
                  <CardContent>
                    <h6 className="font-medium mb-3">Includes:</h6>
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
            <h2 className="text-3xl font-bold text-center mb-4">
              {manufacturer} Specialist Services in Chesterfield
            </h2>
            <h3 className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Advanced diagnostic and repair services specific to {manufacturer} vehicles
            </h3>
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
            <h2 className="text-3xl font-bold text-center mb-4">
              Common {manufacturer} Issues We Address in Chesterfield
            </h2>
            <h3 className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Expert solutions for known {manufacturer} problems and maintenance requirements
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {commonIssues.map((issue, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-primary mt-1" />
                      <h4 className="font-medium">{issue}</h4>
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
            <h2 className="text-3xl font-bold mb-4">Trusted {manufacturer} Specialists in Chesterfield</h2>
            <h3 className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              Your local garage with proven expertise and commitment to quality service
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">15+ Years Experience</h4>
                <h5 className="text-muted-foreground">Serving Chesterfield since 2008</h5>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Same Day Service</h4>
                <h5 className="text-muted-foreground">Quick turnaround times</h5>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">12 Month Warranty</h4>
                <h5 className="text-muted-foreground">On all parts and labour</h5>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Central Location</h4>
                <h5 className="text-muted-foreground">Easy to find in Chesterfield</h5>
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

      {/* Related Services */}
      <RelatedServices 
        currentService={`${manufacturer} Servicing`}
        currentCategory="manufacturer"
        limit={3}
      />

      {/* Local Area Links */}
      <LocalAreaLinks serviceType={`${manufacturer} servicing and repairs`} />

      {/* Service Category Navigation */}
      <ServiceCategoryNav currentCategory="manufacturer" />

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
                <Link href="/contact">Book Online</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="tel:+441246233483">
                  <Phone className="h-5 w-5 mr-2" />
                  01246 233483
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
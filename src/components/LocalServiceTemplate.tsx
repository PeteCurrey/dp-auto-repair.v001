"use client";

"use client";

import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Calendar, MapPin, Clock, Star, Shield, Users, Award, CheckCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceOffering {
  name: string;
  description: string;
  features: string[];
  pricing?: string;
}

interface LocalServiceTemplateProps {
  // SEO Props
  slug: string;
  pageTitle: string;
  description: string;
  keywords?: string;
  
  // Content Props
  h1: string;
  intro: string;
  locationText: string;
  
  // Services
  services: ServiceOffering[];
  
  // Local Trust Signals
  yearsInBusiness: number;
  customerCount: string;
  averageRating: number;
  
  // FAQ
  faqs: FAQItem[];
  
  // Optional Components
  showDVLAChecker?: boolean;
  dvlaCheckerComponent?: React.ReactNode;
}

const LocalServiceTemplate = ({
  slug,
  pageTitle,
  description,
  keywords,
  h1,
  intro,
  locationText,
  services,
  yearsInBusiness,
  customerCount,
  averageRating,
  faqs,
  showDVLAChecker = false,
  dvlaCheckerComponent
}: LocalServiceTemplateProps) => {
  // SEO Configuration
  useSEO({
    title: pageTitle,
    description,
    keywords: keywords || `${h1}, automotive services, car repair, Chesterfield, local garage`,
    canonical: `https://dpautorepair.co.uk/${slug}`,
    ogTitle: pageTitle,
    ogDescription: description,
    ogImage: "https://dpautorepair.co.uk/og-image.jpg"
  });

  // Structured Data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "DP Auto Repair",
    "image": "https://dpautorepair.co.uk/logo.png",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 3, Sheepbridge Lane",
      "addressLocality": "Chesterfield",
      "addressRegion": "Derbyshire",
      "postalCode": "S41 9RX",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.2707,
      "longitude": -1.4816
    },
    "telephone": "+44 (0) 1246 590036",
    "url": "https://dpautorepair.co.uk",
    "priceRange": "££",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": 150
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "13:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automotive Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: h1, href: `/${slug}` }
  ];

  return (
    <>
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={faqSchema} />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Breadcrumb */}
          <div className="bg-muted/30 border-b">
            <div className="container mx-auto px-4 py-4">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>

          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-r from-secondary via-secondary/95 to-primary/20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
                  {h1}
                </h1>
                <p className="text-xl text-secondary-foreground/90 mb-6 leading-relaxed">
                  {intro}
                </p>
                <p className="text-lg text-secondary-foreground/80 mb-8">
                  {locationText}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gradient-primary shadow-elegant">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Service
                  </Button>
                  <Button size="lg" variant="outline" className="bg-background/90 border-primary/30">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (01246) 590036
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="text-center shadow-card hover-lift">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{yearsInBusiness}+</h3>
                      <p className="text-muted-foreground">Years Experience</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center shadow-card hover-lift">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{customerCount}</h3>
                      <p className="text-muted-foreground">Happy Customers</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center shadow-card hover-lift">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{averageRating}/5</h3>
                      <p className="text-muted-foreground">Customer Rating</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center shadow-card hover-lift">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-1">Local</h3>
                      <p className="text-muted-foreground">Chesterfield Based</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* DVLA Checker Component */}
          {showDVLAChecker && dvlaCheckerComponent && (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  {dvlaCheckerComponent}
                </div>
              </div>
            </section>
          )}

          {/* Services Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Our Services
                  </h2>
                  <p className="text-muted-foreground">
                    Comprehensive automotive services delivered by experienced professionals
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <Card key={index} className="shadow-card hover-lift">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {service.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-foreground mb-2">Includes:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {service.pricing && (
                          <div className="mb-4">
                            <Badge variant="outline" className="text-primary border-primary/30">
                              From {service.pricing}
                            </Badge>
                          </div>
                        )}

                        <Button className="w-full gradient-primary">
                          Book {service.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Location & Contact Info */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Location Details */}
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      Visit Our Chesterfield Workshop
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Located in the heart of Chesterfield, our modern workshop is equipped with 
                      the latest diagnostic equipment and tools. We're easily accessible and offer 
                      convenient parking for all our customers.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium text-foreground">Address</p>
                          <p className="text-muted-foreground">
                            Unit 3, Sheepbridge Lane<br />
                            Chesterfield, Derbyshire S41 9RX
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium text-foreground">Phone</p>
                          <p className="text-muted-foreground">(01246) 590036</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium text-foreground">Opening Hours</p>
                          <div className="text-muted-foreground">
                            <p>Monday - Friday: 8:00 AM - 5:30 PM</p>
                            <p>Saturday: 8:00 AM - 1:00 PM</p>
                            <p>Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why Choose Us */}
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      Why Choose DP Auto Repair?
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground">12 Month Warranty</h3>
                          <p className="text-muted-foreground">
                            All repairs come with our comprehensive 12-month warranty for complete peace of mind.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground">Expert Technicians</h3>
                          <p className="text-muted-foreground">
                            Our team of certified mechanics have years of experience with all vehicle makes and models.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground">Quick Turnaround</h3>
                          <p className="text-muted-foreground">
                            Most services completed the same day, getting you back on the road quickly.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground">Competitive Pricing</h3>
                          <p className="text-muted-foreground">
                            Fair, transparent pricing with no hidden costs. Get excellent value for professional service.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <FAQSection
                  title="Frequently Asked Questions"
                  subtitle="Common questions about our automotive services in Chesterfield"
                  faqs={faqs}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-primary via-primary to-primary-glow">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
                  Ready to Experience Professional Service?
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-8">
                  Contact DP Auto Repair today to book your automotive service in Chesterfield.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="outline" className="bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Service Online
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (01246) 590036
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LocalServiceTemplate;
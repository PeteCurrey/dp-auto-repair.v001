import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import RelatedServices from '@/components/RelatedServices';
import ServiceCategoryNav from '@/components/ServiceCategoryNav';
import PopularServices from '@/components/PopularServices';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Calendar, Clock, MapPin, Star, Shield } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface InformationalLandingTemplateProps {
  // SEO Props
  slug: string;
  pageTitle: string;
  description: string;
  keywords?: string;
  
  // Content Props
  h1: string;
  intro: string;
  mainContent: {
    title: string;
    content: string;
    points?: string[];
  }[];
  quickFacts?: {
    title: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  
  // Call to Action
  ctaTitle?: string;
  ctaDescription?: string;
  
  // FAQ
  faqs: FAQItem[];
  
  // Optional Components
  showCalculator?: boolean;
  showDVLAChecker?: boolean;
  calculatorComponent?: React.ReactNode;
  dvlaCheckerComponent?: React.ReactNode;
}

const InformationalLandingTemplate = ({
  slug,
  pageTitle,
  description,
  keywords,
  h1,
  intro,
  mainContent,
  quickFacts,
  ctaTitle = "Need Expert Automotive Service?",
  ctaDescription = "Contact DP Auto Repair for professional automotive services in Chesterfield. Our certified technicians are ready to help.",
  faqs,
  showCalculator = false,
  showDVLAChecker = false,
  calculatorComponent,
  dvlaCheckerComponent
}: InformationalLandingTemplateProps) => {
  // SEO Configuration
  useSEO({
    title: pageTitle,
    description,
    keywords: keywords || `${h1}, Chesterfield, DP Auto Repair, automotive, car service`,
    canonical: `https://dpautorepair.co.uk/${slug}`,
    ogTitle: pageTitle,
    ogDescription: description,
    ogImage: "https://dpautorepair.co.uk/og-image.jpg"
  });

  // Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": h1,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "DP Auto Repair",
      "url": "https://dpautorepair.co.uk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DP Auto Repair",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dpautorepair.co.uk/logo.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dpautorepair.co.uk/${slug}`
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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "DP Auto Repair",
    "image": "https://dpautorepair.co.uk/logo.png",
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
    ]
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: h1, href: `/${slug}` }
  ];

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={localBusinessSchema} />
      
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
                <p className="text-xl text-secondary-foreground/90 mb-8 leading-relaxed">
                  {intro}
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

          {/* Quick Facts */}
          {quickFacts && quickFacts.length > 0 && (
            <section className="py-12 bg-background">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {quickFacts.map((fact, index) => (
                    <Card key={index} className="text-center hover-lift shadow-card">
                      <CardContent className="p-6">
                        {fact.icon && (
                          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            {fact.icon}
                          </div>
                        )}
                        <h3 className="font-semibold text-foreground mb-2">{fact.title}</h3>
                        <p className="text-2xl font-bold text-primary">{fact.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Calculator Component */}
          {showCalculator && calculatorComponent && (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Performance Calculator
                    </h2>
                    <p className="text-muted-foreground">
                      Estimate your vehicle's potential performance gains
                    </p>
                  </div>
                  {calculatorComponent}
                </div>
              </div>
            </section>
          )}

          {/* DVLA Checker Component */}
          {showDVLAChecker && dvlaCheckerComponent && (
            <section className="py-12 bg-background">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  {dvlaCheckerComponent}
                </div>
              </div>
            </section>
          )}

          {/* Main Content */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {mainContent.map((section, index) => (
                  <div key={index} className="mb-12">
                    <Card className="shadow-card">
                      <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-foreground mb-6">
                          {section.title}
                        </h2>
                        <div className="prose max-w-none">
                          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            {section.content}
                          </p>
                          {section.points && section.points.length > 0 && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {section.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-muted-foreground">{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Factors */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                  Why Choose DP Auto Repair?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">12 Month Warranty</h3>
                    <p className="text-muted-foreground">
                      All work comes with our comprehensive 12-month warranty for your peace of mind.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Chesterfield Location</h3>
                    <p className="text-muted-foreground">
                      Conveniently located in Chesterfield, serving customers across Derbyshire.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Quick Turnaround</h3>
                    <p className="text-muted-foreground">
                      Efficient service with same-day completion available for many services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <FAQSection
                  title="Frequently Asked Questions"
                  subtitle="Find answers to common questions about our automotive services"
                  faqs={faqs}
                />
              </div>
            </div>
          </section>

          {/* Popular Services */}
          <PopularServices 
            currentService={h1}
            layout="horizontal"
            showLocation={false}
          />

          {/* Related Services */}
          <RelatedServices 
            currentService={h1}
            currentCategory="information"
            limit={3}
          />

          {/* Service Category Navigation */}
          <ServiceCategoryNav currentCategory="information" />

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-primary via-primary to-primary-glow">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
                  {ctaTitle}
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-8">
                  {ctaDescription}
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

export default InformationalLandingTemplate;
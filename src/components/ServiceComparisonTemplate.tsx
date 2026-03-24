"use client";

"use client";

import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import DVLAMotChecker from '@/components/DVLAMotChecker';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Calendar, Check, X, AlertTriangle, Info } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ComparisonRow {
  feature: string;
  service1: boolean | string;
  service2: boolean | string;
  description?: string;
}

interface ServiceComparisonTemplateProps {
  // SEO Props
  slug: string;
  pageTitle: string;
  description: string;
  keywords?: string;
  
  // Content Props
  h1: string;
  intro: string;
  service1Name: string;
  service2Name: string;
  comparisonTable: ComparisonRow[];
  
  // Detailed Sections
  service1Details: {
    title: string;
    description: string;
    benefits: string[];
    frequency: string;
    duration: string;
  };
  service2Details: {
    title: string;
    description: string;
    benefits: string[];
    frequency: string;
    duration: string;
  };
  
  // FAQ
  faqs: FAQItem[];
  
  // Optional DVLA Checker
  showDVLAChecker?: boolean;
}

const ServiceComparisonTemplate = ({
  slug,
  pageTitle,
  description,
  keywords,
  h1,
  intro,
  service1Name,
  service2Name,
  comparisonTable,
  service1Details,
  service2Details,
  faqs,
  showDVLAChecker = false
}: ServiceComparisonTemplateProps) => {
  // SEO Configuration
  useSEO({
    title: pageTitle,
    description,
    keywords: keywords || `${service1Name}, ${service2Name}, comparison, Chesterfield, DP Auto Repair`,
    canonical: `https://dpautorepair.co.uk/${slug}`,
    ogTitle: pageTitle,
    ogDescription: description,
    ogImage: "https://dpautorepair.co.uk/og-image.jpg"
  });

  // Structured Data
  const comparisonSchema = {
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: h1, href: `/${slug}` }
  ];

  const renderTableCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-500 mx-auto" />
      );
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <>
      <SchemaMarkup schema={comparisonSchema} />
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

          {/* DVLA Checker Component */}
          {showDVLAChecker && (
            <section className="py-12 bg-background">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <DVLAMotChecker />
                </div>
              </div>
            </section>
          )}

          {/* Comparison Table */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Quick Comparison
                  </h2>
                  <p className="text-muted-foreground">
                    See the key differences between {service1Name} and {service2Name}
                  </p>
                </div>

                <Card className="shadow-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                          <th className="text-center p-4 font-semibold text-foreground">{service1Name}</th>
                          <th className="text-center p-4 font-semibold text-foreground">{service2Name}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonTable.map((row, index) => (
                          <tr key={index} className="border-t border-border">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{row.feature}</span>
                                {row.description && (
                                  <div className="group relative">
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                                      {row.description}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              {renderTableCell(row.service1)}
                            </td>
                            <td className="p-4 text-center">
                              {renderTableCell(row.service2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Detailed Service Information */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Service 1 Details */}
                  <Card className="shadow-card">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {service1Details.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service1Details.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {service1Details.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Frequency:</p>
                          <p className="font-semibold text-foreground">{service1Details.frequency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Duration:</p>
                          <p className="font-semibold text-foreground">{service1Details.duration}</p>
                        </div>
                      </div>

                      <Button className="w-full gradient-primary">
                        Book {service1Name}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Service 2 Details */}
                  <Card className="shadow-card">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {service2Details.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service2Details.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {service2Details.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Frequency:</p>
                          <p className="font-semibold text-foreground">{service2Details.frequency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Duration:</p>
                          <p className="font-semibold text-foreground">{service2Details.duration}</p>
                        </div>
                      </div>

                      <Button className="w-full gradient-primary">
                        Book {service2Name}
                      </Button>
                    </CardContent>
                  </Card>
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
                  subtitle={`Common questions about ${service1Name} and ${service2Name}`}
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
                  Ready to Book Your Service?
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-8">
                  Contact DP Auto Repair to schedule your {service1Name} or {service2Name} in Chesterfield.
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

export default ServiceComparisonTemplate;
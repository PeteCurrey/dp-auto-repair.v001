import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PerformanceGainCalculator from "@/components/PerformanceGainCalculator";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaMarkup from "@/components/SchemaMarkup";
import { useSEO } from "@/hooks/useSEO";
import { CheckCircle, Zap, Shield, Clock, Award, Phone } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface TuningLandingTemplateProps {
  slug: string;
  pageTitle: string;
  description: string;
  keywords: string;
  h1: string;
  intro: string;
  serviceType: string;
  heroDescription: string;
  faqs: FAQItem[];
  processSteps?: string[];
}

const TuningLandingTemplate = ({
  slug,
  pageTitle,
  description,
  keywords,
  h1,
  intro,
  serviceType,
  heroDescription,
  faqs,
  processSteps = [
    "Vehicle diagnostics and data logging",
    "Custom ECU file optimization",
    "Professional dyno testing",
    "Road testing and final adjustments"
  ]
}: TuningLandingTemplateProps) => {
  useSEO({
    title: pageTitle,
    description,
    keywords,
    canonical: `https://dpautorepair.co.uk/${slug}`,
    ogTitle: pageTitle,
    ogDescription: description,
    ogImage: "https://dpautorepair.co.uk/professional-garage-snapon.jpg"
  });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceType,
    "provider": {
      "@type": "AutomotiveBusiness",
      "name": "DP Automotive",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit 2 Sheepbridge Business Park",
        "addressLocality": "Chesterfield",
        "addressRegion": "Derbyshire", 
        "postalCode": "S41 9RX",
        "addressCountry": "GB"
      },
      "telephone": "+441246233483",
      "url": "https://dpautorepair.co.uk"
    },
    "description": description,
    "areaServed": "Chesterfield, Derbyshire"
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

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Increased Power & Torque",
      description: "Unlock your engine's true potential with gains up to 30% more power and torque"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Improved Fuel Economy",
      description: "Better engine efficiency can lead to improved fuel consumption when driven sensibly"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Engine Protection",
      description: "Professional remapping includes built-in safety parameters to protect your engine"
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Enhanced Drivability",
      description: "Smoother power delivery and improved throttle response for better driving experience"
    }
  ];

  const services = [
    {
      title: "ECU Remapping",
      description: "Professional engine control unit optimization for maximum performance gains",
      features: ["Custom file development", "Dyno testing", "Performance warranty", "Road testing"]
    },
    {
      title: "Performance Exhaust Fabrication", 
      description: "Custom exhaust systems designed and built for optimal performance and sound",
      features: ["Stainless steel construction", "Custom design", "Performance gains", "Sound optimization"]
    },
    {
      title: "Intercooler Upgrades",
      description: "High-performance intercooler systems for improved cooling and power",
      features: ["Larger core sizes", "Improved efficiency", "Bolt-on fitment", "Performance testing"]
    }
  ];

  const trustFactors = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Comprehensive Warranty",
      description: "All remaps covered by warranty for complete peace of mind"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Expert Technicians",
      description: "Qualified professionals with years of tuning experience"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Quick Turnaround",
      description: "Most remaps completed within 2-3 hours"
    }
  ];

  return (
    <>
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={faqSchema} />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Tuning Services", href: "/tuning" },
                { label: h1, href: `/${slug}` }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4">
                  Professional ECU Remapping
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                  {h1}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  {heroDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Remap Quote
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Book Consultation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Why Choose Professional ECU Remapping?
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {intro}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm text-muted-foreground">
                        {benefit.description}
                      </h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Performance Calculator */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Calculate Your Potential Performance Gains
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Use our performance calculator to estimate the power and torque gains possible with professional ECU remapping for your vehicle.
                </p>
              </div>
              <PerformanceGainCalculator />
            </div>
          </section>

          {/* Services Overview */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Our Performance Tuning Services in Chesterfield
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  From ECU remapping to complete performance packages, we offer comprehensive tuning solutions for all makes and models.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <h4 className="text-muted-foreground">{service.description}</h4>
                    </CardHeader>
                    <CardContent>
                      <h5 className="font-medium mb-3">Service Includes:</h5>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Our Professional {serviceType} Process in Chesterfield
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We follow a proven methodology to ensure safe, reliable, and optimal performance gains for your vehicle.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold">Step {index + 1}</h3>
                      <h4 className="text-sm text-muted-foreground">{step}</h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Why Choose DP Automotive for {serviceType} in Chesterfield?
                </h2>
                <h3 className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Your trusted performance tuning specialists with proven expertise
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trustFactors.map((factor, index) => (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {factor.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{factor.title}</h4>
                    <h5 className="text-muted-foreground">{factor.description}</h5>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {serviceType} Questions Answered
                </h2>
                <h3 className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Common questions about {serviceType.toLowerCase()} services in Chesterfield
                </h3>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <h4 className="text-lg font-semibold">{faq.question}</h4>
                      </CardHeader>
                      <CardContent>
                        <h5 className="text-muted-foreground">{faq.answer}</h5>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Unlock Your Vehicle's Performance?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Contact our expert team today for a professional consultation and quote for your {serviceType.toLowerCase()} requirements in Chesterfield.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Call +44 1246 233 483
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Get Free Quote
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TuningLandingTemplate;
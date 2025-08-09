import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Calendar, Shield, Wrench, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import SchemaMarkup from '@/components/SchemaMarkup';

interface FAQItem { question: string; answer: string }

interface ServiceLandingTemplateProps {
  slug: string; // e.g. "mechanic-chesterfield"
  pageTitle: string; // Meta title
  description: string; // Meta description
  h1: string; // Visible H1
  intro: string; // Hero paragraph
  serviceType: string; // For schema.org Service
  features: string[]; // Bullet points specific to the service
  faqs: FAQItem[];
}

const baseUrl = 'https://dpautorepair.co.uk';

const ServiceLandingTemplate = ({
  slug,
  pageTitle,
  description,
  h1,
  intro,
  serviceType,
  features,
  faqs
}: ServiceLandingTemplateProps) => {
  const canonical = `${baseUrl}/${slug}`;

  useSEO({
    title: pageTitle,
    description,
    keywords: `${serviceType.toLowerCase()} chesterfield, ${serviceType.toLowerCase()} near me, ${serviceType.toLowerCase()} price, dp automotive`,
    canonical,
    ogTitle: pageTitle,
    ogDescription: description
  });

  const benefits = [
    'Honest, plain‑English advice and clear pricing',
    'Work carried out by experienced, qualified technicians',
    'Quality parts and oils that meet manufacturer specifications',
    'Same‑day service available on many jobs',
    'Warranty‑safe servicing that protects your vehicle',
    'Convenient location in Chesterfield with easy access'
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: h1,
    serviceType,
    areaServed: 'Chesterfield',
    provider: {
      '@type': 'AutoRepair',
      name: 'DP Automotive',
      url: baseUrl
    },
    url: canonical
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Header />

      <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <Breadcrumb
            className="mb-8"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: h1 }
            ]}
          />

          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Chesterfield Specialists</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{h1}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">{intro}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/contact">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Online
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="px-8">
                <a href="tel:01246123456">
                  <Phone className="h-5 w-5 mr-2" />
                  01246 123456
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    <p className="text-foreground">{b}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((f, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-primary" />
                      <span>{f}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle>12‑Month Warranty</CardTitle>
                <CardDescription>On parts and labour</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle>Chesterfield Garage</CardTitle>
                <CardDescription>Easy to reach location</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle>Fast Turnaround</CardTitle>
                <CardDescription>Same‑day on many jobs</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid gap-4">
              {faqs.map((faq, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-lg mb-8 opacity-90">Get a quick quote or schedule your visit today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="px-8">
              <Link to="/contact">Book Online</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Phone className="h-5 w-5 mr-2" />
              01246 123456
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceLandingTemplate;

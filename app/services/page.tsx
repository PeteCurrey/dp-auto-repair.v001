import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadcrumbNav from '@/components/marketing/BreadcrumbNav';
import ServiceCard from '@/components/marketing/ServiceCard';
import CTABanner from '@/components/marketing/CTABanner';
import { marketingServices } from '@/data/marketing-services';
import { Wrench, Car, Zap, Shield, Search, Wind, Settings, Battery, Gauge, Activity, Crosshair } from 'lucide-react';

export const metadata: Metadata = {
  title: "Professional Car Services Chesterfield | DP Automotive",
  description: "Comprehensive range of car repairs and maintenance in Chesterfield. From MOT prep and servicing to advanced diagnostics and clutch replacement.",
};

const iconMap: Record<string, any> = {
  "car-servicing": Wrench,
  "mot-preparation": Car,
  "engine-diagnostics": Activity,
  "brake-repairs": Shield,
  "clutch-replacement": Settings,
  "cam-belt-replacement": Gauge,
  "dpf-cleaning": Wind,
  "air-conditioning": Search,
  "wheel-alignment": Crosshair,
  "battery-replacement": Battery,
  "exhaust-repairs": Activity,
  "suspension-repairs": Activity,
  "egr-valve-replacement": Activity,
  "pre-purchase-inspection": Search
};

export default function ServicesHub() {
  const services = Object.values(marketingServices);
  const breadcrumbItems = [{ label: 'Services' }];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-6">
              Our Professional <span className="text-primary font-normal">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Expert mechanical repairs, advanced diagnostics, and manufacturer-standard servicing for all makes and models at our Chesterfield workshop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.h1.split('|')[0].trim()}
                description={service.description}
                href={`/services/${service.slug}`}
                icon={iconMap[service.slug] || Wrench}
              />
            ))}
          </div>

          <CTABanner 
            headline="Need an expert opinion on your vehicle?"
            subtext="Contact our team today for honest advice and a transparent quote for any of our services."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

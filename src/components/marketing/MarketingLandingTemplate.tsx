import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import ServiceHero from './ServiceHero';
import TrustBar from './TrustBar';
import FAQAccordion from './FAQAccordion';
import StepProcess from './StepProcess';
import CTABanner from './CTABanner';
import BreadcrumbNav from './BreadcrumbNav';
import ReviewCard from './ReviewCard';
import VehicleMakeGrid from './VehicleMakeGrid';
import AreasList from './AreasList';

interface FAQItem { question: string; answer: string }

interface MarketingLandingTemplateProps {
  type: 'service' | 'vehicle' | 'area' | 'combination';
  slug: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  features?: string[];
  faqs?: FAQItem[];
  schema?: any;
  breadcrumbItems: { label: string; href?: string }[];
  
  // Specific sections
  showVehicleGrid?: boolean;
  showAreasList?: boolean;
  showStepProcess?: boolean;
  steps?: { title: string; description: string }[];
  
  // Custom content sections
  children?: React.ReactNode;
}

const MarketingLandingTemplate: React.FC<MarketingLandingTemplateProps> = ({
  type,
  slug,
  h1,
  title,
  description,
  intro,
  features,
  faqs,
  schema,
  breadcrumbItems,
  showVehicleGrid = true,
  showAreasList = true,
  showStepProcess = true,
  steps,
  children
}) => {
  const defaultSteps = [
    { title: "Book Online", description: "Use our easy online form or call us to schedule your appointment." },
    { title: "Vehicle Drop-off", description: "Bring your car to our Chesterfield workshop at your scheduled time." },
    { title: "Expert Service", description: "Our qualified technicians carry out the work using premium parts." },
    { title: "Ready for Road", description: "We provide a full report and your car is ready for collection." }
  ];

  const actualSteps = steps || defaultSteps;

  const reviews = [
    { name: "Sarah M.", text: "Always take my car here. Honest, transparent pricing and they never do work that isn't needed. Highly recommend for any Ford owner.", vehicle: "Ford Focus" },
    { name: "James T.", text: "Best garage in Chesterfield. They fixed an electrical fault that the main dealer couldn't figure out. Proper specialists.", vehicle: "BMW 3 Series" },
    { name: "Robert H.", text: "Great service for my MOT and service. Fast turnaround and very professional staff. Will definitely be back.", vehicle: "VW Golf" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {schema && <SchemaMarkup schema={schema} />}
      <Header />
      
      <main>
        <div className="absolute top-[110px] md:top-[130px] left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <BreadcrumbNav items={breadcrumbItems} />
          </div>
        </div>

        <ServiceHero 
          title={h1}
          subtitle={intro}
        />
        
        <TrustBar />

        {/* Dynamic Content Section */}
        {children}

        {/* Features / Service Details */}
        {features && features.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extralight text-center mb-16">Key Service Benefits</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {features.map((feature, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
                      <div className="w-8 h-8 rounded-full gradient-primary shrink-0 flex items-center justify-center text-primary-foreground">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-lg leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {showStepProcess && <StepProcess steps={actualSteps} />}

        {/* Reviews Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extralight mb-4">What Our Chesterfield Customers Say</h2>
              <p className="text-lg text-muted-foreground">Trusted by hundreds of local drivers for quality and reliability.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, i) => (
                <ReviewCard key={i} {...review} />
              ))}
            </div>
          </div>
        </section>

        {showVehicleGrid && <VehicleMakeGrid />}

        {faqs && faqs.length > 0 && (
          <FAQAccordion questions={faqs} />
        )}

        {showAreasList && <AreasList />}

        <CTABanner 
          headline="Ready to experience a better standard of car care?"
          subtext="Book your appointment at our Chesterfield workshop today and join hundreds of satisfied local drivers."
        />
      </main>

      <Footer />
    </div>
  );
};

export default MarketingLandingTemplate;

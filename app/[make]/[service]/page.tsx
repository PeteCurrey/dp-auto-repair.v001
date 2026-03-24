import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarketingLandingTemplate from '@/components/marketing/MarketingLandingTemplate';
import { marketingVehicles } from '@/data/marketing-vehicles';
import { marketingServices } from '@/data/marketing-services';

interface PageProps {
  params: {
    make: string;
    service: string;
  };
}

const combinationServices = [
  "car-servicing",
  "mot-preparation",
  "engine-diagnostics",
  "brake-repairs",
  "clutch-replacement",
  "cam-belt-replacement"
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = marketingVehicles[params.make];
  const service = marketingServices[params.service];
  
  if (!vehicle || !service || !combinationServices.includes(params.service)) {
    return {};
  }

  const title = `${vehicle.make} ${service.h1.split('|')[0].trim()} | Specialist Chesterfield`;
  const description = `Specialist ${vehicle.make} ${service.slug.replace(/-/g, ' ')} in Chesterfield. Expert technicians, ${vehicle.make}-standard diagnostics, and quality parts for all models.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://dpautorepair.co.uk/${params.make}/${params.service}`,
    },
    openGraph: {
      title,
      description,
      url: `https://dpautorepair.co.uk/${params.make}/${params.service}`,
      type: 'website',
    }
  };
}

export async function generateStaticParams() {
  const params: { make: string; service: string }[] = [];
  
  // Generate combinations for all makes and the 6 core services
  Object.keys(marketingVehicles).forEach(make => {
    combinationServices.forEach(service => {
      params.push({ make, service });
    });
  });
  
  return params;
}

export default function CombinationPage({ params }: PageProps) {
  const vehicle = marketingVehicles[params.make];
  const service = marketingServices[params.service];

  if (!vehicle || !service || !combinationServices.includes(params.service)) {
    notFound();
  }

  const breadcrumbItems = [
    { label: `${vehicle.make} Specialists`, href: `/vehicles/${params.make}` },
    { label: service.h1.split('|')[0].trim() }
  ];

  const combinationH1 = `${vehicle.make} ${service.h1.split('|')[0].trim()}`;
  const combinationIntro = `Expert ${vehicle.make} ${service.slug.replace(/-/g, ' ')} in Chesterfield. Our qualified technicians use ${vehicle.make}-specific diagnostic equipment and premium components to ensure your vehicle remains in peak condition and your manufacturer warranty is protected.`;

  const combinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': combinationH1,
    'description': `Professional ${service.slug.replace(/-/g, ' ')} for ${vehicle.make} vehicles in Chesterfield.`,
    'provider': {
      '@type': 'AutoRepair',
      'name': 'DP Automotive Repair & Diagnostics',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Unit 5, Vanguard Trading Estate, Britannia Road',
        'addressLocality': 'Chesterfield',
        'postalCode': 'S40 2TZ',
        'addressCountry': 'GB'
      }
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Chesterfield'
    }
  };

  return (
    <MarketingLandingTemplate
      type="combination"
      slug={`${params.make}/${params.service}`}
      h1={combinationH1}
      title={`${vehicle.make} ${service.h1.split('|')[0].trim()} | Specialist Chesterfield`}
      description={`Specialist ${vehicle.make} ${service.slug.replace(/-/g, ' ')} in Chesterfield. Expert technicians, ${vehicle.make}-standard diagnostics, and quality parts for all models.`}
      intro={combinationIntro}
      features={[
        `${vehicle.make} dealer-level diagnostic testing`,
        `Manufacturer-standard ${service.slug.replace(/-/g, ' ')} specifications`,
        `Genuine or OEM-quality ${vehicle.make} components`,
        `${vehicle.make} warranty-safe independent servicing`,
        `Digital service history updates where available`,
        `Transparent, fixed-price ${vehicle.make} repair quotes`
      ]}
      faqs={[
        { question: `Will servicing my ${vehicle.make} at DP Automotive void my warranty?`, answer: `No. We follow ${vehicle.make} service schedules and use OEM-quality parts, which ensures your manufacturer warranty remains fully intact under the Block Exemption Regulation.` },
        { question: `Do you have the specific tools for ${vehicle.make} ${service.slug.replace(/-/g, ' ')}?`, answer: `Yes, we've invested in professional ${vehicle.make}-specific tooling and diagnostic software to ensure all repairs are carried out to the exact standards required for your vehicle.` },
        { question: `Can you handle ${vehicle.make} performance models?`, answer: `Absolutely. We provide expert care for all ${vehicle.make} models, from daily commuters to high-performance variants, ensuring they receive the specialized attention they require.` }
      ]}
      schema={combinationSchema}
      breadcrumbItems={breadcrumbItems}
    >
      {/* Additional Make-specific context */}
      <section className="py-20 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-extralight text-center mb-12">Expert {service.slug.replace(/-/g, ' ')} for all {vehicle.make} Models</h2>
          <div className="bg-muted/30 rounded-3xl p-8 lg:p-12 border border-border/50">
            <p className="text-lg leading-relaxed mb-8">
              Whether you drive a {vehicle.popularModels.slice(0, 3).join(', ')}, or a larger model like the {vehicle.popularModels.slice(-2).join(' or ')}, our Chesterfield workshop is fully equipped to handle your {vehicle.make} with precision.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Quality Guaranteed</h4>
                  <p className="text-sm text-muted-foreground">12-month parts and labour warranty on all {vehicle.make} work.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Fast Turnaround</h4>
                  <p className="text-sm text-muted-foreground">Most {vehicle.make} services completed the same day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLandingTemplate>
  );
}

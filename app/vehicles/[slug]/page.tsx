import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarketingLandingTemplate from '@/components/marketing/MarketingLandingTemplate';
import { marketingVehicles } from '@/data/marketing-vehicles';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = marketingVehicles[params.slug];
  
  if (!vehicle) {
    return {};
  }

  return {
    title: vehicle.title,
    description: vehicle.description,
    keywords: vehicle.keywords,
    alternates: {
      canonical: `https://dpautorepair.co.uk/vehicles/${params.slug}`,
    },
    openGraph: {
      title: vehicle.title,
      description: vehicle.description,
      url: `https://dpautorepair.co.uk/vehicles/${params.slug}`,
      type: 'website',
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(marketingVehicles).map((slug) => ({
    slug,
  }));
}

export default function VehiclePage({ params }: PageProps) {
  const vehicle = marketingVehicles[params.slug];

  if (!vehicle) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Vehicles', href: '/vehicles' },
    { label: `${vehicle.make} Specialists` }
  ];

  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    'name': vehicle.h1,
    'description': vehicle.description,
    'brand': {
      '@type': 'Brand',
      'name': vehicle.make
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Unit 5, Vanguard Trading Estate, Britannia Road',
      'addressLocality': 'Chesterfield',
      'postalCode': 'S40 2TZ',
      'addressCountry': 'GB'
    }
  };

  return (
    <MarketingLandingTemplate
      type="vehicle"
      slug={params.slug}
      h1={vehicle.h1}
      title={vehicle.title}
      description={vehicle.description}
      intro={vehicle.intro || `Expert ${vehicle.make} servicing and repairs in Chesterfield. Our qualified technicians use dealer-level diagnostics to provide manufacturer-standard maintenance for all ${vehicle.make} models.`}
      features={[
        `${vehicle.make} specialized diagnostic equipment`,
        `Manufacturer-standard service schedules`,
        `Genuine or OEM-quality parts`,
        `Digital service record updates`,
        `Expert fault finding and common issue resolution`,
        `Warranty-safe independent servicing`
      ]}
      faqs={[
        { question: `Does a service at DP Automotive void my ${vehicle.make} warranty?`, answer: `No. Under the Block Exemption Regulation, our specialist servicing allows you to maintain your ${vehicle.make} warranty while benefiting from independent garage prices.` },
        { question: `Do you use genuine ${vehicle.make} parts?`, answer: `We use either genuine ${vehicle.make} parts or OEM-equivalent parts that meet or exceed the original manufacturer specification, ensuring maximum reliability.` },
        { question: `Can you update my ${vehicle.make} digital service record?`, answer: `Yes, we have the capability to update digital service records for most modern ${vehicle.make} vehicles, ensuring your history remains complete.` }
      ]}
      schema={vehicleSchema}
      breadcrumbItems={breadcrumbItems}
      showVehicleGrid={false}
    >
      <section className="py-20 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-extralight text-center mb-12">Expert Care for All {vehicle.make} Models</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {vehicle.popularModels.map((model) => (
              <div key={model} className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center font-medium">
                {vehicle.make} {model}
              </div>
            ))}
          </div>
          
          <div className="mt-20">
            <h2 className="text-3xl font-extralight text-center mb-12">Common {vehicle.make} Issues We Solve</h2>
            <div className="space-y-4">
              {vehicle.commonIssues.map((issue, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="w-8 h-8 rounded-full bg-primary/20 shrink-0 flex items-center justify-center text-primary">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingLandingTemplate>
  );
}

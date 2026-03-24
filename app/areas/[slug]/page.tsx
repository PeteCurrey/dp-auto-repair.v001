import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarketingLandingTemplate from '@/components/marketing/MarketingLandingTemplate';
import { marketingAreas } from '@/data/marketing-areas';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const area = marketingAreas[params.slug];
  
  if (!area) {
    return {};
  }

  return {
    title: area.title,
    description: area.description,
    alternates: {
      canonical: `https://dpautorepair.co.uk/areas/${params.slug}`,
    },
    openGraph: {
      title: area.title,
      description: area.description,
      url: `https://dpautorepair.co.uk/areas/${params.slug}`,
      type: 'website',
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(marketingAreas).map((slug) => ({
    slug,
  }));
}

export default function AreaPage({ params }: PageProps) {
  const area = marketingAreas[params.slug];

  if (!area) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Areas', href: '/areas' },
    { label: area.location }
  ];

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `DP Automotive Repair & Diagnostics - Serving ${area.location}`,
    'description': area.description,
    'url': `https://dpautorepair.co.uk/areas/${params.slug}`,
    'telephone': '01246 233483',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Unit 5, Vanguard Trading Estate, Britannia Road',
      'addressLocality': 'Chesterfield',
      'postalCode': 'S40 2TZ',
      'addressCountry': 'GB'
    },
    'areaServed': {
      '@type': 'City',
      'name': area.location
    }
  };

  return (
    <MarketingLandingTemplate
      type="area"
      slug={params.slug}
      h1={area.h1}
      title={area.title}
      description={area.description}
      intro={area.intro}
      features={[
        `Convenient location for ${area.location} residents`,
        `15+ years of expert car repair experience`,
        `Honest, transparent independent garage pricing`,
        `Comprehensive diagnostics for all makes`,
        `Manufacturer-standard servicing`,
        `Fast turnaround and reliable service`
      ]}
      faqs={[
        { question: `How far is DP Automotive from ${area.location}?`, answer: area.distanceInfo },
        { question: `Do you provide a collection service from ${area.location}?`, answer: `Please contact us to discuss your specific requirements. Depending on availability and distance, we may be able to assist with vehicle logistics.` },
        { question: `Why should I choose your Chesterfield garage over a local ${area.location} garage?`, answer: `Many drivers in ${area.location} choose us for our specialized diagnostic equipment and deep technical expertise which often exceeds standard local garages, all while maintaining competitive independent rates.` }
      ]}
      schema={areaSchema}
      breadcrumbItems={breadcrumbItems}
      showAreasList={false}
    />
  );
}

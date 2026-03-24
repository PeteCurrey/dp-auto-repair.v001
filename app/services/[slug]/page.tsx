import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarketingLandingTemplate from '@/components/marketing/MarketingLandingTemplate';
import { marketingServices } from '@/data/marketing-services';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = marketingServices[params.slug];
  
  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `https://dpautorepair.co.uk/services/${params.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://dpautorepair.co.uk/services/${params.slug}`,
      type: 'website',
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(marketingServices).map((slug) => ({
    slug,
  }));
}

export default function ServicePage({ params }: PageProps) {
  const service = marketingServices[params.slug];

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: service.h1.split('|')[0].trim() }
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.h1,
    'description': service.description,
    'provider': {
      '@type': 'AutoRepair',
      'name': 'DP Automotive Repair & Diagnostics',
      'telephone': '01246 233483',
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
      type="service"
      slug={params.slug}
      h1={service.h1}
      title={service.title}
      description={service.description}
      intro={service.intro}
      features={service.features}
      faqs={service.faqs}
      schema={serviceSchema}
      breadcrumbItems={breadcrumbItems}
    />
  );
}

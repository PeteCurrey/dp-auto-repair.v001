import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoPages, SEOPageData } from '@/data/seo-pages';
import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';
import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';
import ServiceComparisonTemplate from '@/components/ServiceComparisonTemplate';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import DVLAMotChecker from '@/components/DVLAMotChecker';

interface PageProps {
  params: {
    make: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(seoPages).map((make) => ({
    make,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = seoPages[params.make];
  
  if (!data) return {};

  if (data.type === 'manufacturer') {
    return {
      title: data.pageTitle || `Expert ${data.manufacturer} Servicing Chesterfield | DP Automotive`,
      description: data.description || `Specialist ${data.manufacturer} servicing and repairs in Chesterfield. Keep your ${data.manufacturer} in perfect condition with our expert technicians.`,
    };
  }

  return {
    title: data.pageTitle,
    description: data.description,
  };
}

export default function DynamicSEOPage({ params }: PageProps) {
  const data = seoPages[params.make];

  if (!data) {
    notFound();
  }

  if (data.type === 'manufacturer') {
    return (
      <ManufacturerLandingTemplate
        manufacturer={data.manufacturer}
        manufacturerLogo={data.manufacturerLogo}
        specialServices={data.specialServices}
        commonIssues={data.commonIssues}
        servicePackages={data.servicePackages}
      />
    );
  }

  if (data.type === 'service') {
    return (
      <ServiceLandingTemplate
        slug={params.make}
        pageTitle={data.pageTitle}
        description={data.description}
        h1={data.h1}
        intro={data.intro}
        serviceType={data.serviceType}
        features={data.features || []}
        faqs={data.faqs || []}
      />
    );
  }

  if (data.type === 'comparison') {
    return (
      <ServiceComparisonTemplate
        slug={params.make}
        pageTitle={data.pageTitle}
        description={data.description}
        h1={data.h1}
        intro={data.intro}
        service1Name={data.service1Name}
        service2Name={data.service2Name}
        comparisonTable={(data as any).comparisonTable || []}
        service1Details={data.service1Details || {
          title: data.service1Name,
          description: '',
          benefits: [],
          frequency: '',
          duration: ''
        }}
        service2Details={data.service2Details || {
          title: data.service2Name,
          description: '',
          benefits: [],
          frequency: '',
          duration: ''
        }}
        faqs={data.faqs}
        showDVLAChecker={!!data.showDVLAChecker}
      />
    );
  }

  if (data.type === 'informational') {
    return (
      <InformationalLandingTemplate
        slug={params.make}
        pageTitle={data.pageTitle}
        description={data.description}
        keywords={data.keywords}
        h1={data.h1}
        intro={data.intro}
        mainContent={data.mainContent}
        quickFacts={data.quickFacts}
        ctaTitle={data.ctaTitle}
        ctaDescription={data.ctaDescription}
        faqs={data.faqs}
        showCalculator={!!(data as any).showCalculator}
        showDVLAChecker={!!data.showDVLAChecker}
      />
    );
  }

  notFound();
}

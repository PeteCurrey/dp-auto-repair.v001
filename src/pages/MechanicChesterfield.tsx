import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const MechanicChesterfield = () => {
  return (
    <ServiceLandingTemplate
      slug="mechanic-chesterfield"
      pageTitle="Mechanic in Chesterfield | Trusted Car Mechanics | DP Automotive"
      description="Looking for a good mechanic in Chesterfield? Honest advice, fair prices, and quality repairs from trusted local mechanics. Book online or call today."
      h1="Trusted Mechanics in Chesterfield"
      intro="If you're searching for a good mechanic in Chesterfield, our friendly team offers clear advice, transparent pricing, and quality workmanship on every job — from quick fixes to complex repairs."
      serviceType="Auto Repair"
      features={[
        'Honest diagnostics and clear quotes before any work',
        'Repairs for all makes and models, new and old',
        'Warranty‑safe servicing following manufacturer schedules',
        'Same‑day repairs available on common faults',
        'MOT preparation, checks, and repairs',
        'Collection and drop‑off available locally'
      ]}
      faqs={[
        {
          question: 'How much does a mechanic cost in Chesterfield?',
          answer: 'Costs depend on the job. We always provide a clear, itemised quote before any work begins, with no hidden fees.'
        },
        {
          question: 'Can you fix my car today?',
          answer: 'For many issues we can offer same‑day service. Call us and we\'ll do our best to fit you in.'
        },
        {
          question: 'Do you work on my make and model?',
          answer: 'Yes — we work on all makes and models, including modern vehicles and classics.'
        },
        {
          question: 'Will this affect my warranty?',
          answer: 'No — we use approved procedures and quality parts to keep your warranty intact.'
        },
        {
          question: 'How do I get a quote?',
          answer: 'Use our contact page to send details or call us for a quick, no‑obligation estimate.'
        }
      ]}
    />
  );
};

export default MechanicChesterfield;

import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const ExhaustReplacementChesterfield = () => {
  return (
    <ServiceLandingTemplate
      slug="exhaust-replacement-chesterfield"
      pageTitle="Exhaust Repair & Replacement in Chesterfield | DP Automotive"
      description="Exhaust repair and replacement in Chesterfield. Fix leaks, corrosion, flexi pipes, boxes, and catalytic converters. Emissions-safe solutions."
      h1="Exhaust Repair & Replacement in Chesterfield"
      intro="Loud exhaust, fumes, or failed emissions? We repair or replace sections as needed — from back boxes and flexi pipes to catalytic converters — with clear advice and fair pricing."
      serviceType="Exhaust service"
      features={[
        'Leak tracing, welding repairs, and section replacements',
        'Back box, mid‑section, and rear silencer replacement',
        'Flexi pipe repair or replacement with quality components',
        'Catalytic converter replacement and security solutions',
        'Exhaust mounts, hangers, and gaskets renewed as needed',
        'Emissions and lambda sensor diagnostics'
      ]}
      faqs={[
        {
          question: 'Can you repair instead of replacing the exhaust?',
          answer: 'Where safe and appropriate, yes. We’ll advise whether a repair is viable or if replacement offers better long‑term value.'
        },
        {
          question: 'Is a loud exhaust legal?',
          answer: 'Excessive noise or leaks can lead to MOT failure and may be illegal on the road. We can restore safe, compliant operation.'
        },
        {
          question: 'How long does exhaust work take?',
          answer: 'Many repairs are completed the same day, depending on parts availability and the extent of corrosion.'
        },
        {
          question: 'Do you replace catalytic converters after theft or failure?',
          answer: 'Yes. We supply quality replacements and can fit anti‑theft measures where appropriate.'
        },
        {
          question: 'Will an exhaust leak damage my engine?',
          answer: 'Leaks can affect emissions readings and engine management. It’s best to repair promptly to avoid further issues.'
        }
      ]}
    />
  );
};

export default ExhaustReplacementChesterfield;

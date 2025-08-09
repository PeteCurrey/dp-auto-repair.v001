import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const TimingChainReplacementChesterfield = () => {
  return (
    <ServiceLandingTemplate
      slug="timing-chain-replacement-chesterfield"
      pageTitle="Timing Chain Replacement in Chesterfield | DP Automotive"
      description="Professional timing chain replacement in Chesterfield. Full kits with guides and tensioners installed to manufacturer procedures."
      h1="Timing Chain Replacement in Chesterfield"
      intro="Rattling on cold start, timing codes, or loss of performance can indicate a worn or stretched chain. We replace complete chain kits using correct locking tools and procedures to restore quiet, reliable running."
      serviceType="Engine service"
      features={[
        'Complete timing chain kits with guides and tensioners',
        'Camshaft and crankshaft seal replacement as needed',
        'Manufacturer timing and torque procedures followed',
        'Fresh oil and filter after repair to protect components',
        'Full diagnostic check and service light reset',
        'Detailed report and care advice for longevity'
      ]}
      faqs={[
        {
          question: 'What are the signs of a failing timing chain?',
          answer: 'Rattling on start‑up, engine warning lights, poor performance, or cam/crank correlation codes can all indicate chain wear.'
        },
        {
          question: 'How long does a timing chain replacement take?',
          answer: 'Typically 1–2 days depending on engine layout and parts availability. We’ll confirm timelines with your quote.'
        },
        {
          question: 'Is it worth repairing, or do I need a new engine?',
          answer: 'In most cases, replacing the chain kit restores normal operation. We’ll assess and advise honestly after inspection.'
        },
        {
          question: 'How can I prevent timing chain issues?',
          answer: 'Regular oil changes with the correct specification oil are key to timing chain health. We’ll advise the ideal interval for your vehicle.'
        },
        {
          question: 'Will this work affect my warranty?',
          answer: 'No — we use approved procedures and OE‑quality parts to keep manufacturer warranties intact.'
        }
      ]}
    />
  );
};

export default TimingChainReplacementChesterfield;

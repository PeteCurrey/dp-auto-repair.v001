import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const OilChangeChesterfield = () => {
  return (
    <ServiceLandingTemplate
      slug="oil-change-chesterfield"
      pageTitle="Oil Change in Chesterfield | Fast, Affordable Oil & Filter | DP Automotive"
      description="Quick oil and filter change in Chesterfield. Correct spec oil for your engine, OE‑quality filters, service light reset, and health check. Book today."
      h1="Oil Change in Chesterfield"
      intro="Fresh oil keeps your engine protected and efficient. We use the correct specification oil for your vehicle, replace the filter, reset service indicators and carry out a complimentary health check."
      serviceType="Oil change"
      features={[
        'Correct specification oil for your exact engine',
        'OE‑quality oil filter replacement',
        'Service light reset and service book updated',
        'Multi‑point safety and fluid health check',
        'Top‑ups for coolant, screenwash, and other essentials',
        'Warranty‑safe servicing that protects your vehicle'
      ]}
      faqs={[
        {
          question: 'How often should I change my oil?',
          answer: 'Most vehicles need an oil change every 6–12 months or 5,000–10,000 miles depending on usage and manufacturer guidance.'
        },
        {
          question: 'How long does an oil change take?',
          answer: 'Typically 45–60 minutes. You can wait in our reception or drop the car off.'
        },
        {
          question: 'What oil do you use?',
          answer: 'We use oil that meets or exceeds your manufacturer\'s specification, ensuring performance and warranty compliance.'
        },
        {
          question: 'Will you reset my service light?',
          answer: 'Yes, we reset the service indicator and record the service accordingly.'
        },
        {
          question: 'Can you combine an oil change with other work?',
          answer: 'Absolutely — let us know what you need and we\'ll provide a combined quote and timescale.'
        }
      ]}
    />
  );
};

export default OilChangeChesterfield;

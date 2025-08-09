import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const BrakeRepairChesterfield = () => {
  return (
    <ServiceLandingTemplate
      slug="brake-repair-chesterfield"
      pageTitle="Brake Repair in Chesterfield | Pads, Discs, ABS | DP Automotive"
      description="Fast, safe brake repair in Chesterfield. Pads and discs, fluid changes, calipers and ABS diagnostics with clear pricing. Book today."
      h1="Brake Repair in Chesterfield"
      intro="Brakes are your car's most important safety system. If you hear squealing, feel vibration under braking, or see a warning light, our technicians can diagnose the issue and get you safely back on the road — often the same day for common parts."
      serviceType="Brake service"
      features={[
        'Brake pad and disc replacement (front and rear)',
        'Brake fluid change and hydraulic bleeding',
        'ABS/ESP diagnostics and wheel speed sensor replacement',
        'Caliper service: clean, lubricate, or replace seized units',
        'Brake hoses, hard lines, and fittings replacement',
        'Handbrake and EPB (electronic parking brake) service'
      ]}
      faqs={[
        {
          question: 'How much does a brake repair cost in Chesterfield?',
          answer: 'Costs vary depending on pads, discs, and any extra parts required. We always provide an itemised quote before work begins.'
        },
        {
          question: 'Do I need new discs every time I change pads?',
          answer: 'Not always. We measure and inspect discs for wear and thickness. If they are below spec or warped, we recommend replacement.'
        },
        {
          question: 'How long does brake work take?',
          answer: 'Many pad and disc jobs are completed the same day. Complex ABS faults may take longer depending on diagnosis and parts availability.'
        },
        {
          question: 'My brake warning light is on—can I drive?',
          answer: 'If a warning light is on or your brakes feel abnormal, it’s safest to call us. We can advise and arrange prompt inspection.'
        },
        {
          question: 'What brands of parts do you use?',
          answer: 'We use OE-quality components that meet or exceed manufacturer specifications to ensure safety and warranty compliance.'
        }
      ]}
    />
  );
};

export default BrakeRepairChesterfield;

import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const ClutchReplacementChesterfield = () => {
  return (
    <ServiceLandingTemplate
      slug="clutch-replacement-chesterfield"
      pageTitle="Clutch Replacement in Chesterfield | Fixed Quotes | DP Automotive"
      description="Expert clutch replacement in Chesterfield. Full clutch kits, hydraulics and flywheels fitted by professionals. Honest, fixed quotations."
      h1="Clutch Replacement in Chesterfield"
      intro="Slipping clutch, juddering, or trouble selecting gears? Our experienced team can diagnose clutch and hydraulic issues and replace components using quality parts — with clear timelines and fixed quotations."
      serviceType="Clutch replacement"
      features={[
        'Complete clutch kits (pressure plate, friction disc, release bearing)',
        'Dual‑mass and single‑mass flywheel inspection and replacement',
        'Hydraulic repairs (master/slave cylinders, pipework, bleeding)',
        'Clutch cable adjustment or replacement where applicable',
        'Gearbox input/output seal replacement while accessible',
        'Road test and post‑fitment adjustments included'
      ]}
      faqs={[
        {
          question: 'How much does a clutch replacement cost?',
          answer: 'Costs vary by make/model and whether a flywheel is required. We provide a fixed, itemised quote before any work starts.'
        },
        {
          question: 'How long does clutch replacement take?',
          answer: 'Typically 1 full day. Some vehicles may require additional time depending on access and parts availability.'
        },
        {
          question: 'Do I need to replace the flywheel?',
          answer: 'We assess the flywheel for wear, heat damage, and play. If it’s within specification, replacement may not be necessary.'
        },
        {
          question: 'Will this affect my warranty?',
          answer: 'No — we follow manufacturer procedures and use OE‑quality parts to maintain your vehicle’s warranty.'
        },
        {
          question: 'Can you diagnose clutch issues first?',
          answer: 'Yes. We’ll inspect the clutch, hydraulics, and gearbox operation to confirm the fault before recommending repairs.'
        }
      ]}
    />
  );
};

export default ClutchReplacementChesterfield;

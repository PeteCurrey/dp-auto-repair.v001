import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const MiniServicingChesterfield = () => {
  const specialServices = [
    'TwinPower Turbo Engine Service',
    'MINI Connected Services',
    'John Cooper Works Performance',
    'Electric MINI Service',
    'ALL4 All-Wheel Drive Service',
    'British Icon Expertise',
    'Countryman/Clubman Service',
    'Classic MINI Heritage Service'
  ];

  const commonIssues = [
    'Turbocharger carbon build-up prevention',
    'Engine timing chain tensioner maintenance',
    'Clutch wear from spirited driving',
    'Brake system wear from performance use',
    'Suspension component wear from sporty setup',
    'Cooling system maintenance for turbo engines',
    'Electrical system complexity in modern models',
    'Oil consumption monitoring in high-performance variants'
  ];

  const servicePackages = [
    {
      name: 'Basic MINI Service',
      price: 'From £95',
      interval: '6 months / 6,000 miles',
      services: [
        'TwinPower Turbo oil and filter',
        'Sport brake inspection',
        'Run-flat tyre inspection',
        'Fluid level checks',
        'Battery test',
        'MINI styling check'
      ]
    },
    {
      name: 'Full MINI Service',
      price: 'From £169',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Basic Service',
        'High-performance air filter',
        'Cabin filter replacement',
        'Brake fluid check',
        'Coolant system inspection',
        'MINI diagnostic scan'
      ]
    },
    {
      name: 'Major MINI Service',
      price: 'From £259',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing chain inspection',
        'JCW performance check',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="MINI"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default MiniServicingChesterfield;
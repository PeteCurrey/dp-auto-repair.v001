import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const LotusServicingChesterfield = () => {
  const specialServices = [
    'Lightweight Sports Car Expertise',
    'Lotus V6 Engine Service',
    'Track Day Preparation',
    'Performance Suspension Setup',
    'British Sports Car Heritage',
    'Elise/Exige Specialist Service',
    'Evora Performance Service',
    'Racing Brake System Service'
  ];

  const commonIssues = [
    'Engine oil consumption monitoring',
    'Clutch wear from performance driving',
    'Brake system wear from track use',
    'Suspension component stress from lightweight design',
    'Cooling system efficiency for track conditions',
    'Electrical system maintenance in older models',
    'Tyre wear patterns from performance use',
    'Fuel system maintenance for premium fuel'
  ];

  const servicePackages = [
    {
      name: 'Essential Lotus Service',
      price: 'From £149',
      interval: '6 months / 5,000 miles',
      services: [
        'Performance engine oil and filter',
        'Track-focused brake inspection',
        'Performance tyre assessment',
        'Fluid level checks',
        'Battery test',
        'Weight-optimized inspection'
      ]
    },
    {
      name: 'Performance Lotus Service',
      price: 'From £269',
      interval: '12 months / 8,000 miles',
      services: [
        'Everything in Essential Service',
        'High-flow air filter service',
        'Climate control service',
        'Suspension geometry check',
        'Cooling system inspection',
        'Lotus diagnostic scan'
      ]
    },
    {
      name: 'Track Lotus Service',
      price: 'From £399',
      interval: '18 months / 12,000 miles',
      services: [
        'Everything in Performance Service',
        'Performance spark plug replacement',
        'Track-ready brake service',
        'Suspension component inspection',
        'Race preparation check'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Lotus"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default LotusServicingChesterfield;
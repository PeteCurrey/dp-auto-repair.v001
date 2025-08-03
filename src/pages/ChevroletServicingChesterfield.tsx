import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const ChevroletServicingChesterfield = () => {
  const specialServices = [
    'LS V8 Engine Service',
    'Small Block V8 Maintenance',
    'Corvette Specialist Service',
    'Camaro Performance Service',
    'OnStar System Diagnostics',
    'American Automatic Transmission Service',
    'Performance Exhaust System Service',
    'Classic Chevrolet Restoration'
  ];

  const commonIssues = [
    'Transmission fluid maintenance requirements',
    'Engine oil consumption monitoring',
    'Electrical system complexity in modern models',
    'Air conditioning system efficiency',
    'Suspension wear patterns from performance use',
    'Fuel system maintenance for ethanol fuels',
    'Brake system wear from vehicle weight',
    'Cooling system maintenance for V8 engines'
  ];

  const servicePackages = [
    {
      name: 'Basic Chevrolet Service',
      price: 'From £95',
      interval: '6 months / 6,000 miles',
      services: [
        'Engine oil and filter change',
        'Visual brake inspection',
        'Tyre pressure and tread check',
        'Fluid level checks',
        'Battery test',
        'Light and indicator check'
      ]
    },
    {
      name: 'Full Chevrolet Service',
      price: 'From £165',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Transmission fluid check',
        'Coolant system inspection',
        'Chevrolet diagnostic scan'
      ]
    },
    {
      name: 'Major Chevrolet Service',
      price: 'From £259',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Transmission service',
        'Suspension inspection',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Chevrolet"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default ChevroletServicingChesterfield;
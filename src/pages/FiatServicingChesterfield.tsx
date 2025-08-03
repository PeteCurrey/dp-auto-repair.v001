import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const FiatServicingChesterfield = () => {
  const specialServices = [
    'MultiAir Engine Technology Service',
    'TwinAir Turbo Engine Service',
    'Fiat 500 Specialist Service',
    'Uconnect System Diagnostics',
    'JTD Diesel Engine Maintenance',
    'Dualogic Transmission Service',
    'Italian City Car Expertise',
    'Stop/Start System Service'
  ];

  const commonIssues = [
    'Engine timing belt replacement requirements',
    'Electrical system faults and sensor issues',
    'Clutch wear in manual transmission models',
    'Air conditioning system refrigerant leaks',
    'Suspension component wear in city driving',
    'DPF issues in diesel models',
    'Stop/start system battery maintenance',
    'Oil consumption monitoring in older engines'
  ];

  const servicePackages = [
    {
      name: 'Basic Fiat Service',
      price: 'From £79',
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
      name: 'Full Fiat Service',
      price: 'From £149',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Brake fluid check',
        'Coolant system inspection',
        'Fiat diagnostic scan'
      ]
    },
    {
      name: 'Major Fiat Service',
      price: 'From £229',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing belt inspection',
        'Suspension check',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Fiat"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default FiatServicingChesterfield;
import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const CitroenServicingChesterfield = () => {
  const specialServices = [
    'HDi Diesel Engine Service',
    'Hydropneumatic Suspension Service',
    'EMP2 Platform Diagnostics',
    'Stop/Start System Maintenance',
    'Citroën Connect Nav Service',
    'BlueHDi Engine Technology',
    'EAT8 Automatic Transmission Service',
    'Advanced Comfort Suspension'
  ];

  const commonIssues = [
    'DPF blockages in HDi diesel engines',
    'Hydropneumatic suspension sphere failures',
    'Electrical system faults and sensor issues',
    'EGR valve carbon build-up problems',
    'Stop/start system battery failures',
    'Timing belt replacement requirements',
    'Air conditioning refrigerant leaks',
    'Clutch wear in manual transmission models'
  ];

  const servicePackages = [
    {
      name: 'Basic Citroën Service',
      price: 'From £85',
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
      name: 'Full Citroën Service',
      price: 'From £155',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Brake fluid check',
        'Coolant system inspection',
        'Citroën diagnostic scan'
      ]
    },
    {
      name: 'Major Citroën Service',
      price: 'From £245',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing belt inspection',
        'Suspension system check',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Citroën"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default CitroenServicingChesterfield;
import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const KiaServicingChesterfield = () => {
  const specialServices = [
    'Smartstream Engine Technology Service',
    'UVO Connect System Diagnostics',
    'Drive Wise Safety Features Service',
    'DCT Transmission Maintenance',
    'Kia Stinger GT Performance Service',
    'EV6 Electric Vehicle Service',
    'Theta Engine Specialist Service',
    'Korean Engineering Excellence'
  ];

  const commonIssues = [
    'GDI engine carbon deposit prevention',
    'DCT transmission software updates',
    'Engine timing chain maintenance',
    'Air conditioning system efficiency',
    'Brake system longevity optimization',
    'DPF regeneration in diesel variants',
    'Battery health monitoring in hybrids',
    'Suspension component wear patterns'
  ];

  const servicePackages = [
    {
      name: 'Basic Kia Service',
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
      name: 'Full Kia Service',
      price: 'From £155',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'DCT fluid inspection',
        'Coolant system check',
        'Kia diagnostic scan'
      ]
    },
    {
      name: 'Major Kia Service',
      price: 'From £245',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing chain inspection',
        'Transmission service',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Kia"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default KiaServicingChesterfield;
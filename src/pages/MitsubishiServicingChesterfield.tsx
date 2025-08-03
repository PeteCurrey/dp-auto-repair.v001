import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const MitsubishiServicingChesterfield = () => {
  const specialServices = [
    'MIVEC Engine Technology Service',
    'S-AWC All-Wheel Control Service',
    'Outlander PHEV Hybrid Service',
    'CVT Transmission Maintenance',
    'Eclipse Cross Service',
    'ASX Compact SUV Service',
    'Japanese Reliability Expertise',
    'Diamond Advantage Service'
  ];

  const commonIssues = [
    'CVT transmission fluid maintenance requirements',
    'MIVEC system timing optimization',
    'All-wheel drive system component maintenance',
    'Air conditioning system efficiency',
    'Brake system longevity optimization',
    'Battery health in PHEV models',
    'Engine timing belt replacement schedules',
    'Suspension component wear patterns'
  ];

  const servicePackages = [
    {
      name: 'Basic Mitsubishi Service',
      price: 'From £89',
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
      name: 'Full Mitsubishi Service',
      price: 'From £159',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'CVT fluid inspection',
        'Coolant system check',
        'Mitsubishi diagnostic scan'
      ]
    },
    {
      name: 'Major Mitsubishi Service',
      price: 'From £249',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing belt inspection',
        'AWD system service',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Mitsubishi"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default MitsubishiServicingChesterfield;
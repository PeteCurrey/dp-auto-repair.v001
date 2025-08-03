import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const HyundaiServicingChesterfield = () => {
  const specialServices = [
    'GDI Engine Technology Service',
    'Blue Link Connectivity Service',
    'SmartSense Safety System Diagnostics',
    'DCT Transmission Service',
    'Hyundai N Performance Service',
    'Hybrid/Electric Vehicle Service',
    'Theta Engine Maintenance',
    'Korean Engineering Expertise'
  ];

  const commonIssues = [
    'GDI engine carbon build-up prevention',
    'DCT transmission fluid maintenance',
    'Engine timing chain maintenance',
    'Air conditioning system efficiency',
    'Suspension component longevity',
    'DPF regeneration in diesel models',
    'Battery maintenance in hybrid models',
    'Brake system wear patterns'
  ];

  const servicePackages = [
    {
      name: 'Basic Hyundai Service',
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
      name: 'Full Hyundai Service',
      price: 'From £155',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'DCT fluid check',
        'Coolant system inspection',
        'Hyundai diagnostic scan'
      ]
    },
    {
      name: 'Major Hyundai Service',
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
      manufacturer="Hyundai"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default HyundaiServicingChesterfield;
import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const HondaServicingChesterfield = () => {
  const specialServices = [
    'VTEC Engine Technology Service',
    'i-VTEC System Maintenance',
    'Honda Sensing Diagnostics',
    'CVT Transmission Service',
    'Honda Connect Infotainment Service',
    'Hybrid System Maintenance',
    'Type R Performance Service',
    'Japanese Reliability Expertise'
  ];

  const commonIssues = [
    'CVT transmission fluid change requirements',
    'Engine timing chain tensioner maintenance',
    'Air conditioning compressor longevity',
    'Brake pad wear patterns',
    'Suspension component durability',
    'Fuel injector cleaning requirements',
    'Battery replacement in hybrid models',
    'Exhaust system corrosion prevention'
  ];

  const servicePackages = [
    {
      name: 'Basic Honda Service',
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
      name: 'Full Honda Service',
      price: 'From £159',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'CVT fluid check',
        'Coolant system inspection',
        'Honda diagnostic scan'
      ]
    },
    {
      name: 'Major Honda Service',
      price: 'From £249',
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
      manufacturer="Honda"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default HondaServicingChesterfield;
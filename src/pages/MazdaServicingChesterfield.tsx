import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const MazdaServicingChesterfield = () => {
  const specialServices = [
    'SKYACTIV Technology Service',
    'Rotary Engine Specialist Service',
    'MZD Connect Infotainment Service',
    'i-ACTIVSENSE Safety System',
    'MX-5 Roadster Specialist Service',
    'SkyActiv-X Engine Technology',
    'Japanese Engineering Excellence',
    'Zoom-Zoom Performance Service'
  ];

  const commonIssues = [
    'SKYACTIV engine carbon build-up prevention',
    'Manual transmission gear oil requirements',
    'Brake system optimization for driving dynamics',
    'Air conditioning system efficiency',
    'Suspension component longevity',
    'DPF issues in diesel SKYACTIV-D engines',
    'Battery maintenance in newer models',
    'Timing chain maintenance in older models'
  ];

  const servicePackages = [
    {
      name: 'Basic Mazda Service',
      price: 'From £89',
      interval: '6 months / 6,000 miles',
      services: [
        'SKYACTIV engine oil and filter',
        'Visual brake inspection',
        'Tyre pressure and tread check',
        'Fluid level checks',
        'Battery test',
        'Light and indicator check'
      ]
    },
    {
      name: 'Full Mazda Service',
      price: 'From £159',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Manual transmission fluid check',
        'Coolant system inspection',
        'Mazda diagnostic scan'
      ]
    },
    {
      name: 'Major Mazda Service',
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
      manufacturer="Mazda"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default MazdaServicingChesterfield;
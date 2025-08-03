import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const AlfaRomeoServicingChesterfield = () => {
  const specialServices = [
    'Twin Spark Engine Servicing',
    'JTD Diesel Engine Maintenance',
    'Q4 AWD System Service',
    'Alfa Romeo DNA System Diagnostics',
    'MultiAir Engine Technology Service',
    'Dual Clutch Transmission Service',
    'Italian Performance Tuning',
    'Brembo Brake System Specialist'
  ];

  const commonIssues = [
    'Engine timing chain wear in Twin Spark engines',
    'Electrical system faults and warning lights',
    'Clutch wear in manual transmission models',
    'Air conditioning compressor failures',
    'Suspension component wear, especially front wishbones',
    'Fuel pump issues in high-mileage vehicles',
    'Oil consumption problems in older engines',
    'Brake disc warping due to performance driving'
  ];

  const servicePackages = [
    {
      name: 'Basic Alfa Romeo Service',
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
      name: 'Full Alfa Romeo Service',
      price: 'From £169',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Brake fluid check',
        'Coolant system inspection',
        'Exhaust system check',
        'Alfa Romeo diagnostic scan'
      ]
    },
    {
      name: 'Major Alfa Romeo Service',
      price: 'From £259',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing chain inspection',
        'Clutch operation check',
        'Suspension inspection',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Alfa Romeo"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default AlfaRomeoServicingChesterfield;
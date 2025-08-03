import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const LamborghiniServicingChesterfield = () => {
  const specialServices = [
    'V10 & V12 Supercar Engine Service',
    'AWD Haldex System Service',
    'Carbon Ceramic Brake Maintenance',
    'Lamborghini Infotainment Service',
    'Italian Supercar Expertise',
    'Track Day Preparation',
    'Performance Exhaust Tuning',
    'Sant\'Agata Genuine Parts'
  ];

  const commonIssues = [
    'Clutch replacement from performance driving',
    'Engine belt service at specific intervals',
    'Brake system wear from track use',
    'Electrical system complexity diagnostics',
    'Cooling system maintenance for track conditions',
    'Suspension component replacement requirements',
    'Fuel system maintenance for premium fuel',
    'Tyre wear from high-performance driving'
  ];

  const servicePackages = [
    {
      name: 'Essential Lamborghini Service',
      price: 'From £399',
      interval: '6 months / 3,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Comprehensive safety inspection',
        'Carbon brake assessment',
        'Performance tyre inspection',
        'Fluid level checks',
        'Electrical system diagnostics'
      ]
    },
    {
      name: 'Comprehensive Lamborghini Service',
      price: 'From £799',
      interval: '12 months / 6,000 miles',
      services: [
        'Everything in Essential Service',
        'High-performance air filter service',
        'Climate control service',
        'Suspension system inspection',
        'Cooling system service',
        'Lamborghini diagnostic scan'
      ]
    },
    {
      name: 'Major Lamborghini Service',
      price: 'From £1,299',
      interval: '24 months / 12,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Belt service replacement',
        'Brake fluid replacement',
        'Complete supercar inspection'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Lamborghini"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default LamborghiniServicingChesterfield;
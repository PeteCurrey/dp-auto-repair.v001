import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const FerrariServicingChesterfield = () => {
  const specialServices = [
    'V8 & V12 Engine Specialist Service',
    'Ferrari F1-Trac System Service',
    'Carbon Ceramic Brake Maintenance',
    'Maranello Infotainment Service',
    'Italian Supercar Expertise',
    'Track Day Preparation',
    'Performance Exhaust Tuning',
    'Ferrari Genuine Parts Service'
  ];

  const commonIssues = [
    'Engine belt replacement at scheduled intervals',
    'Clutch wear from performance driving',
    'Brake system wear from track use',
    'Electrical system complexity diagnostics',
    'Cooling system maintenance for track use',
    'Suspension component replacement',
    'Fuel system maintenance for premium fuel',
    'Tyre wear patterns from high-performance use'
  ];

  const servicePackages = [
    {
      name: 'Essential Ferrari Service',
      price: 'From £299',
      interval: '6 months / 5,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Comprehensive safety inspection',
        'Carbon ceramic brake assessment',
        'Tyre inspection and rotation',
        'Fluid level checks',
        'Battery and electrical system test'
      ]
    },
    {
      name: 'Comprehensive Ferrari Service',
      price: 'From £599',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Essential Service',
        'High-performance air filter replacement',
        'Cabin filter replacement',
        'Suspension system inspection',
        'Cooling system service',
        'Ferrari diagnostic scan'
      ]
    },
    {
      name: 'Major Ferrari Service',
      price: 'From £999',
      interval: '24 months / 15,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Belt replacement service',
        'Brake fluid replacement',
        'Complete system diagnostics'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Ferrari"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default FerrariServicingChesterfield;
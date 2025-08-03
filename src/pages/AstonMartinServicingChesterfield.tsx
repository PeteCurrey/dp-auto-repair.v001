import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const AstonMartinServicingChesterfield = () => {
  const specialServices = [
    'V12 Engine Specialist Service',
    'V8 Twin-Turbo Maintenance',
    'Carbon Fibre Component Care',
    'Aston Martin Infotainment Service',
    'Bespoke Interior Maintenance',
    'Carbon Ceramic Brake Service',
    'Adaptive Suspension Calibration',
    'British Luxury Car Expertise'
  ];

  const commonIssues = [
    'Complex electrical system diagnostics',
    'Engine carbon build-up in direct injection V12s',
    'Transmission control module calibration',
    'Air conditioning system refrigerant specifications',
    'Brake system wear from high-performance use',
    'Suspension component replacement requirements',
    'Fuel system maintenance for premium fuel',
    'Cooling system optimization for track use'
  ];

  const servicePackages = [
    {
      name: 'Essential Aston Martin Service',
      price: 'From £229',
      interval: '6 months / 6,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Comprehensive vehicle inspection',
        'Brake system assessment',
        'Tyre inspection and rotation',
        'Fluid level checks',
        'Battery and electrical system test'
      ]
    },
    {
      name: 'Comprehensive Aston Martin Service',
      price: 'From £399',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Essential Service',
        'High-performance air filter replacement',
        'Cabin filter replacement',
        'Suspension system inspection',
        'Cooling system service',
        'Aston Martin diagnostic scan'
      ]
    },
    {
      name: 'Major Aston Martin Service',
      price: 'From £649',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Transmission service',
        'Brake fluid replacement',
        'Complete system diagnostics'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Aston Martin"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default AstonMartinServicingChesterfield;
import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const JaguarServicingChesterfield = () => {
  const specialServices = [
    'V6 & V8 Supercharged Engine Service',
    'Ingenium Engine Technology Service',
    'All-Wheel Drive System Service',
    'InControl Touch Pro Diagnostics',
    'Adaptive Dynamics Suspension',
    'British Luxury Car Expertise',
    'Performance Brake System Service',
    'Classic Jaguar Restoration'
  ];

  const commonIssues = [
    'Supercharger system maintenance requirements',
    'Complex electrical system diagnostics',
    'Air suspension system component wear',
    'Engine timing chain tensioner issues',
    'Brake system wear from performance use',
    'Cooling system maintenance for supercharged engines',
    'Transmission control module calibration',
    'Premium fuel system requirements'
  ];

  const servicePackages = [
    {
      name: 'Essential Jaguar Service',
      price: 'From £149',
      interval: '6 months / 6,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Multi-point vehicle inspection',
        'Brake system assessment',
        'Tyre inspection and rotation',
        'Fluid level checks',
        'Battery and electrical test'
      ]
    },
    {
      name: 'Comprehensive Jaguar Service',
      price: 'From £279',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Essential Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Suspension system inspection',
        'Coolant system service',
        'Jaguar diagnostic scan'
      ]
    },
    {
      name: 'Major Jaguar Service',
      price: 'From £449',
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
      manufacturer="Jaguar"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default JaguarServicingChesterfield;
import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const BentleyServicingChesterfield = () => {
  const specialServices = [
    'W12 Engine Specialist Service',
    'V8 Twin-Turbo Maintenance',
    'Air Suspension System Service',
    'Bentley Infotainment Diagnostics',
    'Luxury Interior Care',
    'Carbon Ceramic Brake Service',
    'AWD System Maintenance',
    'Bentley Performance Calibration'
  ];

  const commonIssues = [
    'Air suspension pump failures and leaks',
    'Complex electrical system faults',
    'Engine carbon build-up in direct injection engines',
    'Brake system wear due to vehicle weight',
    'Turbocharger oil feed issues',
    'Cooling system problems in high-performance engines',
    'Transmission control module failures',
    'Premium fuel system maintenance requirements'
  ];

  const servicePackages = [
    {
      name: 'Essential Bentley Service',
      price: 'From £189',
      interval: '6 months / 6,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Multi-point vehicle inspection',
        'Brake system assessment',
        'Tyre inspection and rotation',
        'Fluid level checks',
        'Battery and charging system test'
      ]
    },
    {
      name: 'Comprehensive Bentley Service',
      price: 'From £349',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Essential Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Air suspension inspection',
        'Cooling system service',
        'Bentley diagnostic scan'
      ]
    },
    {
      name: 'Major Bentley Service',
      price: 'From £549',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Transmission service',
        'Brake fluid replacement',
        'Comprehensive system diagnostics'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Bentley"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default BentleyServicingChesterfield;
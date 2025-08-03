import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const PorscheServicingChesterfield = () => {
  const specialServices = [
    'Flat-Six Engine Specialist Service',
    'PDK Transmission Service',
    'PASM Suspension Service',
    'PCM Infotainment Diagnostics',
    '911 Specialist Maintenance',
    'Cayenne/Macan SUV Service',
    'German Engineering Excellence',
    'Track Day Preparation'
  ];

  const commonIssues = [
    'IMS bearing replacement in certain 911 models',
    'PDK transmission fluid change requirements',
    'Air conditioning system efficiency',
    'Brake system wear from performance driving',
    'Engine oil consumption monitoring',
    'Suspension component wear from sport settings',
    'Cooling system maintenance for track use',
    'Complex electrical system diagnostics'
  ];

  const servicePackages = [
    {
      name: 'Essential Porsche Service',
      price: 'From £179',
      interval: '6 months / 6,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Multi-point inspection',
        'Performance brake assessment',
        'Tyre inspection and rotation',
        'Fluid level checks',
        'Battery and electrical test'
      ]
    },
    {
      name: 'Comprehensive Porsche Service',
      price: 'From £329',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Essential Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'PDK transmission service',
        'Coolant system inspection',
        'Porsche diagnostic scan'
      ]
    },
    {
      name: 'Major Porsche Service',
      price: 'From £549',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Timing chain inspection',
        'Brake fluid replacement',
        'Performance optimization'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Porsche"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default PorscheServicingChesterfield;
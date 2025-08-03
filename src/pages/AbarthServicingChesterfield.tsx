import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const AbarthServicingChesterfield = () => {
  const specialServices = [
    'T-Jet Turbo Engine Service',
    'Abarth Performance Tuning',
    'Record Monza Exhaust Service',
    'Racing Brake System Service',
    'Competition Suspension Setup',
    'Turbocharger Maintenance',
    'Track Day Preparation',
    'Italian Performance Optimization'
  ];

  const commonIssues = [
    'Turbocharger oil feed line maintenance',
    'Performance exhaust system heat management',
    'Clutch wear from spirited driving',
    'Brake disc and pad wear from track use',
    'Suspension component stress from lowered setup',
    'Engine oil consumption monitoring',
    'Cooling system efficiency for track use',
    'Tyre wear patterns from performance driving'
  ];

  const servicePackages = [
    {
      name: 'Basic Abarth Service',
      price: 'From £99',
      interval: '6 months / 5,000 miles',
      services: [
        'Performance engine oil and filter',
        'Turbo system inspection',
        'Performance brake check',
        'Tyre pressure and wear assessment',
        'Fluid level checks',
        'Exhaust system inspection'
      ]
    },
    {
      name: 'Full Abarth Service',
      price: 'From £169',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Basic Service',
        'High-flow air filter service',
        'Cabin filter replacement',
        'Brake fluid replacement',
        'Cooling system check',
        'Abarth diagnostic scan'
      ]
    },
    {
      name: 'Performance Abarth Service',
      price: 'From £249',
      interval: '18 months / 15,000 miles',
      services: [
        'Everything in Full Service',
        'Performance spark plug replacement',
        'Turbo system service',
        'Suspension geometry check',
        'Track-ready inspection'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Abarth"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default AbarthServicingChesterfield;
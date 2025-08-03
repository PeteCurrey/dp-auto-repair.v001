import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const CupraServicingChesterfield = () => {
  const specialServices = [
    'TSI Turbo Engine Service',
    'Cupra Performance Mode Calibration',
    'DSG Transmission Service',
    'Brembo Brake System Service',
    'Sport Suspension Setup',
    'Cupra Connect Diagnostics',
    'Performance Exhaust Service',
    'Track Mode Optimization'
  ];

  const commonIssues = [
    'DSG transmission fluid change requirements',
    'Turbocharger carbon build-up prevention',
    'DPF regeneration in diesel variants',
    'Performance brake pad wear from spirited driving',
    'Suspension component wear from sport setup',
    'Engine oil consumption monitoring',
    'Cooling system efficiency for performance use',
    'Clutch wear in manual transmission models'
  ];

  const servicePackages = [
    {
      name: 'Basic Cupra Service',
      price: 'From £95',
      interval: '6 months / 6,000 miles',
      services: [
        'Performance engine oil and filter',
        'Sport brake inspection',
        'Tyre pressure and wear check',
        'Fluid level checks',
        'Battery test',
        'Performance exhaust check'
      ]
    },
    {
      name: 'Full Cupra Service',
      price: 'From £169',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Basic Service',
        'High-flow air filter replacement',
        'Cabin filter replacement',
        'DSG transmission service',
        'Cooling system inspection',
        'Cupra diagnostic scan'
      ]
    },
    {
      name: 'Performance Cupra Service',
      price: 'From £249',
      interval: '18 months / 15,000 miles',
      services: [
        'Everything in Full Service',
        'Performance spark plug replacement',
        'Turbo system inspection',
        'Sport suspension check',
        'Track-ready preparation'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Cupra"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default CupraServicingChesterfield;
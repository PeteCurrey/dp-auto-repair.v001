import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const TVRServicingChesterfield = () => {
  const specialServices = [
    'Speed Six Engine Service',
    'AJP V8 Engine Maintenance',
    'Rover V8 Specialist Service',
    'Griffith/Chimaera Service',
    'Cerbera Performance Service',
    'Tuscan Speed Six Service',
    'British Sports Car Expertise',
    'Classic TVR Restoration'
  ];

  const commonIssues = [
    'Engine cooling system maintenance critical for performance',
    'Electrical system complexity and Lucas component issues',
    'Fuel system maintenance for carbureted models',
    'Brake system optimization for high performance use',
    'Suspension component wear from spirited driving',
    'Clutch replacement from performance driving',
    'Body panel and fiberglass maintenance',
    'Oil leak prevention and gasket replacement'
  ];

  const servicePackages = [
    {
      name: 'Basic TVR Service',
      price: 'From £149',
      interval: '3 months / 3,000 miles',
      services: [
        'Performance engine oil and filter',
        'Cooling system inspection',
        'Brake system check',
        'Electrical system test',
        'Fluid level checks',
        'Classic car inspection'
      ]
    },
    {
      name: 'Performance TVR Service',
      price: 'From £299',
      interval: '6 months / 6,000 miles',
      services: [
        'Everything in Basic Service',
        'Carburettor tuning (if applicable)',
        'Ignition system service',
        'Suspension geometry check',
        'Exhaust system inspection',
        'TVR specialist diagnostic'
      ]
    },
    {
      name: 'Comprehensive TVR Service',
      price: 'From £599',
      interval: '12 months / 6,000 miles',
      services: [
        'Everything in Performance Service',
        'Engine timing and tuning',
        'Clutch system inspection',
        'Body and chassis check',
        'Classic restoration consultation'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="TVR"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default TVRServicingChesterfield;
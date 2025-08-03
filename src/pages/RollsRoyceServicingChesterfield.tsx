import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const RollsRoyceServicingChesterfield = () => {
  const specialServices = [
    'V12 Twin-Turbo Engine Service',
    'Spirit of Ecstasy Maintenance',
    'Bespoke Interior Care',
    'Air Suspension System Service',
    'Rolls-Royce Whispers Service',
    'Coach Door Mechanism Service',
    'British Luxury Excellence',
    'Starlight Headliner Maintenance'
  ];

  const commonIssues = [
    'Air suspension system complexity and maintenance',
    'Engine management system sophistication',
    'Electrical system complexity in luxury features',
    'Brake system wear from vehicle weight',
    'Cooling system requirements for V12 engines',
    'Transmission control system calibration',
    'Premium interior component care',
    'Fuel system maintenance for premium fuel'
  ];

  const servicePackages = [
    {
      name: 'Essential Rolls-Royce Service',
      price: 'From £299',
      interval: '6 months / 5,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Luxury vehicle inspection',
        'Air suspension system check',
        'Premium tyre inspection',
        'Fluid level checks',
        'Electrical system diagnostics'
      ]
    },
    {
      name: 'Comprehensive Rolls-Royce Service',
      price: 'From £599',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Essential Service',
        'Air filter replacement',
        'Climate control service',
        'Suspension calibration',
        'Cooling system service',
        'Rolls-Royce diagnostic scan'
      ]
    },
    {
      name: 'Major Rolls-Royce Service',
      price: 'From £999',
      interval: '24 months / 15,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Transmission service',
        'Brake system service',
        'Complete luxury vehicle inspection'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Rolls-Royce"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default RollsRoyceServicingChesterfield;
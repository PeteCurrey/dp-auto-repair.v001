import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const DodgeServicingChesterfield = () => {
  const specialServices = [
    'HEMI V8 Performance Service',
    'SRT High-Performance Maintenance',
    'Challenger/Charger Specialization',
    'RAM Truck Service',
    'Performance Exhaust System Service',
    'Supercharged Engine Maintenance',
    'Heavy-Duty Transmission Service',
    'American Muscle Optimization'
  ];

  const commonIssues = [
    'High-performance engine oil consumption',
    'Transmission cooling system maintenance',
    'Brake system wear from performance driving',
    'Suspension component stress from power output',
    'Exhaust system heat management issues',
    'Fuel system high-flow requirements',
    'Engine timing chain maintenance in V8s',
    'Cooling system upgrades for performance use'
  ];

  const servicePackages = [
    {
      name: 'Basic Dodge Service',
      price: 'From £99',
      interval: '6 months / 5,000 miles',
      services: [
        'High-performance oil and filter change',
        'Performance brake inspection',
        'Tyre pressure and wear check',
        'Fluid level inspection',
        'Battery and charging test',
        'Performance exhaust check'
      ]
    },
    {
      name: 'Full Dodge Service',
      price: 'From £179',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Basic Service',
        'High-flow air filter replacement',
        'Cabin filter replacement',
        'Transmission fluid service',
        'Cooling system inspection',
        'Dodge diagnostic scan'
      ]
    },
    {
      name: 'Major Dodge Service',
      price: 'From £279',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Full Service',
        'Performance spark plug replacement',
        'Transmission service',
        'Suspension system inspection',
        'Comprehensive performance diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Dodge"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default DodgeServicingChesterfield;
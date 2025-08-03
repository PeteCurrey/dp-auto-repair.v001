import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const SuzukiServicingChesterfield = () => {
  const specialServices = [
    'K-Series Engine Service',
    'AllGrip 4WD System Service',
    'Suzuki Connect Service',
    'Swift Sport Performance Service',
    'Jimny Off-Road Specialist',
    'Vitara SUV Service',
    'SHVS Hybrid Technology',
    'Japanese Reliability Expertise'
  ];

  const commonIssues = [
    'Engine timing chain maintenance requirements',
    'CVT transmission fluid service intervals',
    '4WD system component maintenance',
    'Air conditioning system efficiency',
    'Brake system optimization for lightweight design',
    'Suspension component wear patterns',
    'Electrical system sensor maintenance',
    'Oil consumption monitoring in high-mileage vehicles'
  ];

  const servicePackages = [
    {
      name: 'Basic Suzuki Service',
      price: 'From £79',
      interval: '6 months / 6,000 miles',
      services: [
        'K-Series engine oil and filter',
        'Visual brake inspection',
        'Tyre pressure and tread check',
        'Fluid level checks',
        'Battery test',
        'Light and indicator check'
      ]
    },
    {
      name: 'Full Suzuki Service',
      price: 'From £149',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'CVT fluid inspection',
        'Coolant system check',
        'Suzuki diagnostic scan'
      ]
    },
    {
      name: 'Major Suzuki Service',
      price: 'From £229',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing chain inspection',
        'AllGrip system service',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Suzuki"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default SuzukiServicingChesterfield;
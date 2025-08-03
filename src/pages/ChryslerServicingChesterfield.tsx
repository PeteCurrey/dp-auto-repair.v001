import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const ChryslerServicingChesterfield = () => {
  const specialServices = [
    'HEMI V8 Engine Service',
    'Pentastar V6 Maintenance',
    'TorqueFlite Transmission Service',
    'Uconnect System Diagnostics',
    'AWD System Maintenance',
    'Multi-Displacement System Service',
    'Electronic Throttle Control Service',
    'American Muscle Car Specialization'
  ];

  const commonIssues = [
    'Transmission fluid change requirements',
    'Engine oil consumption in high-mileage vehicles',
    'Electrical system complexity issues',
    'Air conditioning system refrigerant leaks',
    'Suspension component wear patterns',
    'Fuel system maintenance requirements',
    'Brake system wear due to vehicle weight',
    'Engine timing chain stretch in older models'
  ];

  const servicePackages = [
    {
      name: 'Basic Chrysler Service',
      price: 'From £95',
      interval: '6 months / 6,000 miles',
      services: [
        'Engine oil and filter change',
        'Visual brake inspection',
        'Tyre pressure and tread check',
        'Fluid level checks',
        'Battery test',
        'Light and indicator check'
      ]
    },
    {
      name: 'Full Chrysler Service',
      price: 'From £165',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Transmission fluid check',
        'Coolant system inspection',
        'Chrysler diagnostic scan'
      ]
    },
    {
      name: 'Major Chrysler Service',
      price: 'From £255',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Transmission service',
        'Suspension inspection',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Chrysler"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default ChryslerServicingChesterfield;
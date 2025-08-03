import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const RenaultServicingChesterfield = () => {
  const specialServices = [
    'Energy dCi Engine Service',
    'TCe Turbo Engine Service',
    'R-Link Infotainment Service',
    'RS Performance Vehicle Service',
    'Twizy Electric Vehicle Service',
    'CVT Transmission Maintenance',
    'French Innovation Excellence',
    'Clio/Megane Specialist Service'
  ];

  const commonIssues = [
    'DPF regeneration problems in dCi engines',
    'Timing belt replacement schedules',
    'EGR valve carbon build-up issues',
    'CVT transmission fluid requirements',
    'Stop/start system battery maintenance',
    'Air conditioning refrigerant leaks',
    'Electrical system sensor faults',
    'Suspension component wear patterns'
  ];

  const servicePackages = [
    {
      name: 'Basic Renault Service',
      price: 'From £85',
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
      name: 'Full Renault Service',
      price: 'From £155',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'CVT fluid check',
        'Coolant system inspection',
        'Renault diagnostic scan'
      ]
    },
    {
      name: 'Major Renault Service',
      price: 'From £245',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing belt inspection',
        'Suspension check',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Renault"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default RenaultServicingChesterfield;
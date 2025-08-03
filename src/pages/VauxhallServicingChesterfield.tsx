import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const VauxhallServicingChesterfield = () => {
  const specialServices = [
    'Ecotec Engine Technology Service',
    'CDTi Diesel Engine Service',
    'IntelliLink Infotainment Service',
    'VXR Performance Service',
    'Corsa/Astra Specialist Service',
    'Insignia Executive Service',
    'British Heritage Excellence',
    'FlexRide Suspension Service'
  ];

  const commonIssues = [
    'Timing chain stretch in Ecotec engines',
    'DPF regeneration issues in CDTi diesel engines',
    'EGR valve carbon build-up problems',
    'Clutch wear in manual transmission models',
    'Air conditioning system refrigerant leaks',
    'Electrical system faults and sensor issues',
    'Suspension component wear patterns',
    'Oil consumption monitoring in high-mileage vehicles'
  ];

  const servicePackages = [
    {
      name: 'Basic Vauxhall Service',
      price: 'From £85',
      interval: '6 months / 6,000 miles',
      services: [
        'Ecotec engine oil and filter',
        'Visual brake inspection',
        'Tyre pressure and tread check',
        'Fluid level checks',
        'Battery test',
        'Light and indicator check'
      ]
    },
    {
      name: 'Full Vauxhall Service',
      price: 'From £155',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Automatic transmission check',
        'Coolant system inspection',
        'Vauxhall diagnostic scan'
      ]
    },
    {
      name: 'Major Vauxhall Service',
      price: 'From £245',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing chain inspection',
        'Transmission service',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Vauxhall"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default VauxhallServicingChesterfield;
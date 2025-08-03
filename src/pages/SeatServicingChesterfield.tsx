import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const SeatServicingChesterfield = () => {
  const specialServices = [
    'TSI Engine Technology Service',
    'TDI Diesel Engine Service',
    'DSG Transmission Service',
    'SEAT Connect Diagnostics',
    'FR Performance Service',
    'Ecomotive Efficiency Service',
    'Spanish Design Engineering',
    'Leon Cupra Specialist Service'
  ];

  const commonIssues = [
    'DSG transmission fluid change requirements',
    'DPF regeneration in TDI engines',
    'Timing belt replacement schedules',
    'EGR valve carbon build-up',
    'Clutch wear in manual models',
    'Air conditioning system efficiency',
    'Suspension component wear',
    'Engine oil consumption monitoring'
  ];

  const servicePackages = [
    {
      name: 'Basic SEAT Service',
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
      name: 'Full SEAT Service',
      price: 'From £155',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'DSG transmission check',
        'Coolant system inspection',
        'SEAT diagnostic scan'
      ]
    },
    {
      name: 'Major SEAT Service',
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
      manufacturer="SEAT"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default SeatServicingChesterfield;
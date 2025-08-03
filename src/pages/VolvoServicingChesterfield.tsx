import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const VolvoServicingChesterfield = () => {
  const specialServices = [
    'Drive-E Engine Technology Service',
    'City Safety System Service',
    'Pilot Assist Technology Service',
    'Geartronic Transmission Service',
    'XC90/XC60 SUV Service',
    'Polestar Performance Service',
    'Swedish Safety Excellence',
    'Sensus Connect Service'
  ];

  const commonIssues = [
    'Engine timing belt replacement schedules',
    'Geartronic transmission software updates',
    'City Safety sensor calibration and maintenance',
    'Air conditioning system efficiency',
    'Brake system wear monitoring',
    'DPF issues in diesel D-series engines',
    'Electrical system complexity management',
    'Suspension component longevity optimization'
  ];

  const servicePackages = [
    {
      name: 'Basic Volvo Service',
      price: 'From £95',
      interval: '6 months / 6,000 miles',
      services: [
        'Drive-E engine oil and filter',
        'Safety system check',
        'Brake system inspection',
        'Tyre pressure and tread check',
        'Fluid level checks',
        'Battery health test'
      ]
    },
    {
      name: 'Full Volvo Service',
      price: 'From £169',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Geartronic transmission check',
        'Coolant system inspection',
        'Volvo diagnostic scan'
      ]
    },
    {
      name: 'Major Volvo Service',
      price: 'From £259',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing belt inspection',
        'Safety system calibration',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Volvo"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default VolvoServicingChesterfield;
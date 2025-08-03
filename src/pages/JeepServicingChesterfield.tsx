import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const JeepServicingChesterfield = () => {
  const specialServices = [
    'Trail Rated 4WD System Service',
    'Pentastar V6 Engine Service',
    'Jeep Wrangler Specialist Service',
    'Uconnect 4C NAV Diagnostics',
    'Rock-Trac Transfer Case Service',
    'Off-Road Suspension Service',
    'American 4x4 Expertise',
    'Rubicon Package Maintenance'
  ];

  const commonIssues = [
    '4WD system component maintenance from off-road use',
    'Differential service requirements',
    'Suspension component wear from trail use',
    'Engine air filter replacement from dusty conditions',
    'Brake system wear from heavy vehicle weight',
    'Transmission cooling system maintenance',
    'Electrical connector protection from elements',
    'Underbody component inspection after off-roading'
  ];

  const servicePackages = [
    {
      name: 'Basic Jeep Service',
      price: 'From £99',
      interval: '6 months / 6,000 miles',
      services: [
        'Engine oil and filter change',
        '4WD system inspection',
        'Off-road brake inspection',
        'Heavy-duty tyre inspection',
        'Fluid level checks',
        'Underbody wash and inspection'
      ]
    },
    {
      name: 'Trail Jeep Service',
      price: 'From £179',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Basic Service',
        'Heavy-duty air filter replacement',
        'Cabin filter replacement',
        'Transfer case fluid check',
        'Coolant system inspection',
        'Jeep diagnostic scan'
      ]
    },
    {
      name: 'Major Jeep Service',
      price: 'From £279',
      interval: '18 months / 15,000 miles',
      services: [
        'Everything in Trail Service',
        'Spark plug replacement',
        'Differential service',
        'Suspension inspection',
        'Off-road readiness check'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Jeep"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default JeepServicingChesterfield;
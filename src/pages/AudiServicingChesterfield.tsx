import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const AudiServicingChesterfield = () => {
  const specialServices = [
    'Audi Service Interval Display Reset',
    'quattro All-Wheel Drive Service',
    'TSI/TFSI Engine Specialists',
    'S tronic Transmission Service',
    'Audi MMI System Updates',
    'DPF Cleaning and Regeneration',
    'Carbon Cleaning Service',
    'Audi Performance Tuning'
  ];

  const commonIssues = [
    'Carbon build-up in TSI/TFSI direct injection engines',
    'Timing chain tensioner failures in older A4 and A6 models',
    'Oil consumption issues in early TFSI engines',
    'S tronic transmission mechatronic unit problems',
    'DPF blockages in TDI diesel engines',
    'Water pump and thermostat failures',
    'Coil pack failures causing misfires',
    'Electronic parking brake and MMI system faults'
  ];

  const servicePackages = [
    {
      name: 'Audi Oil Service',
      price: 'From £109',
      interval: '12 months / 9,300 miles',
      services: [
        'Audi LongLife engine oil',
        'Genuine oil filter replacement',
        'Service interval reset',
        'Visual safety check',
        'Fluid level inspection',
        'AdBlue level check (diesel)'
      ]
    },
    {
      name: 'Audi Inspection',
      price: 'From £189',
      interval: '12 months / 9,300 miles',
      services: [
        'Complete oil service',
        'Air filter inspection',
        'Cabin filter replacement',
        'Brake system check',
        'Audi diagnostic scan',
        'Tyre condition assessment',
        'quattro system check'
      ]
    },
    {
      name: 'Major Audi Service',
      price: 'From £329',
      interval: '24 months / 18,600 miles',
      services: [
        'Everything in Inspection',
        'Spark plug replacement',
        'Air filter replacement',
        'Brake fluid service',
        'Fuel filter replacement',
        'S tronic service (if applicable)',
        'Comprehensive diagnostics'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Audi"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default AudiServicingChesterfield;
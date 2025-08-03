import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const VolkswagenServicingChesterfield = () => {
  const specialServices = [
    'VW Service Interval Indicator Reset',
    'TSI Engine Carbon Cleaning',
    'DSG Transmission Service',
    'VW Diagnostics and Coding',
    'DPF Regeneration Service',
    'Timing Chain Service',
    'VW Infotainment Updates',
    'BlueMotion Technology Service'
  ];

  const commonIssues = [
    'Carbon deposits in TSI direct injection engines',
    'DSG transmission oil and filter service requirements',
    'Timing chain tensioner problems in early TSI engines',
    'DPF blockages in TDI diesel models',
    'Water pump failures, especially in EA888 engines',
    'Coil pack and ignition system failures',
    'Electronic parking brake malfunctions',
    'Infotainment system software issues and updates'
  ];

  const servicePackages = [
    {
      name: 'VW Oil Service',
      price: 'From £99',
      interval: '12 months / 10,000 miles',
      services: [
        'VW approved engine oil',
        'Genuine oil filter',
        'Service indicator reset',
        'Visual inspection',
        'Fluid level checks',
        'AdBlue top-up (diesel)'
      ]
    },
    {
      name: 'VW Inspection Service',
      price: 'From £179',
      interval: '12 months / 10,000 miles',
      services: [
        'Complete oil service',
        'Air filter check',
        'Cabin filter replacement',
        'Brake system inspection',
        'VW diagnostic scan',
        'Battery and charging test',
        'Tyre condition check'
      ]
    },
    {
      name: 'Major VW Service',
      price: 'From £299',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Inspection',
        'Spark plug replacement',
        'Air filter replacement',
        'Brake fluid service',
        'DSG service (if applicable)',
        'Fuel system service',
        'Comprehensive diagnostics'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Volkswagen"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default VolkswagenServicingChesterfield;
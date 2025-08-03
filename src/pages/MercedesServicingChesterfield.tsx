import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const MercedesServicingChesterfield = () => {
  const specialServices = [
    'Mercedes-Benz ASSYST Service Reset',
    'COMAND System Diagnostics',
    'AMG Performance Service',
    'BlueTEC Emissions Service',
    '7G-DCT Transmission Service',
    'AIRMATIC Suspension Service',
    'Mercedes Coding and Programming',
    'AdBlue System Service'
  ];

  const commonIssues = [
    'Air suspension compressor failures in S-Class and E-Class',
    'Oil leaks from engine seals and gaskets',
    'Glow plug failures in diesel models',
    'Electronic issues with COMAND and instrument clusters',
    'Thermostat and coolant system problems',
    'Brake wear sensors and electronic parking brake issues',
    'AdBlue system faults in BlueTEC models',
    'Transmission valve body problems in 7G-DCT gearboxes'
  ];

  const servicePackages = [
    {
      name: 'Mercedes A-Service',
      price: 'From £149',
      interval: '12 months / 10,500 miles',
      services: [
        'Mercedes-Benz engine oil',
        'Oil filter replacement',
        'ASSYST service reset',
        'Visual inspection',
        'Brake fluid level check',
        'AdBlue level check',
        'Tyre pressure check'
      ]
    },
    {
      name: 'Mercedes B-Service',
      price: 'From £249',
      interval: '24 months / 21,000 miles',
      services: [
        'Everything in A-Service',
        'Cabin filter replacement',
        'Brake system inspection',
        'Mercedes diagnostic scan',
        'Battery test',
        'Air filter check',
        'Suspension inspection'
      ]
    },
    {
      name: 'Major Mercedes Service',
      price: 'From £399',
      interval: '48 months / 42,000 miles',
      services: [
        'Everything in B-Service',
        'Spark plug replacement',
        'Air filter replacement',
        'Brake fluid service',
        'Fuel filter service',
        'Transmission service',
        'Comprehensive diagnostics'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Mercedes-Benz"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default MercedesServicingChesterfield;
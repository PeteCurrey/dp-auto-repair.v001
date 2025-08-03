import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const BMWServicingChesterfield = () => {
  const specialServices = [
    'BMW Service Indicator Reset',
    'iDrive System Diagnostics',
    'BMW Oil Service with Genuine Parts',
    'Brake Fluid Service',
    'Microfilter Replacement',
    'BMW Coding and Programming',
    'Differential Service',
    'BMW Performance Diagnostics'
  ];

  const commonIssues = [
    'Oil leaks from valve cover gaskets and oil pan seals',
    'Water pump failures, particularly in N54 and N55 engines',
    'Carbon build-up in direct injection engines requiring cleaning',
    'Thermostat housing leaks causing overheating issues',
    'Fuel injector problems in high-pressure injection systems',
    'Suspension component wear, especially control arm bushings',
    'Electronic parking brake malfunctions',
    'iDrive system software updates and connectivity issues'
  ];

  const servicePackages = [
    {
      name: 'BMW Oil Service',
      price: 'From £119',
      interval: '12 months / 10,000 miles',
      services: [
        'Genuine BMW engine oil',
        'BMW oil filter replacement',
        'Service indicator reset',
        'Visual inspection',
        'Brake fluid level check',
        'Coolant level check'
      ]
    },
    {
      name: 'BMW Inspection I',
      price: 'From £199',
      interval: '12 months / 10,000 miles',
      services: [
        'Complete oil service',
        'Microfilter replacement',
        'Brake inspection',
        'Tyre condition check',
        'BMW diagnostic scan',
        'Battery and charging test',
        'Light function check'
      ]
    },
    {
      name: 'BMW Inspection II',
      price: 'From £349',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Inspection I',
        'Spark plug replacement',
        'Air filter replacement',
        'Brake fluid replacement',
        'Fuel system inspection',
        'Suspension check',
        'Comprehensive diagnostics'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="BMW"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default BMWServicingChesterfield;
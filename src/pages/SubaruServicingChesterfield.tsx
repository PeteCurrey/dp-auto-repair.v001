import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const SubaruServicingChesterfield = () => {
  const specialServices = [
    'Boxer Engine Specialist Service',
    'Symmetrical AWD System Service',
    'EyeSight Safety System Service',
    'CVT Lineartronic Transmission',
    'Subaru Impreza WRX/STI Service',
    'Forester SUV Service',
    'XV Crossover Service',
    'Japanese AWD Expertise'
  ];

  const commonIssues = [
    'Head gasket replacement in older Boxer engines',
    'CVT transmission fluid maintenance requirements',
    'AWD system component wear and maintenance',
    'Oil consumption monitoring in high-performance models',
    'Brake system wear from AWD weight distribution',
    'Cooling system maintenance for Boxer engine layout',
    'Suspension component longevity in AWD models',
    'Turbocharger maintenance in WRX/STI models'
  ];

  const servicePackages = [
    {
      name: 'Basic Subaru Service',
      price: 'From £95',
      interval: '6 months / 6,000 miles',
      services: [
        'Boxer engine oil and filter',
        'AWD system inspection',
        'All-terrain tyre check',
        'Fluid level checks',
        'Battery test',
        'EyeSight system check'
      ]
    },
    {
      name: 'Full Subaru Service',
      price: 'From £165',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'CVT transmission service',
        'Coolant system inspection',
        'Subaru diagnostic scan'
      ]
    },
    {
      name: 'Major Subaru Service',
      price: 'From £259',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'AWD differential service',
        'Performance inspection',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Subaru"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default SubaruServicingChesterfield;
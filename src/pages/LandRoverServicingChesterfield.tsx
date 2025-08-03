import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const LandRoverServicingChesterfield = () => {
  const specialServices = [
    'Terrain Response System Service',
    'Air Suspension Specialist Service',
    'InControl Touch Pro Diagnostics',
    'All-Terrain Progress Control Service',
    'Range Rover Luxury Service',
    'Discovery Off-Road Service',
    'British 4x4 Expertise',
    'Defender Classic & New Service'
  ];

  const commonIssues = [
    'Air suspension system leaks and compressor wear',
    'Terrain Response system calibration',
    'Engine timing chain issues in certain models',
    'Electrical system complexity diagnostics',
    'Brake system wear from vehicle weight',
    'Differential service from off-road use',
    'Cooling system maintenance for towing',
    'Transfer case fluid maintenance'
  ];

  const servicePackages = [
    {
      name: 'Essential Land Rover Service',
      price: 'From £139',
      interval: '6 months / 6,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Air suspension system check',
        'Brake system inspection',
        'All-terrain tyre inspection',
        'Fluid level checks',
        'Electronic system diagnostics'
      ]
    },
    {
      name: 'Comprehensive Land Rover Service',
      price: 'From £269',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Essential Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Transfer case inspection',
        'Coolant system service',
        'Land Rover diagnostic scan'
      ]
    },
    {
      name: 'Major Land Rover Service',
      price: 'From £429',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Transmission service',
        'Differential service',
        'Off-road capability check'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Land Rover"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default LandRoverServicingChesterfield;
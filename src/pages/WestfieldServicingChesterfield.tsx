import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const WestfieldServicingChesterfield = () => {
  const specialServices = [
    'Seven Style Sports Car Service',
    'Kit Car Specialist Maintenance',
    'Ford/Vauxhall Engine Conversions',
    'Sequential Gearbox Service',
    'Track Day Preparation',
    'Caterham Alternative Service',
    'Lightweight Sports Car Expertise',
    'British Kit Car Heritage'
  ];

  const commonIssues = [
    'Engine tuning and carburetor adjustment',
    'Brake system optimization for track use',
    'Suspension setup for road and track',
    'Electrical system simplification and reliability',
    'Clutch adjustment and replacement',
    'Cooling system efficiency for track use',
    'Fuel system maintenance and upgrades',
    'Safety equipment inspection and updates'
  ];

  const servicePackages = [
    {
      name: 'Basic Westfield Service',
      price: 'From £129',
      interval: '3 months / 3,000 miles',
      services: [
        'Engine oil and filter change',
        'Brake system inspection',
        'Tyre pressure and condition check',
        'Fluid level checks',
        'Safety equipment check',
        'Track readiness inspection'
      ]
    },
    {
      name: 'Track Westfield Service',
      price: 'From £249',
      interval: '6 months / 3,000 miles',
      services: [
        'Everything in Basic Service',
        'Carburetor tuning',
        'Suspension setup and alignment',
        'Brake system optimization',
        'Engine timing check',
        'Performance diagnostic'
      ]
    },
    {
      name: 'Competition Westfield Service',
      price: 'From £449',
      interval: '12 months / 6,000 miles',
      services: [
        'Everything in Track Service',
        'Sequential gearbox service',
        'Engine rebuild consultation',
        'Roll cage inspection',
        'Competition preparation'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Westfield"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default WestfieldServicingChesterfield;
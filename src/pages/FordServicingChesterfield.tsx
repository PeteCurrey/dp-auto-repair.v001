import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const FordServicingChesterfield = () => {
  const specialServices = [
    'Ford EcoBoost Engine Servicing',
    'PowerShift Transmission Service',
    'Ford SYNC System Diagnostics',
    'EGR Valve Cleaning',
    'DPF Regeneration',
    'Timing Belt Replacement',
    'Ford Performance Upgrades',
    'Clutch Replacement Specialists'
  ];

  const commonIssues = [
    'EcoBoost engine carbon build-up requiring regular cleaning',
    'PowerShift transmission juddering and gear selection issues',
    'DPF blockages in diesel models, especially Mondeo and Focus',
    'EGR valve problems causing poor idle and emissions failures',
    'Timing belt failures in older Fiesta and Focus models',
    'Clutch wear in manual transmission vehicles',
    'Air conditioning system refrigerant leaks',
    'Suspension component wear in high-mileage vehicles'
  ];

  const servicePackages = [
    {
      name: 'Basic Ford Service',
      price: 'From £89',
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
      name: 'Full Ford Service',
      price: 'From £159',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Brake fluid check',
        'Coolant system inspection',
        'Exhaust system check',
        'Ford diagnostic scan'
      ]
    },
    {
      name: 'Major Ford Service',
      price: 'From £249',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Fuel filter replacement',
        'Timing belt inspection',
        'Clutch operation check',
        'Suspension inspection',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Ford"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default FordServicingChesterfield;
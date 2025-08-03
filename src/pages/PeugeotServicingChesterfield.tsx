import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const PeugeotServicingChesterfield = () => {
  const specialServices = [
    'BlueHDi Diesel Technology Service',
    'PureTech Turbo Engine Service',
    'EAT8 Automatic Transmission',
    'Peugeot i-Cockpit Service',
    'Sport GTi Performance Service',
    'Stop/Start System Maintenance',
    'French Engineering Excellence',
    'Active Suspension Service'
  ];

  const commonIssues = [
    'DPF regeneration issues in BlueHDi engines',
    'PureTech engine wet belt replacement',
    'EAT8 transmission software updates',
    'EGR valve carbon build-up problems',
    'Stop/start system battery maintenance',
    'Air conditioning refrigerant system',
    'Suspension electronic component issues',
    'Timing belt replacement schedules'
  ];

  const servicePackages = [
    {
      name: 'Basic Peugeot Service',
      price: 'From £85',
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
      name: 'Full Peugeot Service',
      price: 'From £155',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'EAT8 fluid check',
        'Coolant system inspection',
        'Peugeot diagnostic scan'
      ]
    },
    {
      name: 'Major Peugeot Service',
      price: 'From £245',
      interval: '24 months / 24,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Wet belt inspection',
        'Suspension system check',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Peugeot"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default PeugeotServicingChesterfield;
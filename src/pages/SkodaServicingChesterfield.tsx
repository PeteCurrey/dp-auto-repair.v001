import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const SkodaServicingChesterfield = () => {
  const specialServices = [
    'TSI Engine Technology Service',
    'DSG Transmission Maintenance',
    'Škoda Connect Diagnostics',
    'TDI Diesel Engine Service',
    'Simply Clever Features Service',
    'Octavia RS Performance Service',
    'Superb Executive Service',
    'Czech Engineering Excellence'
  ];

  const commonIssues = [
    'DSG transmission software updates and servicing',
    'Carbon deposits in TSI direct injection engines',
    'DPF blockages in TDI diesel engines',
    'Timing chain tensioner issues in early TSI engines',
    'Air conditioning system refrigerant maintenance',
    'Electrical system sensor faults',
    'Brake disc wear patterns',
    'Oil consumption monitoring in high-mileage vehicles'
  ];

  const servicePackages = [
    {
      name: 'Basic Škoda Service',
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
      name: 'Full Škoda Service',
      price: 'From £159',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'DSG transmission check',
        'Coolant system inspection',
        'Škoda diagnostic scan'
      ]
    },
    {
      name: 'Major Škoda Service',
      price: 'From £249',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Timing chain inspection',
        'Transmission service',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Škoda"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default SkodaServicingChesterfield;
import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const IsuzuServicingChesterfield = () => {
  const specialServices = [
    'D-Max Pickup Truck Service',
    'Commercial Vehicle Maintenance',
    'Diesel Engine Specialist Service',
    'VGS Variable Geometry System',
    'Heavy-Duty Transmission Service',
    '4WD System Maintenance',
    'Commercial Fleet Support',
    'Japanese Diesel Expertise'
  ];

  const commonIssues = [
    'DPF regeneration and cleaning requirements',
    'EGR valve carbon build-up issues',
    'Diesel fuel system maintenance',
    'Heavy-duty clutch wear patterns',
    '4WD system component maintenance',
    'Commercial use brake wear',
    'Suspension component stress from loading',
    'Cooling system maintenance for commercial use'
  ];

  const servicePackages = [
    {
      name: 'Basic Isuzu Service',
      price: 'From £95',
      interval: '6 months / 6,000 miles',
      services: [
        'Diesel engine oil and filter change',
        'Commercial brake inspection',
        'Heavy-duty tyre inspection',
        'Fluid level checks',
        'Battery and charging test',
        'Light and indicator check'
      ]
    },
    {
      name: 'Full Isuzu Service',
      price: 'From £169',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Fuel filter replacement',
        'DPF system check',
        'Coolant system inspection',
        'Isuzu diagnostic scan'
      ]
    },
    {
      name: 'Commercial Isuzu Service',
      price: 'From £259',
      interval: '18 months / 18,000 miles',
      services: [
        'Everything in Full Service',
        'Heavy-duty transmission service',
        '4WD system inspection',
        'Commercial vehicle safety check',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Isuzu"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default IsuzuServicingChesterfield;
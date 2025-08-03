import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const LexusServicingChesterfield = () => {
  const specialServices = [
    'Lexus Hybrid Synergy Drive Service',
    'V6 & V8 Engine Specialist Service',
    'Lexus Safety System Diagnostics',
    'Enform Infotainment Service',
    'F Sport Performance Service',
    'Multi-Stage Hybrid System Service',
    'Japanese Luxury Expertise',
    'Mark Levinson Audio Service'
  ];

  const commonIssues = [
    'Hybrid battery health monitoring and replacement',
    'Engine carbon build-up in GDI models',
    'Brake system wear patterns from regenerative braking',
    'Air conditioning system efficiency maintenance',
    'Suspension component longevity optimization',
    'Transmission fluid change requirements',
    'Premium fuel system maintenance',
    'Electrical system complexity in luxury models'
  ];

  const servicePackages = [
    {
      name: 'Essential Lexus Service',
      price: 'From £119',
      interval: '6 months / 6,000 miles',
      services: [
        'Premium engine oil and filter change',
        'Hybrid system health check',
        'Brake system inspection',
        'Tyre rotation and inspection',
        'Fluid level checks',
        'Battery and charging test'
      ]
    },
    {
      name: 'Comprehensive Lexus Service',
      price: 'From £229',
      interval: '12 months / 12,000 miles',
      services: [
        'Everything in Essential Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'Hybrid cooling system check',
        'CVT fluid inspection',
        'Lexus diagnostic scan'
      ]
    },
    {
      name: 'Major Lexus Service',
      price: 'From £369',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Comprehensive Service',
        'Spark plug replacement',
        'Transmission service',
        'Hybrid system service',
        'Complete luxury vehicle inspection'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Lexus"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default LexusServicingChesterfield;
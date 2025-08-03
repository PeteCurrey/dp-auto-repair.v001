import { ManufacturerLandingTemplate } from '@/components/ManufacturerLandingTemplate';

const ToyotaServicingChesterfield = () => {
  const specialServices = [
    'Hybrid Synergy Drive Service',
    'D-4D Diesel Engine Service',
    'Toyota Safety Sense Service',
    'CVT Transmission Maintenance',
    'Prius Hybrid Specialist Service',
    'RAV4 AWD System Service',
    'Corolla GR Performance Service',
    'Japanese Quality Excellence'
  ];

  const commonIssues = [
    'Hybrid battery health monitoring and maintenance',
    'CVT transmission fluid service requirements',
    'DPF regeneration in D-4D diesel engines',
    'Engine oil consumption in high-mileage vehicles',
    'Brake system maintenance with regenerative braking',
    'Air conditioning system efficiency optimization',
    'Suspension component longevity',
    'Timing chain maintenance in older petrol engines'
  ];

  const servicePackages = [
    {
      name: 'Basic Toyota Service',
      price: 'From £89',
      interval: '6 months / 6,000 miles',
      services: [
        'Toyota engine oil and filter',
        'Hybrid system inspection',
        'Visual brake inspection',
        'Tyre pressure and tread check',
        'Fluid level checks',
        'Battery health check'
      ]
    },
    {
      name: 'Full Toyota Service',
      price: 'From £159',
      interval: '12 months / 10,000 miles',
      services: [
        'Everything in Basic Service',
        'Air filter replacement',
        'Cabin filter replacement',
        'CVT transmission check',
        'Coolant system inspection',
        'Toyota diagnostic scan'
      ]
    },
    {
      name: 'Major Toyota Service',
      price: 'From £249',
      interval: '24 months / 20,000 miles',
      services: [
        'Everything in Full Service',
        'Spark plug replacement',
        'Hybrid battery service',
        'Transmission service',
        'Comprehensive diagnostic'
      ]
    }
  ];

  return (
    <ManufacturerLandingTemplate
      manufacturer="Toyota"
      specialServices={specialServices}
      commonIssues={commonIssues}
      servicePackages={servicePackages}
    />
  );
};

export default ToyotaServicingChesterfield;
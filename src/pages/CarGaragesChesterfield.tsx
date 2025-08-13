import LocalServiceTemplate from "@/components/LocalServiceTemplate";

const CarGaragesChesterfield = () => {
  return (
    <LocalServiceTemplate
      slug="car-garages-chesterfield"
      pageTitle="Car Garages Chesterfield - Professional Auto Repair Services"
      description="Trusted car garages in Chesterfield offering comprehensive auto repair, servicing, MOT testing, and diagnostics. Professional mechanics you can rely on."
      h1="Car Garages Chesterfield - Professional Auto Repair Services"
      intro="Trusted car garages in Chesterfield offering comprehensive auto repair, servicing, MOT testing, and diagnostics. Professional mechanics you can rely on."
      locationText="Located in the heart of Chesterfield, we serve customers across Derbyshire with professional automotive services."
      services={[
        {
          name: "Vehicle Servicing",
          description: "Comprehensive servicing for all makes and models",
          features: ["Full service", "Interim service", "Major service", "Manufacturer schedules"]
        },
        {
          name: "MOT Testing",
          description: "Official MOT testing with qualified technicians",
          features: ["Class 4 MOT", "Same-day results", "Retests", "Advisory reports"]
        },
        {
          name: "Diagnostics",
          description: "Advanced diagnostic equipment for all systems",
          features: ["Engine diagnostics", "Electronic systems", "Fault code reading", "Performance analysis"]
        },
        {
          name: "Brake Services",
          description: "Complete brake system repairs and maintenance",
          features: ["Brake pads", "Brake discs", "Brake fluid", "System inspection"]
        },
        {
          name: "Clutch Repairs",
          description: "Expert clutch replacement and repair services",
          features: ["Clutch replacement", "Flywheel repair", "Hydraulics", "System diagnostics"]
        },
        {
          name: "Engine Repairs",
          description: "Comprehensive engine repair and maintenance",
          features: ["Engine rebuilds", "Timing belts", "Head gaskets", "Performance tuning"]
        }
      ]}
      yearsInBusiness={15}
      customerCount="2000+"
      averageRating={4.8}
      faqs={[
        {
          question: "What services do you offer?",
          answer: "We offer comprehensive automotive services including MOT testing, vehicle servicing, diagnostics, brake repairs, clutch replacement, and engine repairs."
        },
        {
          question: "Do you service all car makes?",
          answer: "Yes, our qualified technicians can service and repair all car makes and models using the latest diagnostic equipment."
        },
        {
          question: "How long does a service take?",
          answer: "Service times vary depending on the type of service required. A basic service typically takes 1-2 hours, while a full service may take 3-4 hours."
        }
      ]}
    />
  );
};

export default CarGaragesChesterfield;
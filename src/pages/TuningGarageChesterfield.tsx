import TuningLandingTemplate from "@/components/TuningLandingTemplate";

const TuningGarageChesterfield = () => {
  const faqs = [
    {
      question: "What services does your tuning garage offer?",
      answer: "Our tuning garage offers ECU remapping, performance exhaust fabrication, intercooler upgrades, diagnostics, and complete performance packages."
    },
    {
      question: "Do you have dyno testing facilities?",
      answer: "We have access to professional dyno testing facilities to accurately measure performance gains and optimize tuning results."
    },
    {
      question: "Can you work on modified vehicles?",
      answer: "Yes, we specialize in working with modified vehicles and can optimize tuning for existing modifications or plan new upgrade paths."
    },
    {
      question: "What brands do you specialize in tuning?",
      answer: "We work with all major brands including VAG group, BMW, Mercedes, Ford, Japanese imports, and many specialist performance vehicles."
    },
    {
      question: "Do you offer consultation services?",
      answer: "Yes, we provide detailed consultation services to help plan your tuning project and advise on the best approach for your goals and budget."
    },
    {
      question: "How experienced are your tuning technicians?",
      answer: "Our technicians have years of experience in automotive tuning with ongoing training on the latest technologies and techniques."
    }
  ];

  return (
    <TuningLandingTemplate
      slug="tuning-garage-chesterfield"
      pageTitle="Tuning Garage Chesterfield - Professional Performance Centre | DP Automotive"
      description="Premier tuning garage in Chesterfield offering ECU remapping, performance upgrades, and complete tuning solutions. Professional equipment and expert technicians."
      keywords="tuning garage chesterfield, performance garage, tuning specialist chesterfield, car tuning centre"
      h1="Tuning Garage Chesterfield"
      intro="Chesterfield's premier tuning garage, offering comprehensive performance services from ECU remapping to complete vehicle transformations, all delivered by experienced professionals."
      serviceType="Professional Tuning Services"
      heroDescription="Discover Chesterfield's leading tuning garage, where cutting-edge technology meets expert craftsmanship. From ECU remapping to complete performance builds, we deliver exceptional results for enthusiasts and professionals alike."
      faqs={faqs}
      processSteps={[
        "Initial consultation and vehicle assessment",
        "Custom tuning strategy and planning",
        "Professional tuning and modifications",
        "Comprehensive testing and optimization"
      ]}
    />
  );
};

export default TuningGarageChesterfield;
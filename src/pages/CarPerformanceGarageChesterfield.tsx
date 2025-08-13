import TuningLandingTemplate from "@/components/TuningLandingTemplate";

const CarPerformanceGarageChesterfield = () => {
  const faqs = [
    {
      question: "What makes your car performance garage different?",
      answer: "Our garage combines cutting-edge diagnostic equipment, experienced technicians, and comprehensive testing facilities to deliver exceptional performance results."
    },
    {
      question: "Do you work on high-performance and exotic cars?",
      answer: "Yes, we have experience with performance vehicles from BMW M, Audi RS, Mercedes AMG, and exotic brands requiring specialized knowledge."
    },
    {
      question: "Can you handle complete performance builds?",
      answer: "Absolutely. From engine remapping to turbo upgrades and complete performance transformations, we manage projects of all scales."
    },
    {
      question: "What diagnostic equipment do you use?",
      answer: "We use professional Snap-on diagnostic tools, dyno testing facilities, and specialized performance tuning software for accurate results."
    },
    {
      question: "Do you offer performance maintenance services?",
      answer: "Yes, we provide ongoing maintenance and support for performance vehicles including health checks and optimization updates."
    },
    {
      question: "How do you ensure quality in performance work?",
      answer: "Every project includes thorough testing, dyno verification where applicable, and comprehensive road testing to ensure optimal results."
    }
  ];

  return (
    <TuningLandingTemplate
      slug="car-performance-garage-chesterfield"
      pageTitle="Car Performance Garage Chesterfield - Expert Tuning Centre | DP Automotive"
      description="Leading car performance garage in Chesterfield. Specialist tuning centre with professional equipment and expert technicians. ECU remapping and performance upgrades."
      keywords="car performance garage chesterfield, performance garage, tuning centre chesterfield, performance specialist"
      h1="Car Performance Garage Chesterfield"
      intro="Chesterfield's premier car performance garage, equipped with state-of-the-art facilities and staffed by experienced technicians dedicated to maximizing your vehicle's potential."
      serviceType="Car Performance Services"
      heroDescription="Welcome to Chesterfield's leading car performance garage. Our fully equipped facility specializes in ECU remapping, performance upgrades, and complete tuning solutions, backed by professional equipment and years of expertise."
      faqs={faqs}
      processSteps={[
        "Comprehensive vehicle inspection and diagnostics",
        "Performance consultation and planning",
        "Professional installation and tuning",
        "Quality testing and customer handover"
      ]}
    />
  );
};

export default CarPerformanceGarageChesterfield;
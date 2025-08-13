import TuningLandingTemplate from "@/components/TuningLandingTemplate";

const CarTuningChesterfield = () => {
  const faqs = [
    {
      question: "What car tuning services do you offer in Chesterfield?",
      answer: "We offer comprehensive car tuning including ECU remapping, performance exhaust fabrication, intercooler upgrades, and complete performance packages."
    },
    {
      question: "How do I know if my car is suitable for tuning?",
      answer: "Most modern vehicles can benefit from professional tuning. We provide free consultations to assess your car's tuning potential."
    },
    {
      question: "What's the difference between Stage 1, 2, and 3 tuning?",
      answer: "Stage 1 focuses on ECU optimization, Stage 2 adds hardware modifications like exhausts, and Stage 3 involves comprehensive engine upgrades."
    },
    {
      question: "Will car tuning affect my insurance?",
      answer: "You should inform your insurance company of any modifications. We can provide documentation to support your insurance requirements."
    },
    {
      question: "How long does a complete car tuning package take?",
      answer: "Timing varies by package complexity, from same-day ECU remapping to several days for comprehensive performance builds."
    },
    {
      question: "Do you offer tuning for both petrol and diesel vehicles?",
      answer: "Yes, we specialize in tuning both petrol and diesel engines with expertise in all fuel types and engine configurations."
    }
  ];

  return (
    <TuningLandingTemplate
      slug="car-tuning-chesterfield"
      pageTitle="Car Tuning Chesterfield - Complete Performance Solutions | DP Automotive"
      description="Professional car tuning services in Chesterfield. ECU remapping, performance exhausts, and complete tuning packages. Expert advice and competitive prices."
      keywords="car tuning chesterfield, vehicle tuning chesterfield, performance tuning, car performance"
      h1="Car Tuning Chesterfield"
      intro="Comprehensive car tuning services in Chesterfield, from simple ECU remapping to complete performance transformations, all delivered by qualified technicians with years of experience."
      serviceType="Car Tuning"
      heroDescription="Transform your vehicle's performance with professional car tuning in Chesterfield. From ECU remapping to complete performance packages, we deliver safe, reliable, and impressive results for all makes and models."
      faqs={faqs}
      processSteps={[
        "Performance consultation and vehicle assessment",
        "Custom tuning strategy development",
        "Professional installation and optimization",
        "Comprehensive testing and final adjustments"
      ]}
    />
  );
};

export default CarTuningChesterfield;
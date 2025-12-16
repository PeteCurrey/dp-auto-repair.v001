import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const CarDiagnosticsChesterfield = () => {
  const faqs = [
    {
      question: "What does car diagnostic testing include?",
      answer: "Our diagnostic testing uses advanced OBD-II scanners and manufacturer-specific equipment to read fault codes, check sensor data, analyse engine performance, test electronic systems, and identify the root cause of any warning lights or performance issues."
    },
    {
      question: "How long does a car diagnostic take?",
      answer: "A basic diagnostic scan takes around 30-45 minutes. More complex issues requiring detailed analysis may take 1-2 hours. We'll always give you a time estimate when you book."
    },
    {
      question: "How much does car diagnostics cost in Chesterfield?",
      answer: "Our diagnostic service starts from £45 including a full report. If you proceed with repairs, the diagnostic fee is often deducted from the repair cost. Contact us for a specific quote."
    },
    {
      question: "Can you diagnose all car makes and models?",
      answer: "Yes, we have diagnostic equipment for all major manufacturers including BMW, Mercedes, Audi, VW, Ford, Vauxhall, and more. Our technicians are trained on both European and Asian vehicles."
    },
    {
      question: "What if the diagnostic finds multiple issues?",
      answer: "We'll provide you with a detailed report prioritising repairs by urgency and safety. You'll receive a full breakdown of costs so you can make an informed decision about which repairs to proceed with."
    }
  ];

  return (
    <ServiceLandingTemplate
      slug="car-diagnostics-chesterfield"
      pageTitle="Car Diagnostics Chesterfield | Expert Vehicle Fault Finding | DP Automotive"
      description="Professional car diagnostics in Chesterfield. Fast, accurate fault finding using dealer-level equipment. Engine warning lights, fault codes & performance issues diagnosed. Book today."
      h1="Car Diagnostics Chesterfield"
      intro="Warning light on your dashboard? Our expert diagnostic service uses advanced equipment to pinpoint exactly what's wrong with your vehicle. Fast, accurate fault finding at competitive prices."
      serviceType="Car Diagnostics"
      features={[
        "Full OBD-II fault code reading and analysis",
        "Engine management system diagnostics",
        "ABS and traction control system checks",
        "Airbag and safety system diagnostics",
        "Transmission and gearbox fault diagnosis",
        "Sensor testing and live data analysis",
        "Electrical system fault tracing",
        "Detailed written report of all findings"
      ]}
      faqs={faqs}
    />
  );
};

export default CarDiagnosticsChesterfield;

import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const EngineDiagnosticsChesterfield = () => {
  const faqs = [
    {
      question: "What causes the engine management light to come on?",
      answer: "Common causes include faulty oxygen sensors, catalytic converter issues, spark plug problems, mass airflow sensor faults, loose fuel cap, or more serious engine issues. Our diagnostics will identify the exact cause."
    },
    {
      question: "Is it safe to drive with the engine warning light on?",
      answer: "A steady amber light usually means you can drive carefully to get it checked. A flashing light indicates a serious issue – pull over safely and call us. Either way, don't ignore it as it could cause further damage."
    },
    {
      question: "How accurate is engine diagnostic testing?",
      answer: "Our dealer-level diagnostic equipment provides highly accurate results, reading fault codes directly from your car's ECU. Combined with our technicians' experience, we can pinpoint issues that generic scanners might miss."
    },
    {
      question: "Can you reset my engine warning light?",
      answer: "Yes, but simply clearing codes without fixing the underlying issue means the light will return. We always diagnose and recommend the proper repair before clearing any codes."
    },
    {
      question: "Do you diagnose diesel and petrol engines?",
      answer: "Yes, we diagnose all engine types including petrol, diesel, hybrid, and turbocharged engines. We have specialist equipment for diesel injector testing and DPF diagnostics."
    }
  ];

  return (
    <ServiceLandingTemplate
      slug="engine-diagnostics-chesterfield"
      pageTitle="Engine Diagnostics Chesterfield | Warning Light Specialists | DP Automotive"
      description="Expert engine diagnostics in Chesterfield. Check engine light on? We use advanced diagnostic equipment to find faults fast. Petrol & diesel specialists. Book your diagnostic today."
      h1="Engine Diagnostics Chesterfield"
      intro="Engine warning light causing concern? Our specialist engine diagnostics service uses manufacturer-level equipment to identify faults quickly and accurately. Don't let engine problems escalate – get expert diagnosis today."
      serviceType="Engine Diagnostics"
      features={[
        "Complete engine management system analysis",
        "Fuel injection system diagnostics",
        "Ignition system testing and analysis",
        "Emission control system checks",
        "Turbocharger and boost pressure testing",
        "Cylinder compression and leak-down tests",
        "Timing chain/belt inspection diagnostics",
        "Full written report with repair recommendations"
      ]}
      faqs={faqs}
    />
  );
};

export default EngineDiagnosticsChesterfield;

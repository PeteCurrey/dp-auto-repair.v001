import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const CheckEngineLightChesterfield = () => {
  const faqs = [
    {
      question: "Why is my check engine light on?",
      answer: "The check engine light (or engine management light) illuminates when your car's computer detects an issue affecting emissions or engine performance. Common causes include oxygen sensor faults, catalytic converter issues, spark plugs, or mass airflow sensor problems."
    },
    {
      question: "Can I pass my MOT with the engine light on?",
      answer: "No, a vehicle will fail its MOT if the engine management light is illuminated. The light must be off and all emissions-related systems functioning correctly to pass. We can diagnose and repair issues before your MOT."
    },
    {
      question: "What's the difference between amber and red engine lights?",
      answer: "An amber/orange engine light means you should get it checked soon but can usually continue driving carefully. A red light or flashing light indicates a serious problem – reduce speed, avoid heavy acceleration, and get it checked immediately."
    },
    {
      question: "How quickly can you diagnose my engine light?",
      answer: "We can usually diagnose the cause of your engine warning light within 30-60 minutes. For complex issues requiring more detailed testing, we'll advise you of the additional time needed."
    },
    {
      question: "Will the engine light go off after repairs?",
      answer: "After completing repairs, we clear the fault codes and the light should stay off. If the underlying issue is fully resolved, the light won't return. We always verify repairs before returning your vehicle."
    }
  ];

  return (
    <ServiceLandingTemplate
      slug="check-engine-light-chesterfield"
      pageTitle="Check Engine Light Diagnosis Chesterfield | Warning Light Repair | DP Automotive"
      description="Check engine light on? Get fast, accurate diagnosis in Chesterfield. Expert technicians identify the cause and fix the problem. MOT failures resolved. Book your diagnostic today."
      h1="Check Engine Light Diagnosis Chesterfield"
      intro="Dashboard warning light causing worry? Don't ignore it – our expert diagnostic service quickly identifies why your check engine light is on and provides the repairs needed to get it switched off for good."
      serviceType="Check Engine Light Diagnosis"
      features={[
        "Rapid diagnostic scan and code reading",
        "Engine management light investigation",
        "Emission system fault diagnosis",
        "Sensor testing and verification",
        "MOT failure light repairs",
        "Same-day diagnosis available",
        "Clear explanation of findings",
        "Transparent repair quotations"
      ]}
      faqs={faqs}
    />
  );
};

export default CheckEngineLightChesterfield;

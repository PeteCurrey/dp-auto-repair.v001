import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const FaultCodeDiagnosticsChesterfield = () => {
  const faqs = [
    {
      question: "What is an OBD fault code?",
      answer: "OBD (On-Board Diagnostics) fault codes are stored by your car's computer when it detects a problem. They're alphanumeric codes like P0300 that point to specific issues. We can read and interpret these codes to diagnose problems."
    },
    {
      question: "Can I just clear the fault codes myself?",
      answer: "While you can buy cheap code readers, simply clearing codes doesn't fix the problem – they'll return. Professional diagnosis identifies the root cause so repairs address the actual issue, not just the symptom."
    },
    {
      question: "What's the difference between generic and manufacturer codes?",
      answer: "Generic codes (P0xxx) are standardised across all vehicles. Manufacturer-specific codes require dealer-level equipment to read. We have both capabilities, ensuring no codes are missed during diagnosis."
    },
    {
      question: "How many fault codes can a car store?",
      answer: "Modern vehicles can store dozens of fault codes across multiple systems. Some may be historical (issues that cleared themselves) while others are current. We differentiate between these in our report."
    },
    {
      question: "Will reading fault codes tell you exactly what's wrong?",
      answer: "Fault codes point to the area of concern but don't always identify the specific failed component. Our technicians use the codes as a starting point, then perform further tests to pinpoint the exact issue."
    }
  ];

  return (
    <ServiceLandingTemplate
      slug="fault-code-diagnostics-chesterfield"
      pageTitle="Fault Code Reading Chesterfield | OBD Diagnostics | DP Automotive"
      description="Professional OBD fault code reading and clearing in Chesterfield. Check engine light diagnosis, DTC code analysis & interpretation. Expert technicians. Book your scan today."
      h1="Fault Code Diagnostics Chesterfield"
      intro="Need your fault codes read and explained? Our comprehensive OBD diagnostic service reads all stored fault codes, interprets their meaning, and provides clear recommendations for repairs. More than just a code reader – expert analysis included."
      serviceType="Fault Code Diagnostics"
      features={[
        "Full OBD-II port diagnostic scan",
        "Manufacturer-specific code reading",
        "Pending and historical code retrieval",
        "Freeze frame data analysis",
        "Live sensor data monitoring",
        "Code interpretation and explanation",
        "Recommended repair prioritisation",
        "Written diagnostic report provided"
      ]}
      faqs={faqs}
    />
  );
};

export default FaultCodeDiagnosticsChesterfield;

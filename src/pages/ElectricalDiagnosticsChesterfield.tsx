import ServiceLandingTemplate from '@/components/ServiceLandingTemplate';

const ElectricalDiagnosticsChesterfield = () => {
  const faqs = [
    {
      question: "What electrical problems can you diagnose?",
      answer: "We diagnose all vehicle electrical issues including battery drain, alternator faults, starter motor problems, lighting issues, central locking faults, window and mirror malfunctions, and complex CAN-bus network issues."
    },
    {
      question: "My car battery keeps going flat – can you find out why?",
      answer: "Yes, parasitic drain testing is one of our specialities. We use amp clamps and systematic testing to identify which circuit is draining your battery, whether it's a faulty module, aftermarket accessory, or wiring issue."
    },
    {
      question: "Can you diagnose problems with my car's infotainment system?",
      answer: "Yes, we can diagnose issues with head units, speakers, Bluetooth connectivity, reversing cameras, and parking sensors. Some repairs may require specialist coding equipment which we have available."
    },
    {
      question: "How do you trace electrical faults?",
      answer: "We use a combination of diagnostic scanners, multimeters, oscilloscopes, and wiring diagrams to systematically trace faults through your vehicle's electrical system. This methodical approach saves time and money."
    },
    {
      question: "Do you repair wiring harness damage?",
      answer: "Yes, we can repair damaged wiring, corroded connectors, and chafed cables. For extensive damage, we can source and fit replacement wiring looms where available."
    }
  ];

  return (
    <ServiceLandingTemplate
      slug="electrical-diagnostics-chesterfield"
      pageTitle="Car Electrical Diagnostics Chesterfield | Auto Electrician | DP Automotive"
      description="Expert automotive electrical diagnostics in Chesterfield. Battery drain, alternator faults, wiring issues & electronic system problems diagnosed. Skilled auto electricians. Book now."
      h1="Electrical Diagnostics Chesterfield"
      intro="Experiencing electrical gremlins with your vehicle? Our skilled auto electricians use advanced diagnostic equipment to trace and identify electrical faults quickly. From simple battery issues to complex electronic system failures."
      serviceType="Electrical Diagnostics"
      features={[
        "Battery and charging system testing",
        "Alternator output and regulation checks",
        "Starter motor circuit diagnosis",
        "Parasitic battery drain testing",
        "CAN-bus network fault diagnosis",
        "Lighting and signalling system checks",
        "Central locking and security diagnostics",
        "Wiring continuity and resistance testing"
      ]}
      faqs={faqs}
    />
  );
};

export default ElectricalDiagnosticsChesterfield;

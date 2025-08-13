import InformationalLandingTemplate from "@/components/InformationalLandingTemplate";

const LocalMotGarage = () => {
  const pageData = {
    title: "Local MOT Garage Chesterfield - Professional MOT Testing Centre",
    description: "Your trusted local MOT garage in Chesterfield. Professional MOT testing with experienced technicians. Book your MOT test today.",
    
    introduction: "When you need a reliable local MOT garage in Chesterfield, DP Auto Repair & Diagnostics provides professional MOT testing services with qualified technicians and modern equipment.",
    
    mainContent: [
      {
        heading: "Why Choose Our Local MOT Garage?",
        content: "As your local MOT garage in Chesterfield, we offer convenient booking, competitive pricing, and honest assessments. Our qualified technicians ensure your vehicle meets all legal requirements."
      },
      {
        heading: "Professional MOT Testing Equipment",
        content: "Our MOT testing facility is equipped with the latest technology to provide accurate and thorough inspections of your vehicle's safety, roadworthiness, and emissions."
      },
      {
        heading: "Same-Day MOT Results",
        content: "In most cases, we can complete your MOT test on the same day, providing you with immediate results and any necessary advice on repairs or maintenance."
      }
    ],
    
    benefits: [
      "Local Chesterfield garage",
      "Qualified MOT testers",
      "Modern testing equipment",
      "Competitive pricing",
      "Same-day results",
      "Honest assessments",
      "Convenient booking"
    ],
    
    faq: [
      {
        question: "How long does an MOT test take?",
        answer: "A standard MOT test typically takes around 45-60 minutes, depending on the vehicle type and any issues found."
      },
      {
        question: "What happens if my car fails the MOT?",
        answer: "If your vehicle fails, we'll provide a detailed explanation of the issues and can often carry out the necessary repairs on the same day."
      },
      {
        question: "Can I wait while my MOT is being done?",
        answer: "Yes, you're welcome to wait in our comfortable waiting area while we complete your MOT test."
      }
    ]
  };

  return (
    <InformationalLandingTemplate
      slug="local-mot-garage"
      pageTitle={pageData.title}
      description={pageData.description}
      h1={pageData.title}
      intro={pageData.introduction}
      mainContent={pageData.mainContent.map(item => ({
        title: item.heading,
        content: item.content
      }))}
      faqs={pageData.faq}
    />
  );
};

export default LocalMotGarage;
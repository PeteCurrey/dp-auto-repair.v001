import InformationalLandingTemplate from "@/components/InformationalLandingTemplate";

const RemappingGuide = () => {
  const pageData = {
    title: "Car Remapping Guide - Everything You Need to Know About ECU Tuning",
    description: "Complete guide to car remapping and ECU tuning. Learn about the benefits, process, and considerations for vehicle performance enhancement.",
    
    introduction: "Car remapping, also known as ECU tuning, is the process of modifying your vehicle's engine control unit to optimize performance, fuel efficiency, and driving characteristics.",
    
    mainContent: [
      {
        heading: "What is Car Remapping?",
        content: "Car remapping involves modifying the software in your vehicle's ECU (Engine Control Unit) to alter various parameters such as fuel injection, ignition timing, and turbo boost pressure to improve performance."
      },
      {
        heading: "Types of Remaps Available",
        content: "There are several types of remaps: Stage 1 (basic software optimization), Stage 2 (software + hardware modifications), Economy remaps (focused on fuel savings), and Performance remaps (maximum power gains)."
      },
      {
        heading: "Is Remapping Safe for Your Car?",
        content: "When performed by qualified professionals using quality equipment and conservative parameters, remapping is safe and reliable. We ensure all modifications stay within safe operating limits."
      },
      {
        heading: "Legal Considerations",
        content: "Remapping is legal in the UK, but you must inform your insurance company of any modifications. We provide certificates for insurance purposes and can offer warranty-friendly solutions."
      }
    ],
    
    benefits: [
      "Increased power and torque output",
      "Improved fuel economy (up to 20%)",
      "Enhanced throttle response",
      "Better overtaking ability",
      "Smoother power delivery", 
      "Removal of flat spots",
      "Optimized for your driving style"
    ],
    
    faq: [
      {
        question: "How much power gain can I expect?",
        answer: "Power gains typically range from 15-35% depending on your vehicle. Turbocharged engines generally see larger gains than naturally aspirated engines."
      },
      {
        question: "Will remapping affect my warranty?",
        answer: "We offer warranty-friendly remaps that can be undetected by dealers. We also provide switching devices that allow you to return to stock settings."
      },
      {
        question: "How long does the remapping process take?",
        answer: "Most remaps take 2-4 hours to complete, including diagnostics, file modification, installation, and road testing."
      },
      {
        question: "Can any car be remapped?",
        answer: "Most modern vehicles with ECUs can be remapped. We'll assess your specific vehicle to determine the best approach and potential gains."
      }
    ]
  };

  return (
    <InformationalLandingTemplate
      slug="remapping-guide"
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

export default RemappingGuide;
import React from 'react';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import { Clock, AlertTriangle, Activity } from 'lucide-react';

const BrakeDiscLifespan = () => {
  const quickFacts = [
    {
      title: "Average Lifespan",
      value: "50k-70k miles",
      icon: <Clock className="w-6 h-6 text-primary" />
    },
    {
      title: "Warning Signs",
      value: "Scoring/Grooves",
      icon: <AlertTriangle className="w-6 h-6 text-primary" />
    },
    {
      title: "Check Frequency",
      value: "Every Service",
      icon: <Activity className="w-6 h-6 text-primary" />
    }
  ];

  const mainContent = [
    {
      title: "How Long Should Brake Discs Last?",
      content: "Brake discs typically last between 50,000 and 70,000 miles under normal driving conditions. However, their lifespan varies significantly based on driving style, vehicle type, disc quality, and environmental factors. Understanding these variables helps you plan for replacement and maintain safe braking performance.",
      points: [
        "Standard discs: 50,000-70,000 miles",
        "Performance discs: 30,000-50,000 miles",
        "City driving: Shorter lifespan due to frequent braking",
        "Motorway driving: Longer lifespan with less braking",
        "Quality affects longevity significantly",
        "Regular inspection essential for safety"
      ]
    },
    {
      title: "Factors Affecting Brake Disc Lifespan",
      content: "Several factors influence how long your brake discs will last. Understanding these helps you maximize their lifespan and identify when replacement may be needed sooner than expected.",
      points: [
        "Driving style and braking habits",
        "Type of roads regularly driven",
        "Vehicle weight and load carried",
        "Quality of brake pads used",
        "Environmental conditions and climate",
        "Frequency of maintenance and inspection"
      ]
    },
    {
      title: "Signs Your Brake Discs Need Replacement",
      content: "Recognizing the warning signs of worn brake discs is crucial for safety. Some symptoms indicate immediate attention is required, while others suggest replacement should be planned soon.",
      points: [
        "Visible scoring or deep grooves on disc surface",
        "Vibration through steering wheel when braking",
        "Squealing or grinding noises during braking",
        "Brake pedal pulsing or juddering",
        "Increased stopping distances",
        "Visible rust or corrosion damage"
      ]
    },
    {
      title: "Different Types of Brake Discs and Longevity",
      content: "The type of brake disc fitted to your vehicle significantly affects its lifespan and performance characteristics. Understanding the differences helps you make informed replacement decisions.",
      points: [
        "Solid discs: 50,000-70,000 miles (standard cars)",
        "Vented discs: 45,000-65,000 miles (performance cars)",
        "Drilled discs: 30,000-50,000 miles (sports applications)",
        "Slotted discs: 35,000-55,000 miles (performance use)",
        "OEM vs aftermarket quality variations",
        "Performance discs trade longevity for performance"
      ]
    },
    {
      title: "Maximizing Brake Disc Lifespan",
      content: "Proper driving techniques and maintenance practices can significantly extend your brake disc life, saving money and ensuring consistent braking performance.",
      points: [
        "Avoid harsh braking when possible",
        "Use engine braking on downhill sections",
        "Maintain proper following distances",
        "Replace brake pads before they damage discs",
        "Keep brake system properly maintained",
        "Have brakes inspected during regular services"
      ]
    },
    {
      title: "When to Replace Brake Discs",
      content: "Knowing when brake disc replacement is necessary ensures safety and prevents damage to other brake components. Some situations require immediate action while others allow for planned replacement.",
      points: [
        "Disc thickness below minimum specification",
        "Deep scoring that cannot be machined out",
        "Warping causing vibration or juddering",
        "Cracking anywhere on the disc surface",
        "Excessive rust or corrosion damage",
        "When replacing brake pads on high-mileage discs"
      ]
    },
    {
      title: "Brake Disc Replacement Cost and Options",
      content: "Understanding replacement costs and options helps you budget for brake disc service and choose the right parts for your vehicle and driving style.",
      points: [
        "Standard replacement: £100-£300 per axle",
        "Performance discs: £200-£600 per axle",
        "Labour costs: £100-£200 depending on vehicle",
        "OEM vs aftermarket options available",
        "Consider brake pad replacement simultaneously",
        "Machine vs replace decision for minor wear"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I know if my brake discs need replacing?",
      answer: "Look for visible scoring or grooves on the disc surface, listen for grinding noises when braking, and feel for vibration through the steering wheel. If you notice any of these symptoms, have your brakes inspected immediately."
    },
    {
      question: "Can I replace just one brake disc or do I need to do both?",
      answer: "We recommend replacing brake discs in pairs (both front or both rear) to ensure even braking performance. Replacing just one disc can cause uneven braking and premature wear of the new disc."
    },
    {
      question: "Should I replace brake pads when I replace discs?",
      answer: "It's usually recommended to replace brake pads when fitting new discs, especially if the pads have significant wear. New pads on new discs ensure optimal performance and help both components reach their full lifespan."
    },
    {
      question: "Why do brake discs wear out faster in some cars?",
      answer: "Brake disc wear depends on driving style, vehicle weight, brake pad quality, and how often you brake. City driving with frequent stops causes faster wear than motorway driving with gentle, infrequent braking."
    },
    {
      question: "Can warped brake discs be repaired?",
      answer: "Minor warping can sometimes be corrected by machining the disc surface, but this reduces disc thickness. Severely warped discs or those below minimum thickness must be replaced for safety reasons."
    },
    {
      question: "How much does brake disc replacement cost?",
      answer: "Brake disc replacement typically costs £100-£300 per axle for standard discs, plus labour costs of £100-£200. The total cost depends on your vehicle type and whether you choose OEM or aftermarket parts."
    }
  ];

  return (
    <InformationalLandingTemplate
      slug="brake-disc-lifespan"
      pageTitle="How Long Should Brake Discs Last? | Brake Disc Lifespan Guide | DP Auto Repair"
      description="Learn how long brake discs should last (50k-70k miles average), warning signs of wear, and factors affecting lifespan. Expert brake disc service in Chesterfield."
      keywords="brake disc lifespan, how long brake discs last, brake disc replacement, brake maintenance, automotive brakes, Chesterfield"
      h1="How Long Should Brake Discs Last?"
      intro="Brake discs typically last 50,000-70,000 miles under normal conditions, but several factors affect their lifespan. Understanding when to replace brake discs is crucial for safety and avoiding costly damage to other brake components."
      mainContent={mainContent}
      quickFacts={quickFacts}
      faqs={faqs}
      ctaTitle="Brake Disc Service Required?"
      ctaDescription="Concerned about your brake discs? Get expert brake inspection and replacement at DP Auto Repair in Chesterfield. Professional service with competitive pricing."
    />
  );
};

export default BrakeDiscLifespan;
import React from 'react';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import { Clock, AlertTriangle, Shield } from 'lucide-react';

const WhenChangeTimingBelt = () => {
  const quickFacts = [
    {
      title: "Typical Interval",
      value: "60k-100k miles",
      icon: <Clock className="w-6 h-6 text-primary" />
    },
    {
      title: "Engine Damage Risk",
      value: "£2,000-£5,000",
      icon: <AlertTriangle className="w-6 h-6 text-primary" />
    },
    {
      title: "Prevention Cost",
      value: "£300-£800",
      icon: <Shield className="w-6 h-6 text-primary" />
    }
  ];

  const mainContent = [
    {
      title: "When Should You Change Your Timing Belt?",
      content: "Timing belt replacement is one of the most critical maintenance procedures for your vehicle. Most timing belts need replacement between 60,000 and 100,000 miles, but the exact interval depends on your vehicle make, model, and driving conditions.",
      points: [
        "Follow manufacturer's service schedule",
        "Check every 60,000 miles minimum",
        "Replace every 5-7 years regardless of mileage",
        "Consider driving conditions and usage",
        "Don't wait for symptoms to appear",
        "Replace water pump simultaneously"
      ]
    },
    {
      title: "Manufacturer Timing Belt Intervals",
      content: "Different manufacturers specify varying timing belt replacement intervals. These recommendations are based on extensive testing and should be followed to prevent catastrophic engine damage.",
      points: [
        "Ford: 60,000-100,000 miles",
        "Audi/VW: 60,000-80,000 miles", 
        "BMW: 60,000-100,000 miles",
        "Toyota: 60,000-90,000 miles",
        "Honda: 60,000-105,000 miles",
        "Vauxhall: 40,000-100,000 miles"
      ]
    },
    {
      title: "Signs Your Timing Belt Needs Replacement",
      content: "While timing belts should be replaced before symptoms appear, certain warning signs indicate immediate attention is required. Ignoring these symptoms can result in severe engine damage.",
      points: [
        "Visible cracks or fraying on belt",
        "Oil contamination on timing belt",
        "High-pitched squealing from engine",
        "Engine misfiring or rough idling",
        "Metal shavings in the oil",
        "Engine won't turn over"
      ]
    },
    {
      title: "Consequences of Timing Belt Failure",
      content: "Timing belt failure can cause catastrophic engine damage, particularly in interference engines where pistons and valves occupy the same space. Prevention is far more cost-effective than repair.",
      points: [
        "Bent valves requiring replacement",
        "Damaged pistons and cylinder heads",
        "Potential complete engine rebuild",
        "Repair costs from £2,000-£5,000+",
        "Vehicle completely immobilized",
        "Total economic loss on older vehicles"
      ]
    },
    {
      title: "Factors Affecting Timing Belt Lifespan",
      content: "Several factors can reduce your timing belt's lifespan beyond the standard intervals. Understanding these helps you determine if earlier replacement is necessary.",
      points: [
        "Extreme temperature conditions",
        "High humidity environments",
        "Frequent short journeys",
        "Aggressive driving habits",
        "Poor maintenance history",
        "Oil leaks contaminating belt"
      ]
    },
    {
      title: "Timing Belt vs Timing Chain",
      content: "Some vehicles use timing chains instead of belts. Understanding which your vehicle has is crucial for proper maintenance planning and cost expectations.",
      points: [
        "Chains typically last 80,000-120,000 miles",
        "Chains are more durable but more expensive",
        "Belt replacement is less complex",
        "Chain problems often give more warning",
        "Consult handbook for your vehicle type",
        "Professional inspection recommended"
      ]
    },
    {
      title: "What's Included in Timing Belt Service",
      content: "A comprehensive timing belt service includes more than just belt replacement. We replace related components to ensure reliability and prevent future failures.",
      points: [
        "Timing belt replacement",
        "Water pump replacement (recommended)",
        "Tensioner and idler pulley replacement",
        "Drive belt inspection and replacement",
        "Coolant system service",
        "Engine timing verification"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I know when my timing belt needs changing?",
      answer: "Check your vehicle's service book for the manufacturer's recommended interval, typically 60,000-100,000 miles. Don't wait for symptoms - timing belts should be replaced preventively to avoid catastrophic engine damage."
    },
    {
      question: "What happens if I don't change my timing belt on time?",
      answer: "If your timing belt breaks, it can cause severe engine damage costing £2,000-£5,000+ to repair. In interference engines, bent valves and damaged pistons are common, often making repair uneconomical."
    },
    {
      question: "How much does timing belt replacement cost?",
      answer: "Timing belt replacement typically costs £300-£800 depending on your vehicle. This includes labour, the belt, and usually the water pump and tensioners. It's far cheaper than engine repairs if the belt fails."
    },
    {
      question: "Can I drive with a worn timing belt?",
      answer: "It's extremely risky to drive with a worn timing belt. If it breaks while driving, your engine will stop immediately and likely suffer severe damage. Replace it as soon as recommended."
    },
    {
      question: "Should I replace the water pump with the timing belt?",
      answer: "Yes, we strongly recommend replacing the water pump during timing belt service. Since accessing the water pump requires removing the timing belt anyway, it's cost-effective to replace both together."
    },
    {
      question: "How can I make my timing belt last longer?",
      answer: "Follow regular service intervals, fix oil leaks promptly, avoid extreme driving conditions where possible, and have the belt inspected during routine services. However, always replace within manufacturer intervals regardless."
    }
  ];

  return (
    <InformationalLandingTemplate
      slug="when-change-timing-belt"
      pageTitle="When to Change Timing Belt | Replacement Intervals Guide | DP Auto Repair"
      description="Learn when to change your timing belt to prevent engine damage. Replacement intervals 60k-100k miles. Expert timing belt service in Chesterfield with competitive pricing."
      keywords="timing belt replacement, when change timing belt, timing belt interval, engine maintenance, automotive repair, Chesterfield"
      h1="When to Change Timing Belt"
      intro="Timing belt replacement is critical preventive maintenance that protects your engine from catastrophic damage. Most timing belts need replacement every 60,000-100,000 miles or 5-7 years, whichever comes first."
      mainContent={mainContent}
      quickFacts={quickFacts}
      faqs={faqs}
      ctaTitle="Timing Belt Service Required?"
      ctaDescription="Don't risk expensive engine damage. Book your timing belt replacement at DP Auto Repair in Chesterfield. Expert service with comprehensive warranty."
    />
  );
};

export default WhenChangeTimingBelt;
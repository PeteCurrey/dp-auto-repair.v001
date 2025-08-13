import React from 'react';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import DVLAMotChecker from '@/components/DVLAMotChecker';
import { RefreshCw, Clock, CheckCircle } from 'lucide-react';

const MotRetest = () => {
  const quickFacts = [
    {
      title: "Free Retest",
      value: "10 Working Days",
      icon: <RefreshCw className="w-6 h-6 text-primary" />
    },
    {
      title: "Partial Retest",
      value: "20 minutes",
      icon: <Clock className="w-6 h-6 text-primary" />
    },
    {
      title: "Success Rate",
      value: "95%+",
      icon: <CheckCircle className="w-6 h-6 text-primary" />
    }
  ];

  const mainContent = [
    {
      title: "What is an MOT Retest?",
      content: "An MOT retest is required when your vehicle fails its initial MOT test. The good news is that if repairs are completed within 10 working days, the retest is completely free of charge for the items that originally failed.",
      points: [
        "Free retest within 10 working days",
        "Only failed items are re-examined",
        "Same testing station must perform retest",
        "Original failure certificate required",
        "Quick 15-30 minute procedure",
        "High success rate after proper repairs"
      ]
    },
    {
      title: "When Do You Need an MOT Retest?",
      content: "An MOT retest is necessary whenever your vehicle fails its initial test due to defects that prevent it from meeting legal safety and environmental standards. Common failure reasons include lighting, brakes, and emissions issues.",
      points: [
        "Failed initial MOT test",
        "Dangerous defects identified",
        "Major defects requiring repair",
        "Minor defects affecting safety",
        "Emissions levels exceed limits",
        "Advisory items becoming failures"
      ]
    },
    {
      title: "Free Retest Eligibility",
      content: "To qualify for a free retest, specific conditions must be met. Understanding these requirements ensures you don't pay unnecessarily for your retest appointment.",
      points: [
        "Repairs completed within 10 working days",
        "Retest at same testing station",
        "Only failed items will be retested",
        "Original MOT failure certificate present",
        "No additional work performed",
        "Vehicle not driven except for repairs"
      ]
    },
    {
      title: "What Happens During a Retest?",
      content: "The retest process is much quicker than the original MOT as only the previously failed items are re-examined. This focused approach typically takes 15-30 minutes depending on the number of items being retested.",
      points: [
        "Verification of repair completion",
        "Re-examination of failed items only",
        "Pass/fail decision for each item",
        "New MOT certificate if successful",
        "Updated failure certificate if issues remain",
        "Immediate notification of results"
      ]
    },
    {
      title: "Common MOT Retest Items",
      content: "Certain vehicle components are more commonly retested than others. These represent the most frequent failure points that require attention before retest.",
      points: [
        "Brake system components and performance",
        "Light and electrical system function",
        "Exhaust emissions and system integrity",
        "Tyre condition and tread depth",
        "Suspension and steering components",
        "Windscreen and mirror condition"
      ]
    },
    {
      title: "Preparing for Your MOT Retest",
      content: "Proper preparation ensures your retest goes smoothly and successfully. Having the right documentation and ensuring all repairs are complete is essential.",
      points: [
        "Bring original MOT failure certificate",
        "Ensure all repairs are completed",
        "Check repair quality before arrival",
        "Verify all lights are working",
        "Clean vehicle for better inspection",
        "Arrive on time for appointment"
      ]
    },
    {
      title: "After the 10 Working Day Period",
      content: "If you cannot complete repairs within 10 working days, you'll need to pay for a full retest. This is treated as a new MOT test with the full examination procedure.",
      points: [
        "Full MOT test fee applies",
        "Complete vehicle examination required",
        "All systems checked, not just failures",
        "New 12-month certificate if passed",
        "Same comprehensive process as initial test",
        "Additional time required for full test"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long do I have for a free MOT retest?",
      answer: "You have 10 working days from the date of your MOT test failure to complete repairs and book a free retest. This doesn't include weekends or bank holidays. After this period, you'll need to pay for a full retest."
    },
    {
      question: "What do I need to bring for an MOT retest?",
      answer: "Bring your original MOT failure certificate (VT30) which lists all the defects found. This is essential for the free retest. You'll also need photo ID and your vehicle registration document (V5C)."
    },
    {
      question: "Can I get my MOT retest done anywhere?",
      answer: "No, free retests must be done at the same testing station that conducted your original MOT. If you go elsewhere, you'll be charged for a full new MOT test."
    },
    {
      question: "How long does an MOT retest take?",
      answer: "MOT retests are much quicker than the original test, typically taking 15-30 minutes. Only the items that originally failed are re-examined, making it a focused and efficient process."
    },
    {
      question: "What if my vehicle fails the retest again?",
      answer: "If your vehicle fails the retest, you'll receive an updated failure certificate. You can attempt another free retest within the remaining time of your 10 working day period, provided the original station does the work."
    },
    {
      question: "Do I need to book an appointment for my retest?",
      answer: "Yes, we recommend booking your retest appointment to guarantee availability. However, as retests are quick, we can often accommodate same-day requests if you bring your failure certificate."
    }
  ];

  return (
    <InformationalLandingTemplate
      slug="mot-retest"
      pageTitle="MOT Retest Guide | Free Retest Within 10 Days | DP Auto Repair Chesterfield"
      description="Complete guide to MOT retests. Free retest within 10 working days of failure. Quick 15-30 minute process. Expert MOT repairs and retests in Chesterfield."
      keywords="MOT retest, free MOT retest, MOT failure, vehicle retest, Chesterfield MOT, automotive testing"
      h1="MOT Retest"
      intro="Failed your MOT? Don't worry - you're entitled to a free retest within 10 working days. Most retests take just 15-30 minutes and have a very high success rate when repairs are completed properly."
      mainContent={mainContent}
      quickFacts={quickFacts}
      faqs={faqs}
      showDVLAChecker={true}
      dvlaCheckerComponent={<DVLAMotChecker />}
      ctaTitle="Need MOT Repairs & Retest?"
      ctaDescription="Failed your MOT? We can fix most issues same-day and provide your free retest. Expert MOT repairs in Chesterfield with transparent pricing."
    />
  );
};

export default MotRetest;
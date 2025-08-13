import React from 'react';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import DVLAMotChecker from '@/components/DVLAMotChecker';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const HowLongMotTakes = () => {
  const quickFacts = [
    {
      title: "Standard MOT",
      value: "30-60 mins",
      icon: <Clock className="w-6 h-6 text-primary" />
    },
    {
      title: "With Minor Issues",
      value: "1-2 hours",
      icon: <AlertTriangle className="w-6 h-6 text-primary" />
    },
    {
      title: "Same Day Fixes",
      value: "90%+",
      icon: <CheckCircle className="w-6 h-6 text-primary" />
    }
  ];

  const mainContent = [
    {
      title: "How Long Does a Standard MOT Take?",
      content: "A standard MOT test typically takes between 30 to 60 minutes for most vehicles. This timeframe assumes your vehicle is in good condition with no significant issues that require immediate attention during the test.",
      points: [
        "Cars: 45-60 minutes average",
        "Motorcycles: 30-45 minutes",
        "Light commercial vehicles: 60-90 minutes",
        "Booking slot includes preparation time",
        "No major repairs needed during test",
        "All required documentation ready"
      ]
    },
    {
      title: "Factors That Affect MOT Duration",
      content: "Several factors can influence how long your MOT test takes. Understanding these can help you plan your day and avoid unexpected delays.",
      points: [
        "Vehicle condition and age",
        "Previous maintenance history",
        "Garage workload and scheduling",
        "Number of advisories identified",
        "Minor repairs completed during test",
        "Retesting requirements"
      ]
    },
    {
      title: "What Happens During the MOT Test?",
      content: "The MOT test follows a structured process that examines various safety and environmental aspects of your vehicle. Each component is checked systematically to ensure compliance with legal standards.",
      points: [
        "Initial vehicle inspection and registration",
        "Lights and electrical systems check",
        "Steering and suspension examination",
        "Brake system testing",
        "Exhaust emissions analysis",
        "Body structure and security assessment"
      ]
    },
    {
      title: "MOT Test Duration by Vehicle Type",
      content: "Different vehicle categories have varying test durations based on their complexity and the number of systems that need inspection.",
      points: [
        "Class 4 (Cars under 3,000kg): 45-60 minutes",
        "Class 7 (Vans 3,000-3,500kg): 60-90 minutes",
        "Class 1 & 2 (Motorcycles): 30-45 minutes",
        "Historic vehicles: 45-75 minutes",
        "Diesel vehicles: Additional 10-15 minutes for emissions",
        "First-time MOT: May take slightly longer"
      ]
    },
    {
      title: "If Your Vehicle Fails the MOT",
      content: "If your vehicle fails its MOT, don't worry - most failures can be fixed quickly. We provide transparent pricing and same-day repairs for the majority of common MOT failures.",
      points: [
        "Immediate failure analysis and quotation",
        "Most repairs completed same day",
        "Free retest within 10 working days",
        "Only pay for parts and labour used",
        "Clear explanation of all work needed",
        "Priority booking for retest appointments"
      ]
    },
    {
      title: "Preparing for Your MOT to Save Time",
      content: "Proper preparation can significantly reduce your MOT duration. A well-maintained vehicle typically passes first time and requires minimal testing time.",
      points: [
        "Check all lights are working beforehand",
        "Ensure windscreen is clean and undamaged",
        "Test windscreen wipers and washers",
        "Check tyre tread depth and condition",
        "Remove excess items from vehicle",
        "Bring previous MOT certificate and V5C"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long should I expect to wait for my MOT?",
      answer: "Most MOT tests take 45-60 minutes. However, we recommend allowing 1-2 hours in case any minor issues need addressing. You're welcome to wait in our customer area or we can call you when ready."
    },
    {
      question: "Can I get my MOT done while I wait?",
      answer: "Yes, absolutely! Most MOTs are completed while you wait. We have a comfortable waiting area with refreshments. If repairs are needed, we'll discuss options and timescales with you first."
    },
    {
      question: "Why might my MOT take longer than expected?",
      answer: "MOTs may take longer if we discover issues that need immediate attention, if your vehicle requires additional safety checks, or if we're particularly busy. We'll always keep you informed of any delays."
    },
    {
      question: "Do I need to book an MOT appointment?",
      answer: "Yes, we recommend booking your MOT appointment in advance to guarantee your preferred time slot. However, we do accept walk-ins subject to availability on the day."
    },
    {
      question: "What's the longest an MOT test should take?",
      answer: "A standard MOT test should never take more than 90 minutes unless significant repairs are needed. If your test is taking longer, we'll explain why and give you updated timescales."
    },
    {
      question: "Can I speed up my MOT test?",
      answer: "The test duration is largely fixed by legal requirements, but you can help by ensuring your vehicle is clean, accessible, and in good condition. Having all documents ready also helps speed up the process."
    }
  ];

  return (
    <InformationalLandingTemplate
      slug="how-long-mot-takes"
      pageTitle="How Long Does an MOT Take? | Complete Duration Guide | DP Auto Repair"
      description="Find out exactly how long an MOT test takes. Typical duration is 45-60 minutes, but factors affecting timing explained. Book your MOT in Chesterfield today."
      keywords="how long MOT test, MOT duration, MOT time, vehicle testing, Chesterfield MOT, automotive inspection"
      h1="How Long Does an MOT Take?"
      intro="Planning your MOT appointment? Most MOT tests take 45-60 minutes, but the exact duration depends on your vehicle type and condition. Here's everything you need to know about MOT test timing."
      mainContent={mainContent}
      quickFacts={quickFacts}
      faqs={faqs}
      showDVLAChecker={true}
      dvlaCheckerComponent={<DVLAMotChecker />}
      ctaTitle="Need an MOT Test?"
      ctaDescription="Book your MOT test at DP Auto Repair in Chesterfield. Fast, efficient testing with same-day repairs available for most issues."
    />
  );
};

export default HowLongMotTakes;
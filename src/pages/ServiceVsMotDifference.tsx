import React from 'react';
import ServiceComparisonTemplate from '@/components/ServiceComparisonTemplate';
import DVLAMotChecker from '@/components/DVLAMotChecker';

const ServiceVsMotDifference = () => {
  const comparisonTable = [
    {
      feature: "Purpose",
      service1: "Maintenance & Performance",
      service2: "Safety & Roadworthiness",
      description: "The fundamental purpose of each inspection"
    },
    {
      feature: "Frequency",
      service1: "Every 6-12 months",
      service2: "Annually (vehicles 3+ years)",
      description: "How often each is required"
    },
    {
      feature: "Legal Requirement",
      service1: false,
      service2: true,
      description: "Whether it's required by law"
    },
    {
      feature: "Cost",
      service1: "£150-£400",
      service2: "£35-£55",
      description: "Typical price range"
    },
    {
      feature: "Duration",
      service1: "2-4 hours",
      service2: "30-60 minutes",
      description: "Time required for completion"
    },
    {
      feature: "Oil Change",
      service1: true,
      service2: false,
      description: "Whether oil and filter are changed"
    },
    {
      feature: "Brake Inspection",
      service1: true,
      service2: true,
      description: "Brake system checking"
    },
    {
      feature: "Emissions Test",
      service1: false,
      service2: true,
      description: "Environmental compliance testing"
    },
    {
      feature: "Engine Tuning",
      service1: true,
      service2: false,
      description: "Performance optimization"
    },
    {
      feature: "Certificate Issued",
      service1: false,
      service2: true,
      description: "Official documentation provided"
    }
  ];

  const service1Details = {
    title: "Car Service",
    description: "A comprehensive maintenance procedure designed to keep your vehicle running at peak performance. Services include oil changes, filter replacements, fluid top-ups, and detailed inspections of all major components.",
    benefits: [
      "Extends vehicle lifespan",
      "Improves fuel efficiency",
      "Prevents costly breakdowns",
      "Maintains manufacturer warranty",
      "Optimizes performance",
      "Early problem detection"
    ],
    frequency: "Every 6-12 months",
    duration: "2-4 hours"
  };

  const service2Details = {
    title: "MOT Test",
    description: "A mandatory annual safety test for vehicles over 3 years old. The MOT checks safety, roadworthiness, and environmental standards to ensure your vehicle meets legal requirements for road use.",
    benefits: [
      "Legal compliance",
      "Safety assurance",
      "Environmental protection",
      "Insurance validity",
      "Resale value protection",
      "Peace of mind"
    ],
    frequency: "Annually (vehicles 3+ years)",
    duration: "30-60 minutes"
  };

  const faqs = [
    {
      question: "Do I need both a service and MOT?",
      answer: "Yes, both serve different purposes. An MOT is a legal requirement for roadworthiness, while a service maintains your vehicle's performance and reliability. Many customers book them together for convenience."
    },
    {
      question: "Can I get my service and MOT done at the same time?",
      answer: "Absolutely! Many customers prefer to book their service and MOT together. This saves time and often costs less than separate visits. We can identify any MOT issues during the service."
    },
    {
      question: "What happens if my car fails its MOT?",
      answer: "If your vehicle fails its MOT, we'll provide a detailed report of the issues. We can usually fix most problems on the same day and perform a free retest within 10 working days."
    },
    {
      question: "How much does a service cost compared to an MOT?",
      answer: "An MOT test costs £35-£55, while a full service typically costs £150-£400 depending on your vehicle and service level. The service includes parts and labour, while MOT is just the test."
    },
    {
      question: "Which is more important - service or MOT?",
      answer: "Both are important but serve different purposes. MOT is legally required for road use, while servicing prevents breakdowns and maintains performance. Skipping either can lead to problems."
    },
    {
      question: "Can I drive without an MOT certificate?",
      answer: "No, driving without a valid MOT certificate is illegal and can result in fines up to £1,000. Your insurance may also be invalid. You can only drive to a pre-booked MOT appointment."
    }
  ];

  return (
    <ServiceComparisonTemplate
      slug="service-vs-mot-difference"
      pageTitle="What is the Difference Between Service and MOT? | DP Auto Repair"
      description="Understand the key differences between car servicing and MOT tests. Expert comparison of purpose, cost, duration and legal requirements. Book both services in Chesterfield."
      keywords="service vs MOT, MOT test, car service, vehicle maintenance, Chesterfield, automotive, legal requirements"
      h1="What is the Difference Between Service and MOT?"
      intro="Understanding the difference between a car service and MOT test is crucial for every vehicle owner. Both are important but serve completely different purposes in keeping your vehicle safe, legal, and running efficiently."
      service1Name="Car Service"
      service2Name="MOT Test"
      comparisonTable={comparisonTable}
      service1Details={service1Details}
      service2Details={service2Details}
      faqs={faqs}
      showDVLAChecker={true}
      dvlaCheckerComponent={<DVLAMotChecker />}
    />
  );
};

export default ServiceVsMotDifference;
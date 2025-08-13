import React from 'react';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import { Clock, Settings, Wrench } from 'lucide-react';

const HowLongServiceTakes = () => {
  const quickFacts = [
    {
      title: "Basic Service",
      value: "1-2 hours",
      icon: <Clock className="w-6 h-6 text-primary" />
    },
    {
      title: "Full Service",
      value: "3-4 hours",
      icon: <Settings className="w-6 h-6 text-primary" />
    },
    {
      title: "Major Service",
      value: "Half Day",
      icon: <Wrench className="w-6 h-6 text-primary" />
    }
  ];

  const mainContent = [
    {
      title: "How Long Does a Car Service Take?",
      content: "The duration of a car service varies significantly depending on the type of service, your vehicle's condition, and any additional work required. Service times range from 1 hour for a basic oil change to a full day for comprehensive major services.",
      points: [
        "Basic/Oil Service: 1-2 hours",
        "Interim Service: 2-3 hours", 
        "Full Service: 3-4 hours",
        "Major Service: 4-6 hours",
        "Additional repairs: As required",
        "Complex diagnostics: Extra time needed"
      ]
    },
    {
      title: "Basic Service Duration (1-2 Hours)",
      content: "A basic service is the quickest option, focusing on essential maintenance items. This service ensures your vehicle remains safe and roadworthy between more comprehensive services.",
      points: [
        "Engine oil and filter change",
        "Fluid level checks and top-ups",
        "Battery condition test",
        "Tyre pressure and condition check", 
        "Light function verification",
        "Basic safety inspection"
      ]
    },
    {
      title: "Interim Service Duration (2-3 Hours)",
      content: "An interim service provides more comprehensive checks than a basic service while being quicker than a full service. Ideal for high-mileage drivers or newer vehicles.",
      points: [
        "All basic service items included",
        "Brake system inspection",
        "Exhaust system check",
        "Steering and suspension inspection",
        "Windscreen wipers and washers",
        "Engine bay inspection"
      ]
    },
    {
      title: "Full Service Duration (3-4 Hours)",
      content: "A full service provides comprehensive maintenance and inspection of all major vehicle systems. This is the most popular service option for annual vehicle maintenance.",
      points: [
        "Complete engine diagnostics",
        "Transmission and drivetrain check",
        "Comprehensive brake inspection",
        "Air and fuel filter replacement",
        "Detailed electrical system check",
        "Comprehensive safety inspection"
      ]
    },
    {
      title: "Major Service Duration (4-6 Hours)",
      content: "Major services are the most comprehensive maintenance procedures, typically performed annually or every 12,000-15,000 miles. These services may require your vehicle for most of the day.",
      points: [
        "Everything from full service plus:",
        "Timing belt inspection/replacement",
        "Spark plug replacement",
        "Coolant system service",
        "Air conditioning service",
        "Advanced diagnostic procedures"
      ]
    },
    {
      title: "Factors That Affect Service Duration",
      content: "Several factors can influence how long your service takes. Understanding these helps you plan your day and set realistic expectations for collection time.",
      points: [
        "Vehicle age and condition",
        "Service history and maintenance",
        "Additional repairs identified",
        "Parts availability", 
        "Garage workload on the day",
        "Complexity of diagnostic issues"
      ]
    },
    {
      title: "Same-Day Service Completion",
      content: "Most services can be completed on the same day, especially when booked in advance. We aim to provide efficient service without compromising on quality or thoroughness.",
      points: [
        "Book early morning for same-day completion",
        "Pre-order any known required parts",
        "Inform us of any known issues",
        "Consider dropping off the night before",
        "Flexible collection times available",
        "Progress updates provided throughout day"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long should I expect my car service to take?",
      answer: "A basic service takes 1-2 hours, while a full service typically requires 3-4 hours. Major services can take up to 6 hours. We'll give you an accurate timeframe when you book based on your vehicle and service type."
    },
    {
      question: "Can I wait while my car is being serviced?",
      answer: "For basic and interim services (1-3 hours), many customers choose to wait. For longer services, we recommend dropping your vehicle off and collecting later. We have a comfortable waiting area for shorter services."
    },
    {
      question: "Why might my service take longer than expected?",
      answer: "Services may take longer if we discover additional issues that need attention, if parts need ordering, or if diagnostic work reveals complex problems. We'll always contact you before proceeding with any additional work."
    },
    {
      question: "Do you provide courtesy cars for longer services?",
      answer: "Yes, we offer courtesy vehicles for services that require your car for more than 4 hours, subject to availability. Please ask when booking if you need transport during your service."
    },
    {
      question: "Can I book a service for a specific time?",
      answer: "Absolutely! We recommend booking your service appointment in advance to secure your preferred time slot. Early morning appointments often allow for same-day completion."
    },
    {
      question: "What happens if my service takes longer than quoted?",
      answer: "If unexpected work extends your service time, we'll contact you immediately to explain why and provide a new completion estimate. You'll never be charged for additional time unless you approve extra work."
    }
  ];

  return (
    <InformationalLandingTemplate
      slug="how-long-service-takes"
      pageTitle="How Long Does a Car Service Take? | Service Duration Guide | DP Auto Repair"
      description="Learn exactly how long car services take. Basic services: 1-2 hours, Full services: 3-4 hours. Expert service timing guide with booking tips in Chesterfield."
      keywords="how long car service, service duration, vehicle maintenance time, automotive service, Chesterfield garage, car service time"
      h1="How Long Does a Car Service Take?"
      intro="Wondering how long your car service will take? Service duration varies from 1-2 hours for basic maintenance to 4-6 hours for comprehensive major services. Here's your complete guide to car service timing."
      mainContent={mainContent}
      quickFacts={quickFacts}
      faqs={faqs}
      ctaTitle="Need Your Car Serviced?"
      ctaDescription="Book your car service at DP Auto Repair in Chesterfield. Professional, efficient service with transparent timing and competitive pricing."
    />
  );
};

export default HowLongServiceTakes;
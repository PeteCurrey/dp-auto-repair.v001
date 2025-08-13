import React from 'react';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import DVLAMotChecker from '@/components/DVLAMotChecker';
import { Calendar, Clock, Banknote } from 'lucide-react';

const MotAndService = () => {
  const quickFacts = [
    {
      title: "Combined Savings",
      value: "Up to £50",
      icon: <Banknote className="w-6 h-6 text-primary" />
    },
    {
      title: "Total Duration",
      value: "3-4 hours",
      icon: <Clock className="w-6 h-6 text-primary" />
    },
    {
      title: "One Appointment",
      value: "Single Visit",
      icon: <Calendar className="w-6 h-6 text-primary" />
    }
  ];

  const mainContent = [
    {
      title: "MOT and Service Together - The Smart Choice",
      content: "Combining your MOT test with a car service is the most convenient and cost-effective way to maintain your vehicle. This popular combination saves you time, money, and ensures your car receives comprehensive attention in a single visit.",
      points: [
        "Save up to £50 on combined bookings",
        "Single appointment convenience",
        "Identify potential MOT issues early",
        "Comprehensive vehicle health check",
        "Priority booking availability",
        "Complete documentation in one visit"
      ]
    },
    {
      title: "Benefits of Combined MOT and Service",
      content: "Booking your MOT and service together offers numerous advantages beyond simple convenience. This approach ensures optimal vehicle maintenance while providing excellent value for money.",
      points: [
        "Cost savings on labour and booking fees",
        "Earlier identification of potential issues",
        "Reduced risk of MOT failure",
        "Comprehensive vehicle assessment",
        "Single day completion possible",
        "Streamlined paperwork and documentation"
      ]
    },
    {
      title: "What's Included in Our MOT and Service Package",
      content: "Our combined MOT and service package provides comprehensive vehicle care that addresses both legal requirements and ongoing maintenance needs in one appointment.",
      points: [
        "Full MOT test to government standards",
        "Complete vehicle service (Basic/Full/Major)",
        "Oil and filter change",
        "Brake system inspection and service",
        "Fluid level checks and top-ups",
        "Detailed written report with recommendations"
      ]
    },
    {
      title: "Timing Your MOT and Service",
      content: "Strategic timing of your MOT and service can maximize convenience and cost-effectiveness. Understanding the best approach helps you plan your vehicle maintenance schedule.",
      points: [
        "Book 1 month before MOT expiry",
        "Combine with annual service schedule",
        "Consider seasonal maintenance needs",
        "Plan around holiday periods",
        "Allow full day for major services",
        "Early morning drop-off recommended"
      ]
    },
    {
      title: "MOT and Service Process Timeline",
      content: "Understanding what happens during your combined appointment helps you plan your day and know what to expect from start to finish.",
      points: [
        "8:00 AM - Vehicle drop-off and documentation",
        "8:30 AM - Initial inspection and service begins",
        "10:00 AM - MOT test preparation and execution",
        "11:30 AM - Address any MOT issues identified",
        "1:00 PM - Complete service procedures",
        "3:00 PM - Final inspection and paperwork"
      ]
    },
    {
      title: "Cost Comparison: Separate vs Combined",
      content: "The financial benefits of combined MOT and service booking are significant, especially when you factor in the convenience and time savings.",
      points: [
        "Separate: MOT £55 + Service £200 = £255",
        "Combined: £220 (saving £35)",
        "No duplicate labour charges",
        "Single journey costs",
        "No second appointment needed",
        "Potential additional savings on repairs"
      ]
    },
    {
      title: "What Happens if MOT Issues Are Found?",
      content: "If your MOT reveals issues during the combined service, we're perfectly positioned to address them immediately, often completing repairs the same day.",
      points: [
        "Immediate diagnosis and quotation",
        "Same-day repair capability for most issues",
        "No need to rebook MOT appointment",
        "Free retest within 10 working days",
        "Transparent pricing for all work",
        "Progress updates throughout the day"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is it cheaper to book MOT and service together?",
      answer: "Yes, you can save up to £50 by booking MOT and service together. We offer reduced labour rates for combined bookings as it's more efficient to complete both during one visit."
    },
    {
      question: "How long does a combined MOT and service take?",
      answer: "A combined MOT and service typically takes 3-4 hours for a basic service, or 4-6 hours for a full service. We can often complete both in a single day with early morning drop-off."
    },
    {
      question: "What if my car fails the MOT during the service?",
      answer: "If MOT issues are found during your service, we can usually fix them the same day. This is actually an advantage of combined booking - we can address problems immediately without rebooking."
    },
    {
      question: "Can I book MOT and service even if my MOT isn't due yet?",
      answer: "Absolutely! You can take your MOT test up to one month before it expires, and the new certificate will run from the current expiry date. This is perfect for combined bookings."
    },
    {
      question: "Do you provide transport during combined MOT and service?",
      answer: "Yes, we offer courtesy vehicles for combined bookings over 4 hours, subject to availability. We can also arrange local collection/delivery for longer services."
    },
    {
      question: "What happens if I only need an MOT but you find service issues?",
      answer: "We'll always discuss any service needs with you before proceeding. You're under no obligation to have additional work done, but we'll explain any safety or maintenance concerns we find."
    }
  ];

  return (
    <InformationalLandingTemplate
      slug="mot-and-service"
      pageTitle="MOT and Service Together | Save Time & Money | DP Auto Repair Chesterfield"
      description="Book MOT and service together to save up to £50. Convenient single appointment, expert service, same-day completion. Combined MOT and service packages in Chesterfield."
      keywords="MOT and service, combined MOT service, vehicle maintenance, automotive service, Chesterfield garage, car service MOT"
      h1="MOT and Service"
      intro="Save time, money, and hassle by booking your MOT and service together. Our combined packages offer excellent value with savings up to £50, plus the convenience of completing both in a single appointment."
      mainContent={mainContent}
      quickFacts={quickFacts}
      faqs={faqs}
      showDVLAChecker={true}
      dvlaCheckerComponent={<DVLAMotChecker />}
      ctaTitle="Ready to Book MOT and Service?"
      ctaDescription="Save money and time with our combined MOT and service packages. Expert automotive care in Chesterfield with competitive pricing and convenient scheduling."
    />
  );
};

export default MotAndService;
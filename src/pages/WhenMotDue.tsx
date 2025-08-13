import React from 'react';
import InformationalLandingTemplate from '@/components/InformationalLandingTemplate';
import DVLAMotChecker from '@/components/DVLAMotChecker';
import { Calendar, Search, Bell } from 'lucide-react';

const WhenMotDue = () => {
  const quickFacts = [
    { title: "Check Online", value: "Free DVLA", icon: <Search className="w-6 h-6 text-primary" /> },
    { title: "Grace Period", value: "1 Month Early", icon: <Calendar className="w-6 h-6 text-primary" /> },
    { title: "Reminder", value: "V5C Document", icon: <Bell className="w-6 h-6 text-primary" /> }
  ];

  const mainContent = [
    {
      title: "How to Check When Your MOT is Due",
      content: "There are several ways to check your MOT due date. The most reliable method is using the official DVLA online service or checking your current MOT certificate.",
      points: ["Check current MOT certificate", "Use DVLA online checker", "Look at your V5C registration document", "Contact your garage", "Check MOT history online", "Set calendar reminders"]
    }
  ];

  const faqs = [
    {
      question: "How do I check my MOT due date?",
      answer: "You can check your MOT due date using the government's online MOT history service, your current MOT certificate, or your V5C registration document."
    }
  ];

  return (
    <InformationalLandingTemplate
      slug="when-mot-due"
      pageTitle="When is My Car Due its MOT? | Check MOT Due Date | DP Auto Repair"
      description="Find out when your car MOT is due. Use our DVLA checker tool or learn how to check your MOT expiry date. Book MOT test in Chesterfield."
      h1="When is My Car Due its MOT?"
      intro="Never miss your MOT deadline again. Use our tools and guidance to check when your MOT is due and book your test in advance."
      mainContent={mainContent}
      quickFacts={quickFacts}
      faqs={faqs}
      showDVLAChecker={true}
      dvlaCheckerComponent={<DVLAMotChecker />}
    />
  );
};

export default WhenMotDue;
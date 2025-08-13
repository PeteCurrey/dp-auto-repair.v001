import InformationalLandingTemplate from "@/components/InformationalLandingTemplate";

const MotDueChecker = () => {
  return (
    <InformationalLandingTemplate
      title="MOT Due Date Checker - Check When Your Car's MOT Expires"
      description="Find out when your vehicle's MOT is due with our free MOT due date checker. Get reminders and book your MOT test in Chesterfield."
      content={{
        introduction: "Keep track of your vehicle's MOT expiry date and ensure you never miss your annual test. Our MOT due date checker helps you stay road legal and avoid penalties.",
        
        mainContent: [
          {
            heading: "How to Check Your MOT Due Date",
            content: "Your MOT due date is exactly one year from your last MOT test date. You can check this by looking at your MOT certificate or searching the DVLA database online."
          },
          {
            heading: "MOT Reminder Service",
            content: "Set up automatic reminders to never miss your MOT due date. We'll notify you when your test is approaching, giving you plenty of time to book."
          },
          {
            heading: "Book Your MOT in Chesterfield",
            content: "Don't wait until the last minute. Book your MOT test early to avoid disappointment and ensure your vehicle stays road legal."
          }
        ],
        
        benefits: [
          "Free MOT due date checking",
          "Automatic reminder notifications",
          "Early booking availability",
          "Professional MOT testing facility",
          "Same-day results",
          "Competitive pricing"
        ],
        
        faq: [
          {
            question: "How far in advance can I take my MOT?",
            answer: "You can take your MOT test up to one month before the due date without losing any time from your certificate."
          },
          {
            question: "What happens if my MOT expires?",
            answer: "It's illegal to drive without a valid MOT certificate. You could face a fine of up to £1,000 and your insurance may be invalid."
          },
          {
            question: "Do I need to book in advance?",
            answer: "Yes, we recommend booking in advance to secure your preferred date and time, especially during busy periods."
          }
        ]
      }}
      location="Chesterfield"
      ctaText="Check MOT Due Date"
    />
  );
};

export default MotDueChecker;
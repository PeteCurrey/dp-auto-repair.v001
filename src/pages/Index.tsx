import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "DP Automotive Repair & Diagnostics | Expert Auto Service Chesterfield",
    description: "Professional automotive repair and diagnostics in Chesterfield. ASE certified technicians with 15+ years experience. Engine diagnostics, brake repair, MOT testing, and routine servicing. Book your service today.",
    keywords: "auto repair Chesterfield, car diagnostics, brake repair, MOT testing, engine diagnostics, automotive service, ASE certified mechanics, routine servicing, car maintenance",
    canonical: "https://dpautorepair.co.uk",
    ogTitle: "DP Automotive Repair & Diagnostics | Expert Auto Service Chesterfield",
    ogDescription: "Professional automotive repair and diagnostics in Chesterfield. ASE certified technicians with 15+ years experience."
  });

  const faqs = [
    {
      question: "How often should I service my car?",
      answer: "We recommend servicing your car every 6 months or 6,000 miles, whichever comes first. However, this can vary depending on your vehicle's make, model, age, and driving conditions. Check your owner's manual for manufacturer-specific recommendations."
    },
    {
      question: "What's included in a basic car service?",
      answer: "Our basic service includes engine oil and filter change, fluid level checks, tyre pressure and tread inspection, battery test, and light checks. We also perform a visual inspection of key components and provide you with a detailed report."
    },
    {
      question: "Do you work on all car makes and models?",
      answer: "Yes, our experienced technicians work on all major car makes and models. We have the expertise and diagnostic equipment to service everything from domestic vehicles to luxury imports and performance cars."
    },
    {
      question: "How long does a typical service take?",
      answer: "A basic service typically takes 1-2 hours, while a full service can take 2-4 hours depending on the work required. We'll give you an estimated timeframe when you book and keep you updated if anything changes."
    },
    {
      question: "Do you provide warranties on your work?",
      answer: "Yes, we provide a 12-month warranty on all parts and labour. This gives you peace of mind knowing that our work is guaranteed and we stand behind the quality of our service."
    },
    {
      question: "Can I book a service online?",
      answer: "Yes, you can contact us through our website or call us directly at (01246) 233483 to book your service. We'll work with you to find a convenient time that fits your schedule."
    }
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveRepairShop",
    "name": "DP Automotive Repair & Diagnostics",
    "description": "Professional automotive repair and diagnostics in Chesterfield with 15+ years experience",
    "url": "https://dpautorepair.co.uk",
    "telephone": "+44-1246-233483",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 5 Vanguard Trading Estate",
      "addressLocality": "Chesterfield",
      "postalCode": "S40 2TZ",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.2307,
      "longitude": -1.4659
    },
    "openingHours": [
      "Mo-Fr 09:00-17:00"
    ],
    "serviceArea": {
      "@type": "City",
      "name": "Chesterfield"
    },
    "services": [
      "Automotive Repair",
      "Vehicle Diagnostics", 
      "Routine Servicing",
      "MOT Testing",
      "Brake Repair",
      "Engine Diagnostics"
    ]
  };

  return (
    <div className="min-h-screen">
      <SchemaMarkup schema={organizationSchema} />
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <AboutSection />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your local Chesterfield mechanic & garage</h2>
              <p className="text-muted-foreground mb-4">
                Looking for a trusted local mechanic and independent garage in Chesterfield? DP Automotive Repair & Diagnostics provides expert car servicing, MOT preparation, brake repair, clutch replacement, engine diagnostics, exhaust work and performance tuning. As a full-service garage, we maintain all makes and models with transparent pricing and honest advice.
              </p>
              <p className="text-muted-foreground">
                Whether you need routine servicing to keep your vehicle reliable, fast diagnostics to find a fault, or specialist performance tuning, our qualified team is here to help. Visit our workshop or contact us to book your service today.
              </p>
            </article>
          </div>
        </section>
        <FAQSection faqs={faqs} className="bg-muted/30" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

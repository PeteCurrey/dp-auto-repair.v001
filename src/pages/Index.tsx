import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "DP Automotive Repair & Diagnostics | Expert Auto Service Chesterfield",
    description: "Professional automotive repair and diagnostics in Chesterfield. ASE certified technicians with 15+ years experience. Engine diagnostics, brake repair, MOT testing, and routine servicing. Book your service today.",
    keywords: "auto repair Chesterfield, car diagnostics, brake repair, MOT testing, engine diagnostics, automotive service, ASE certified mechanics, routine servicing, car maintenance",
    canonical: "https://dpautomotive.co.uk",
    ogTitle: "DP Automotive Repair & Diagnostics | Expert Auto Service Chesterfield",
    ogDescription: "Professional automotive repair and diagnostics in Chesterfield. ASE certified technicians with 15+ years experience."
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

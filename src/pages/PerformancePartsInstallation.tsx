import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Settings, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const PerformancePartsInstallation = () => {
  useSEO({
    title: "Performance Parts Installation Chesterfield | Upgrades | DP Automotive",
    description: "Professional installation of performance parts in Chesterfield. Intercoolers, intakes, suspension, braking and more with proper setup.",
    keywords: "performance parts installation, intercooler fitting, intake install, performance upgrades Chesterfield",
    canonical: "https://dpautorepair.co.uk/tuning/performance-parts",
    ogTitle: "Performance Parts Installation Chesterfield | Upgrades",
    ogDescription: "Expert installation of performance parts with correct setup and alignment."
  });

  const parts = [
    "Intercoolers and pipework",
    "Intake systems and filters",
    "Exhaust components",
    "Suspension and coilovers",
    "Brake upgrades"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-24">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Performance Parts Installation</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              From intercoolers to suspension, we install and set up your performance parts correctly for results you can feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/contact">Request Quote<ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Book Installation</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Popular Upgrades</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {parts.map((p) => (
                    <li key={p} className="flex items-start"><CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" /><span>{p}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Advice on Parts?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Speak to a Technician</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PerformancePartsInstallation;
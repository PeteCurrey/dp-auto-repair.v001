import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Flame, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const ExhaustFabrication = () => {
  useSEO({
    title: "Exhaust Fabrication Chesterfield | Custom Performance Exhausts | DP Automotive",
    description: "Custom stainless steel exhaust fabrication in Chesterfield. Cat-back, turbo-back and bespoke systems for sound and performance.",
    keywords: "exhaust fabrication Chesterfield, custom exhaust, stainless exhaust, performance exhaust",
    canonical: "https://dpautorepair.co.uk/tuning/exhaust-fabrication",
    ogTitle: "Exhaust Fabrication Chesterfield | Custom Performance Exhausts",
    ogDescription: "Bespoke stainless exhaust systems fabricated to your requirements."
  });

  const features = [
    "Mandrel bends for optimal flow",
    "High-quality stainless materials",
    "Cat-back and turbo-back options",
    "Performance or subtle sound tuning",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-24">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Exhaust Fabrication</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Hand-built exhaust systems tailored to your vehicle and goals. Improve flow, sound and durability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/contact">Request Quote<ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Why Custom?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start"><CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" /><span>{f}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                  <ul className="space-y-2">
                    {["Resonators and mufflers choices","Tip styles and finishes","Catalyst and downpipe options","Silenced vs straight-through"].map((o) => (
                      <li key={o} className="flex items-start"><Flame className="w-5 h-5 text-primary mr-3 mt-0.5" /><span>{o}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discuss Your System?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Speak to Fabricator</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExhaustFabrication;
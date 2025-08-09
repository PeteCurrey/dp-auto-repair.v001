import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gauge, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const EcuRemapping = () => {
  useSEO({
    title: "ECU Remapping Chesterfield | Performance ECU Tuning | DP Automotive",
    description: "Professional ECU remapping in Chesterfield. Safe, reliable power and torque gains with custom maps. Economy and performance tunes available.",
    keywords: "ecu remapping Chesterfield, ecu tuning, stage 1 remap, performance remap, economy remap",
    canonical: "https://dpautorepair.co.uk/tuning/ecu-remapping",
    ogTitle: "ECU Remapping Chesterfield | Performance ECU Tuning",
    ogDescription: "Professional ECU remapping in Chesterfield with safe, reliable results."
  });

  const benefits = [
    "Increased horsepower and torque",
    "Sharper throttle response",
    "Smoother power delivery",
    "Optimised fuel economy options",
    "Custom maps for your vehicle"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-24">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">ECU Remapping</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Unlock your vehicle's true potential with our safe and proven ECU remapping service. 
              Tailored calibrations for power, drivability and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/contact">Get Remap Quote<ArrowRight className="w-4 h-4 ml-2" /></Link>
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
                  <CardTitle className="text-2xl">What We Do</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>We read your vehicle's ECU, create a precise calibration and write it back safely. All work is logged and tested.</p>
                  <ul className="space-y-2">
                    {[
                      "Non-invasive OBD and bench options",
                      "Dyno-developed maps where applicable",
                      "OEM safety limits retained",
                      "Stage 1 and eco remap options",
                    ].map((item) => (
                      <li key={item} className="flex items-start"><CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" /><span>{item}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start"><ArrowRight className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="font-medium">{b}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Our Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  {[
                    { icon: Cpu, title: "Diagnostics", desc: "Health check and data read" },
                    { icon: Gauge, title: "Calibration", desc: "Tailored map development" },
                    { icon: CheckCircle, title: "Validation", desc: "Test drive and logs" },
                  ].map((step) => (
                    <div key={step.title} className="flex items-start gap-3">
                      <step.icon className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-semibold">{step.title}</div>
                        <p className="text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Remap?</h2>
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

export default EcuRemapping;
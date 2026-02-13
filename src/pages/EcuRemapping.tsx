import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gauge, Cpu, ArrowRight, Zap, Shield, Clock, Flame, Settings, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PerformanceGainCalculator from "@/components/PerformanceGainCalculator";

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
    { icon: Zap, label: "Increased horsepower and torque" },
    { icon: Activity, label: "Sharper throttle response" },
    { icon: Gauge, label: "Smoother power delivery" },
    { icon: Flame, label: "Optimised fuel economy options" },
    { icon: Settings, label: "Custom maps for your vehicle" },
  ];

  const processSteps = [
    { icon: Cpu, title: "Diagnostics", desc: "Full health check, fault scan and baseline data logging before any work begins." },
    { icon: Settings, title: "Calibration", desc: "Tailored map development with OEM safety limits retained throughout." },
    { icon: CheckCircle, title: "Validation", desc: "Comprehensive test drive, data review and final performance verification." },
  ];

  const whatWeDo = [
    "Non-invasive OBD and bench options",
    "Dyno-developed maps where applicable",
    "OEM safety limits retained",
    "Stage 1 and eco remap options",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Dramatic dark overlay */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, hsl(0 0% 100%) 49px, hsl(0 0% 100%) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, hsl(0 0% 100%) 49px, hsl(0 0% 100%) 50px)',
          }} />
          {/* Glow accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
          
          <div className="relative container mx-auto px-4 text-center max-w-4xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">Professional ECU Tuning</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-secondary-foreground mb-6 tracking-tight">
              ECU <span className="text-primary">Remapping</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Unlock your vehicle's true potential with our safe and proven ECU remapping service.
              Tailored calibrations for power, drivability and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground text-lg px-8 h-14 shadow-glow hover:scale-105 transition-transform">
                <Link to="/contact">Get Remap Quote<ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14 border-border/50 hover:bg-accent/50 transition-all">
                <Link to="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Stats Bar */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "15-35%", label: "Power Gains" },
                { value: "2-3hrs", label: "Turnaround" },
                { value: "15+", label: "Years Experience" },
                { value: "100%", label: "Warranty Backed" },
              ].map((stat) => (
                <div key={stat.label} className="animate-fade-up">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do + Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* What We Do Card */}
              <Card className="shadow-card border-border/50 hover-lift bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">What We Do</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    We read your vehicle's ECU, create a precise calibration and write it back safely. All work is logged and tested.
                  </p>
                  <ul className="space-y-3 pt-2">
                    {whatWeDo.map((item) => (
                      <li key={item} className="flex items-start gap-3 group">
                        <div className="mt-0.5 p-1 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-card-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits Card */}
              <Card className="shadow-card border-border/50 hover-lift bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Benefits</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((b) => (
                      <li key={b.label} className="flex items-center gap-3 group">
                        <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <b.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-card-foreground">{b.label}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Performance Calculator */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Calculate Your <span className="text-primary">Performance Gains</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estimate the power and torque gains possible with professional ECU remapping for your vehicle.
              </p>
            </div>
            <PerformanceGainCalculator />
          </div>
        </section>

        {/* Process Section - Dark themed */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
          
          <div className="relative container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
                Our <span className="text-primary">Process</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A proven methodology ensuring safe, reliable and optimal performance gains.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative group">
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
                  )}
                  <div className="p-8 rounded-2xl border border-border/20 bg-card/5 backdrop-blur-sm hover:bg-card/10 hover:border-primary/30 transition-all duration-300 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-xs font-semibold text-primary/70 tracking-widest uppercase mb-2">Step {index + 1}</div>
                    <h3 className="text-xl font-bold text-secondary-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-primary">DP Automotive</span>?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Comprehensive Warranty", desc: "All remaps covered by warranty for complete peace of mind." },
                { icon: Cpu, title: "Expert Technicians", desc: "Qualified professionals with years of tuning experience." },
                { icon: Clock, title: "Quick Turnaround", desc: "Most remaps completed within 2-3 hours." },
              ].map((item) => (
                <div key={item.title} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-90" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, hsl(0 0% 100%) 49px, hsl(0 0% 100%) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, hsl(0 0% 100%) 49px, hsl(0 0% 100%) 50px)',
          }} />
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Remap?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Contact our expert team today for a professional consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 h-14 font-semibold shadow-xl hover:scale-105 transition-transform">
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 transition-all">
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

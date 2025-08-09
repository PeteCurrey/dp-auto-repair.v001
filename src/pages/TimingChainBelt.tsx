import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, CheckCircle, AlertTriangle, Calendar, Phone, Wrench, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const TimingChainBelt = () => {
  useSEO({
    title: "Timing Chain & Belt Replacement | DP Auto Repair & Diagnostics",
    description: "Expert timing chain and timing belt replacement services. Prevent engine damage with professional timing system maintenance and repairs.",
    keywords: "timing chain, timing belt, cambelt, timing system, engine timing, valve timing, automotive repair, engine service"
  });

  const timingSymptoms = [
    {
      icon: AlertTriangle,
      title: "Engine Rattling",
      description: "Metallic rattling noise from the front of the engine, especially during startup or acceleration."
    },
    {
      icon: AlertTriangle,
      title: "Metal Shavings",
      description: "Metal particles found in the engine oil, indicating timing chain stretch or wear."
    },
    {
      icon: AlertTriangle,
      title: "Poor Engine Performance",
      description: "Reduced power, rough idling, or misfiring due to incorrect valve timing."
    },
    {
      icon: AlertTriangle,
      title: "Check Engine Light",
      description: "Engine management warning light triggered by timing-related error codes."
    },
    {
      icon: AlertTriangle,
      title: "Engine Won't Start",
      description: "Complete failure to start, potentially indicating timing chain/belt failure."
    },
    {
      icon: AlertTriangle,
      title: "Visible Wear",
      description: "Cracked, frayed, or loose timing belt visible during routine inspection."
    }
  ];

  const timingComponents = [
    {
      name: "Timing Chain/Belt",
      description: "Synchronizes crankshaft and camshaft rotation for proper valve timing"
    },
    {
      name: "Tensioners",
      description: "Maintain proper tension on the timing chain or belt"
    },
    {
      name: "Guides & Rails",
      description: "Direct the timing chain path and prevent excessive movement"
    },
    {
      name: "Sprockets/Pulleys",
      description: "Transfer rotational force from crankshaft to camshaft"
    },
    {
      name: "Water Pump",
      description: "Often replaced during timing belt service as it's driven by the same belt"
    }
  ];

  const timingFacts = [
    {
      title: "Interference vs Non-Interference",
      description: "Interference engines can suffer severe damage if timing components fail, while non-interference engines typically avoid valve damage."
    },
    {
      title: "Timing Belt vs Chain",
      description: "Timing belts require regular replacement (60,000-100,000 miles), while chains typically last longer but can stretch over time."
    },
    {
      title: "Prevention is Key",
      description: "Regular timing system maintenance prevents catastrophic engine damage that can cost thousands to repair."
    }
  ];

  const whyChooseUs = [
    "Specialized timing system expertise for all makes and models",
    "Quality OEM and premium aftermarket timing components",
    "Engine timing verification with professional equipment",
    "Comprehensive inspection of related components",
    "Competitive pricing with transparent estimates",
    "12-month warranty on all timing system work"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-extralight mb-6 text-foreground">
              Timing Chain & Belt Replacement
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Protect your engine with professional timing chain and belt replacement services. 
              Our expert technicians ensure precise timing system maintenance to prevent costly engine damage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Timing Service
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:01246233483">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (01246) 233483
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Signs of Timing System Problems
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Early detection of timing system issues can prevent catastrophic engine damage. 
              Watch for these warning signs and contact us immediately.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timingSymptoms.map((symptom, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <symptom.icon className="h-6 w-6 text-destructive" />
                    <CardTitle className="text-lg">{symptom.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{symptom.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Understanding Your Timing System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The timing system is critical to your engine's operation. Here's what you need to know 
              about timing chains, belts, and their maintenance requirements.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {timingFacts.map((fact, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{fact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{fact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Timing System Components</CardTitle>
                  <CardDescription>
                    Key parts we inspect and replace during timing service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timingComponents.map((component, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold text-foreground mb-2">{component.name}</h4>
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Our Timing System Service Process
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional timing chain and belt replacement requires precision and expertise.
              </p>
            </div>
            
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-5 w-5 text-primary" />
                  Step-by-Step Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 text-muted-foreground">
                  <li className="flex gap-4">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Engine Assessment</h4>
                      <p>Comprehensive inspection of timing system and related components</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Disassembly</h4>
                      <p>Careful removal of engine covers and accessories to access timing components</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Timing Alignment</h4>
                      <p>Set engine to correct timing position before removing old components</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Component Replacement</h4>
                      <p>Install new timing chain/belt, tensioners, guides, and related parts</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                    <div>
                      <h4 className="font-semibold text-foreground">Timing Verification</h4>
                      <p>Precise timing verification and engine testing to ensure correct operation</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose DP Automotive for Timing Services?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trust our experienced technicians for critical timing system repairs and maintenance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Protect Your Engine with Professional Timing Service
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't risk catastrophic engine damage. Schedule your timing chain or belt service today 
            and ensure your engine's long-term reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Book Service
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="tel:01246233483">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TimingChainBelt;
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, CheckCircle, AlertTriangle, Calendar, Phone, Wrench, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const ClutchReplacement = () => {
  useSEO({
    title: "Clutch Replacement Services | DP Auto Repair & Diagnostics",
    description: "Professional clutch replacement services for all vehicle makes and models. Expert diagnostics, quality parts, and reliable repairs with competitive pricing.",
    keywords: "clutch replacement, clutch repair, clutch problems, manual transmission, automotive clutch, car clutch, clutch disc, pressure plate"
  });

  const clutchSymptoms = [
    {
      icon: AlertTriangle,
      title: "Slipping Clutch",
      description: "Engine revs increase without corresponding acceleration, especially on hills or under load."
    },
    {
      icon: AlertTriangle,
      title: "Hard to Engage Gears",
      description: "Difficulty shifting gears, grinding noises, or resistance when changing gear."
    },
    {
      icon: AlertTriangle,
      title: "Clutch Pedal Issues",
      description: "Heavy, soft, or spongy clutch pedal feel, or pedal staying on the floor."
    },
    {
      icon: AlertTriangle,
      title: "Strange Noises",
      description: "Squeaking, grinding, or rattling sounds when pressing or releasing the clutch pedal."
    },
    {
      icon: AlertTriangle,
      title: "Burning Smell",
      description: "Burning odor from the engine bay, indicating clutch friction material overheating."
    },
    {
      icon: AlertTriangle,
      title: "Vibrations",
      description: "Unusual vibrations through the clutch pedal or vehicle during engagement."
    }
  ];

  const clutchComponents = [
    {
      name: "Clutch Disc",
      description: "The friction plate that connects and disconnects the engine from the transmission"
    },
    {
      name: "Pressure Plate",
      description: "Applies pressure to hold the clutch disc against the flywheel"
    },
    {
      name: "Release Bearing",
      description: "Allows smooth engagement and disengagement of the clutch"
    },
    {
      name: "Flywheel",
      description: "Provides the surface for the clutch disc to grip against"
    },
    {
      name: "Hydraulic System",
      description: "Master and slave cylinders that operate the clutch mechanism"
    }
  ];

  const whyChooseUs = [
    "Experienced technicians with manual transmission expertise",
    "Quality OEM and aftermarket clutch components",
    "Comprehensive clutch system diagnostics",
    "Competitive pricing with transparent quotes",
    "Fast turnaround times to get you back on the road",
    "12-month warranty on parts and labor"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Professional Clutch Replacement Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Expert clutch replacement and repair services for all makes and models. From diagnostics 
              to complete clutch system replacement, we'll get your manual transmission running smoothly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Calendar className="mr-2 h-5 w-5" />
                Book Clutch Service
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-5 w-5" />
                Call (01246) 233483
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clutch Problems Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Signs Your Clutch Needs Replacement
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Recognizing the early warning signs of clutch problems can save you from more 
              expensive repairs and prevent being stranded.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clutchSymptoms.map((symptom, index) => (
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

      {/* Clutch Components Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Clutch System Components
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding the key components of your clutch system helps explain why 
              professional replacement is essential for long-lasting performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Clutch Components We Replace</CardTitle>
                  <CardDescription>
                    Complete clutch system parts and components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clutchComponents.map((component, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold text-foreground mb-2">{component.name}</h4>
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cog className="h-5 w-5 text-primary" />
                    Our Clutch Service Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                      <span>Comprehensive clutch system diagnosis</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                      <span>Transparent quote with parts and labor breakdown</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                      <span>Remove transmission and inspect all components</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                      <span>Replace clutch kit and related components</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                      <span>Test drive and quality assurance check</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">12-Month Warranty</h3>
                  <p className="text-muted-foreground">All clutch replacements come with comprehensive parts and labor warranty</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose DP Automotive for Clutch Replacement?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trust our experienced technicians for reliable, professional clutch replacement services.
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
            Need Clutch Replacement or Repair?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't let clutch problems leave you stranded. Contact us today for expert diagnostics 
            and professional clutch replacement services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Calendar className="mr-2 h-5 w-5" />
              Book Service
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClutchReplacement;
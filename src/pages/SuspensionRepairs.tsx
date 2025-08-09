import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, CheckCircle, AlertTriangle, Calendar, Phone, Wrench, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const SuspensionRepairs = () => {
  useSEO({
    title: "Suspension Repairs & Replacement | DP Auto Repair & Diagnostics",
    description: "Professional suspension repair services. Shock absorbers, struts, springs, and complete suspension system maintenance for improved ride quality and safety.",
    keywords: "suspension repair, shock absorbers, struts, springs, suspension system, automotive suspension, car suspension, ride quality"
  });

  const suspensionSymptoms = [
    {
      icon: AlertTriangle,
      title: "Rough or Bumpy Ride",
      description: "Increased sensitivity to road imperfections, bouncing, or uncomfortable ride quality."
    },
    {
      icon: AlertTriangle,
      title: "Vehicle Pulls or Drifts",
      description: "Car pulls to one side while driving or drifts during turns, indicating suspension imbalance."
    },
    {
      icon: AlertTriangle,
      title: "Nose Diving When Braking",
      description: "Front end dips excessively when braking, suggesting worn front struts or shocks."
    },
    {
      icon: AlertTriangle,
      title: "Uneven Tyre Wear",
      description: "Premature or irregular tyre wear patterns caused by poor wheel alignment or suspension issues."
    },
    {
      icon: AlertTriangle,
      title: "Visible Fluid Leaks",
      description: "Oily residue on shock absorbers or struts indicating seal failure and fluid loss."
    },
    {
      icon: AlertTriangle,
      title: "Excessive Body Roll",
      description: "Vehicle leans significantly during cornering, compromising handling and safety."
    }
  ];

  const suspensionComponents = [
    {
      name: "Shock Absorbers",
      description: "Control wheel movement and provide ride comfort by dampening spring oscillations",
      replacement: "Every 50,000-100,000 miles or when leaking/worn"
    },
    {
      name: "Struts",
      description: "Combine shock absorber and spring into one unit, providing structural support",
      replacement: "Every 50,000-100,000 miles depending on driving conditions"
    },
    {
      name: "Springs",
      description: "Support vehicle weight and absorb initial impact from road irregularities",
      replacement: "When broken, sagging, or causing alignment issues"
    },
    {
      name: "Sway Bars & Links",
      description: "Reduce body roll during cornering and improve vehicle stability",
      replacement: "When bushings wear or links become loose/damaged"
    },
    {
      name: "Control Arms & Bushings",
      description: "Connect suspension to vehicle frame and allow controlled wheel movement",
      replacement: "When bushings deteriorate or ball joints wear out"
    }
  ];

  const suspensionServices = [
    {
      title: "Shock Absorber Replacement",
      description: "Quality shock absorbers for improved ride comfort and vehicle control"
    },
    {
      title: "Strut Replacement",
      description: "Complete strut assemblies including springs and mounting hardware"
    },
    {
      title: "Spring Replacement",
      description: "Coil springs, leaf springs, and air springs for all vehicle types"
    },
    {
      title: "Suspension Alignment",
      description: "Precise wheel alignment to prevent tyre wear and improve handling"
    },
    {
      title: "Bushing Replacement",
      description: "Control arm bushings, sway bar bushings, and other suspension bushings"
    },
    {
      title: "Complete System Overhaul",
      description: "Full suspension rebuild for vehicles with multiple worn components"
    }
  ];

  const whyChooseUs = [
    "Experienced suspension specialists for all vehicle makes",
    "Quality OEM and performance suspension components",
    "Advanced alignment equipment for precise adjustment",
    "Comprehensive road testing after all repairs",
    "Competitive pricing with lifetime alignment options",
    "12-month warranty on all suspension work"
  ];

  const suspensionBenefits = [
    {
      title: "Improved Safety",
      description: "Properly functioning suspension ensures better vehicle control and stability, especially during emergency maneuvers."
    },
    {
      title: "Enhanced Comfort",
      description: "New suspension components eliminate harsh rides and provide smooth, comfortable driving experience."
    },
    {
      title: "Tyre Life Extension",
      description: "Correct suspension alignment prevents premature tyre wear, saving money on frequent tyre replacements."
    },
    {
      title: "Better Handling",
      description: "Responsive suspension improves cornering ability and overall driving dynamics for confident control."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-extralight mb-6 text-foreground">
              Professional Suspension Repairs
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Restore your vehicle's ride quality and handling with expert suspension repair services. 
              From shock absorbers to complete system overhauls, we ensure smooth, safe driving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Suspension Service
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

      {/* Symptoms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Signs Your Suspension Needs Repair
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your suspension system affects ride quality, safety, and tyre wear. Recognising these 
              warning signs early can prevent more expensive repairs and ensure your safety.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suspensionSymptoms.map((symptom, index) => (
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

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Benefits of Professional Suspension Repair
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Quality suspension repair provides immediate and long-term benefits for your vehicle's 
              performance, safety, and your driving experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {suspensionBenefits.map((benefit, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Suspension System Components
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding your suspension components helps you recognize when service is needed 
              and appreciate the complexity of professional suspension repair.
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {suspensionComponents.map((component, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{component.description}</p>
                    <p className="text-sm text-primary font-medium">{component.replacement}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cog className="h-5 w-5 text-primary" />
                    Our Suspension Service Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                      <span>Comprehensive suspension system inspection</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                      <span>Road test to identify handling and ride issues</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                      <span>Detailed quote with component breakdown</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                      <span>Professional installation with proper tools</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                      <span>Wheel alignment and final road test</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Quality Guarantee</h3>
                  <p className="text-muted-foreground">All suspension work backed by comprehensive warranty and quality assurance</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Suspension Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From individual component replacement to complete system overhauls, we provide 
              comprehensive suspension services for all vehicle types.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suspensionServices.map((service, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose DP Automotive for Suspension Repair?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trust our experienced technicians for professional suspension services and quality results.
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
            Restore Your Vehicle's Ride Quality
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't tolerate poor ride quality or compromised handling. Schedule your suspension 
            inspection today and experience the difference professional service makes.
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

export default SuspensionRepairs;
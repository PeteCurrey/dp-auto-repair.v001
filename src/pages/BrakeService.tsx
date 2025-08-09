import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, CheckCircle, AlertTriangle, Calendar, Phone, Wrench, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BrakeService = () => {
  useSEO({
    title: "Brake Repair & Service in Chesterfield | DP Automotive",
    description: "Expert brake repair and replacement in Chesterfield. Pads, discs, calipers and brake fluid service with safety checks and 12‑month warranty.",
    keywords: "brake repair chesterfield, brake service, brake pads, brake discs, brake fluid, brake calipers",
    canonical: "https://dpautorepair.co.uk/brake-service",
    ogTitle: "Brake Repair & Service in Chesterfield | DP Automotive",
    ogDescription: "Expert brake repair and replacement in Chesterfield. Transparent pricing and fast turnaround."
  });

  const brakeSymptoms = [
    {
      icon: AlertTriangle,
      title: "Squealing or Grinding",
      description: "High-pitched squealing or grinding noises when braking, indicating worn brake pads or discs."
    },
    {
      icon: AlertTriangle,
      title: "Spongy Brake Pedal",
      description: "Brake pedal feels soft, spongy, or goes to the floor, suggesting air in brake lines or fluid leaks."
    },
    {
      icon: AlertTriangle,
      title: "Vibrating When Braking",
      description: "Steering wheel or brake pedal vibrates during braking, often caused by warped brake discs."
    },
    {
      icon: AlertTriangle,
      title: "Pulling to One Side",
      description: "Vehicle pulls to one side when braking, indicating uneven brake wear or sticking calipers."
    },
    {
      icon: AlertTriangle,
      title: "Longer Stopping Distance",
      description: "Increased braking distance or reduced braking effectiveness compromising safety."
    },
    {
      icon: AlertTriangle,
      title: "Dashboard Warning Light",
      description: "Brake warning light illuminated on dashboard indicating brake system problems."
    }
  ];

  const brakeComponents = [
    {
      name: "Brake Pads",
      description: "Friction material that presses against brake discs to stop the vehicle",
      service: "Replacement every 25,000-60,000 miles depending on driving conditions"
    },
    {
      name: "Brake Discs/Rotors",
      description: "Metal discs that brake pads clamp against to create stopping friction",
      service: "Replacement or resurfacing when worn or warped"
    },
    {
      name: "Brake Calipers",
      description: "Hydraulic pistons that press brake pads against the discs",
      service: "Rebuild or replacement when leaking or seizing"
    },
    {
      name: "Brake Fluid",
      description: "Hydraulic fluid that transfers pedal force to brake components",
      service: "Replacement every 2-3 years to maintain performance"
    },
    {
      name: "Brake Lines & Hoses",
      description: "Carry brake fluid from master cylinder to brake components",
      service: "Inspection and replacement if corroded or damaged"
    }
  ];

  const brakeServices = [
    {
      title: "Brake Pad Replacement",
      description: "Quality brake pads for optimal stopping power and safety"
    },
    {
      title: "Brake Disc Replacement",
      description: "New or reconditioned brake discs for smooth, vibration-free braking"
    },
    {
      title: "Brake Fluid Service",
      description: "Complete brake fluid flush and replacement for reliable operation"
    },
    {
      title: "Brake System Diagnosis",
      description: "Comprehensive testing to identify brake system problems"
    },
    {
      title: "Caliper Service",
      description: "Repair or replacement of brake calipers and associated components"
    },
    {
      title: "Emergency Brake Repair",
      description: "Fast turnaround for urgent brake safety issues"
    }
  ];

  const whyChooseUs = [
    "ASE certified brake technicians with extensive experience",
    "Quality brake parts from leading manufacturers",
    "State-of-the-art brake testing equipment",
    "Free brake safety inspections with any service",
    "Competitive pricing with lifetime warranty options",
    "Same-day service available for urgent brake repairs"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-extralight mb-6 text-foreground">
              Expert Brake Service & Replacement
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your safety is our priority. Professional brake service and replacement for all makes and models. 
              From brake pads to complete system overhauls, we ensure your brakes perform when you need them most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Brake Service
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
              Warning Signs Your Brakes Need Attention
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Don't ignore these critical warning signs. Your brakes are your vehicle's most important 
              safety system - recognizing problems early can prevent accidents and save lives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brakeSymptoms.map((symptom, index) => (
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

      {/* Brake Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Brake Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From routine maintenance to emergency repairs, we provide comprehensive brake services 
              to keep you safe on the road.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brakeServices.map((service, index) => (
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

      {/* Brake Components Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Understanding Your Brake System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your brake system consists of several critical components that work together to ensure 
              safe, reliable stopping power in all driving conditions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {brakeComponents.map((component, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{component.description}</p>
                    <p className="text-sm text-primary font-medium">{component.service}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cog className="h-5 w-5 text-primary" />
                    Our Brake Service Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                      <span>Comprehensive brake system inspection</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                      <span>Brake performance testing and measurement</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                      <span>Detailed quote with transparent pricing</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                      <span>Professional installation of quality parts</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                      <span>Road test and safety verification</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Safety Guaranteed</h3>
                  <p className="text-muted-foreground">All brake work comes with comprehensive warranty and safety guarantee</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose DP Automotive for Brake Service?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trust your safety to our certified brake specialists and state-of-the-art equipment.
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
            Your Safety Is Our Priority
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't compromise on brake safety. Schedule your brake inspection or service today 
            and drive with confidence knowing your brakes will perform when you need them most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Book Brake Service
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="tel:01246233483">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrakeService;
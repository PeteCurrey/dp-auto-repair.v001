import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Phone, Clock, MapPin, Wrench, Shield, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const RecoveryBreakdown = () => {
  useSEO({
    title: "24/7 Vehicle Recovery & Breakdown Services | DP Auto Repair & Diagnostics",
    description: "Emergency vehicle recovery and breakdown assistance. Fast response times, professional service. Call us 24/7 for reliable breakdown recovery services.",
    keywords: "vehicle recovery, breakdown service, emergency recovery, roadside assistance, car breakdown, towing service, 24/7 recovery"
  });

  const recoveryServices = [
    {
      icon: Truck,
      title: "Emergency Vehicle Recovery",
      description: "Fast response vehicle recovery service for breakdowns, accidents, and emergency situations.",
      services: [
        "Accident recovery",
        "Breakdown recovery",
        "Off-road recovery",
        "Multi-vehicle recovery"
      ],
      response: "Average 30-45 minutes",
      availability: "24/7 Service"
    },
    {
      icon: Wrench,
      title: "Roadside Assistance",
      description: "On-site breakdown assistance to get you back on the road quickly and safely.",
      services: [
        "Battery jump start",
        "Flat tyre assistance",
        "Fuel delivery",
        "Lock-out assistance"
      ],
      response: "Average 20-30 minutes",
      availability: "24/7 Service"
    },
    {
      icon: MapPin,
      title: "Local & Long Distance",
      description: "Comprehensive recovery services covering local and long-distance transportation needs.",
      services: [
        "Local area recovery",
        "National coverage",
        "Garage to garage transport",
        "Home delivery service"
      ],
      response: "Varies by distance",
      availability: "24/7 Service"
    }
  ];

  const commonBreakdowns = [
    {
      icon: AlertCircle,
      title: "Battery Problems",
      description: "Dead battery, charging issues, or electrical faults preventing your vehicle from starting.",
      solutions: ["Jump start service", "Battery replacement", "Alternator diagnosis", "Mobile battery fitting"]
    },
    {
      icon: AlertCircle,
      title: "Tyre Issues",
      description: "Punctures, blowouts, or damaged tyres requiring immediate roadside assistance.",
      solutions: ["Spare tyre fitting", "Mobile tyre repair", "Emergency tyre replacement", "Puncture repair"]
    },
    {
      icon: AlertCircle,
      title: "Engine Problems",
      description: "Engine failure, overheating, or mechanical issues requiring recovery services.",
      solutions: ["Diagnostic assessment", "Temporary repairs", "Safe recovery", "Workshop transportation"]
    },
    {
      icon: AlertCircle,
      title: "Fuel Issues",
      description: "Empty fuel tank, wrong fuel type, or fuel system problems.",
      solutions: ["Emergency fuel delivery", "Fuel drain service", "Fuel system flush", "Contamination removal"]
    }
  ];

  const responseProcess = [
    {
      step: "1",
      title: "Emergency Call",
      description: "Call our 24/7 helpline and provide your location and vehicle details",
      time: "Immediate response"
    },
    {
      step: "2",
      title: "Dispatch & ETA",
      description: "Our nearest recovery vehicle is dispatched with confirmed arrival time",
      time: "Within 5 minutes"
    },
    {
      step: "3",
      title: "On-Site Assessment",
      description: "Professional assessment of the situation and appropriate action plan",
      time: "Upon arrival"
    },
    {
      step: "4",
      title: "Recovery or Repair",
      description: "Either fix the problem on-site or safely recover your vehicle",
      time: "As required"
    }
  ];

  const whyChooseUs = [
    {
      title: "Fast Response Times",
      description: "Average response time of 30-45 minutes for emergency recovery",
      icon: Clock
    },
    {
      title: "24/7 Availability",
      description: "Round-the-clock service, 365 days a year including holidays",
      icon: Phone
    },
    {
      title: "Professional Drivers",
      description: "Fully trained and certified recovery operators with years of experience",
      icon: Shield
    },
    {
      title: "Modern Fleet",
      description: "Well-maintained recovery vehicles equipped with latest safety equipment",
      icon: Truck
    },
    {
      title: "Comprehensive Coverage",
      description: "Local and long-distance recovery services throughout the region",
      icon: MapPin
    },
    {
      title: "Competitive Pricing",
      description: "Transparent pricing with no hidden charges or call-out fees",
      icon: AlertCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              24/7 Vehicle Recovery & Breakdown Service
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Fast, reliable breakdown recovery service when you need it most. Professional assistance 
              available 24/7 with rapid response times and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Phone className="mr-2 h-5 w-5" />
                Call (01246) 233483
              </Button>
              <Button size="lg" variant="outline">
                <Calendar className="mr-2 h-5 w-5" />
                Request Callback
              </Button>
            </div>
            <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive font-semibold">
                <Phone className="inline mr-2 h-4 w-4" />
                Emergency Breakdown: (01246) 233483 - Available 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Recovery & Breakdown Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From emergency breakdown assistance to planned vehicle transportation, 
              we provide comprehensive recovery services when you need them most.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {recoveryServices.map((service, index) => (
              <Card key={index} className="h-full border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Services Include:</h4>
                      <ul className="space-y-2">
                        {service.services.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Response Time:</span>
                        <Badge variant="secondary">{service.response}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Availability:</span>
                        <Badge variant="default">{service.availability}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Breakdown Issues */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Common Breakdown Situations We Handle
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our experienced team can assist with a wide range of breakdown scenarios, 
              from simple roadside fixes to complex recovery operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {commonBreakdowns.map((breakdown, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <breakdown.icon className="h-6 w-6 text-destructive" />
                    <CardTitle className="text-xl">{breakdown.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {breakdown.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Our Solutions:</h4>
                    <ul className="space-y-2">
                      {breakdown.solutions.map((solution, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Wrench className="h-4 w-4 text-primary flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Emergency Response Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              When you call our emergency line, here's exactly what happens to get you 
              back on the road as quickly as possible.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {responseProcess.map((process, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{process.title}</h3>
                      <Badge variant="outline">{process.time}</Badge>
                    </div>
                    <p className="text-muted-foreground">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose DP Automotive Recovery?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              When you're stranded, you need a recovery service you can trust. Here's why 
              thousands of customers choose us for their emergency breakdown needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <reason.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{reason.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-destructive">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-destructive-foreground">
            Need Emergency Recovery?
          </h2>
          <p className="text-lg text-destructive-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't wait - call us now for immediate assistance. Our professional recovery team 
            is standing by 24/7 to help get you back on the road safely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-destructive hover:bg-white/90 text-xl py-6 px-8">
              <Phone className="mr-2 h-6 w-6" />
              Call (01246) 233483
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-destructive">
              <MapPin className="mr-2 h-5 w-5" />
              Request Location
            </Button>
          </div>
          <div className="mt-8 text-destructive-foreground/80">
            <Clock className="inline mr-2 h-4 w-4" />
            Available 24 hours a day, 7 days a week, 365 days a year
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecoveryBreakdown;
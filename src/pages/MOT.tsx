import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, Calendar, Phone, Clipboard, Car, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const MOT = () => {
  useSEO({
    title: "MOT Testing Services | DP Auto Repair & Diagnostics",
    description: "Comprehensive MOT testing services with same-day results. Class 4 MOT tests for cars and light commercial vehicles. Book your MOT test today.",
    keywords: "MOT test, MOT testing, Class 4 MOT, vehicle testing, MOT certificate, automotive testing, car MOT"
  });

  const motChecks = [
    {
      category: "Lights & Electrical",
      items: [
        "Headlights, tail lights, indicators",
        "Brake lights and hazard warning lights",
        "Number plate lights",
        "Dashboard warning lights",
        "Electrical wiring condition"
      ]
    },
    {
      category: "Steering & Suspension",
      items: [
        "Steering wheel and column",
        "Power steering operation",
        "Shock absorbers and springs",
        "Suspension joints and bushes",
        "Wheel bearings"
      ]
    },
    {
      category: "Brakes",
      items: [
        "Brake pedal and handbrake",
        "Brake discs and pads",
        "Brake fluid and pipes",
        "Brake performance testing",
        "ABS system operation"
      ]
    },
    {
      category: "Tyres & Wheels",
      items: [
        "Tyre condition and tread depth",
        "Tyre pressure and wear patterns",
        "Wheel condition and security",
        "Spare tyre (if fitted)",
        "Wheel alignment indications"
      ]
    },
    {
      category: "Body & Structure",
      items: [
        "Body condition and corrosion",
        "Doors, seats and seatbelts",
        "Mirrors and windscreen",
        "Wipers and washers",
        "Horn operation"
      ]
    },
    {
      category: "Exhaust & Emissions",
      items: [
        "Exhaust system condition",
        "Emission levels testing",
        "Catalytic converter function",
        "Diesel particulate filter",
        "Fuel system integrity"
      ]
    }
  ];

  const preparationTips = [
    {
      icon: CheckCircle,
      title: "Check Your Lights",
      description: "Ensure all lights work correctly including headlights, brake lights, indicators, and hazard lights."
    },
    {
      icon: CheckCircle,
      title: "Inspect Tyres",
      description: "Check tyre condition, tread depth (minimum 1.6mm), and ensure correct pressure."
    },
    {
      icon: CheckCircle,
      title: "Test Brakes",
      description: "Ensure brakes feel responsive and handbrake holds the vehicle securely."
    },
    {
      icon: CheckCircle,
      title: "Clean Your Vehicle",
      description: "Wash your car and remove items that might obstruct the tester's view."
    },
    {
      icon: CheckCircle,
      title: "Check Fluids",
      description: "Ensure adequate levels of brake fluid, power steering fluid, and windscreen wash."
    },
    {
      icon: CheckCircle,
      title: "Bring Documentation",
      description: "Have your V5C logbook and previous MOT certificate (if applicable) ready."
    }
  ];

  const commonFailures = [
    {
      reason: "Lighting Defects",
      percentage: "18.5%",
      description: "Faulty bulbs, damaged lenses, or poor beam alignment"
    },
    {
      reason: "Suspension Issues",
      percentage: "13.2%",
      description: "Worn shock absorbers, damaged springs, or faulty bushes"
    },
    {
      reason: "Brake Problems",
      percentage: "11.8%",
      description: "Worn brake pads, damaged discs, or brake fluid leaks"
    },
    {
      reason: "Tyre Defects",
      percentage: "10.4%",
      description: "Insufficient tread depth, damage, or incorrect pressure"
    }
  ];

  const whyChooseUs = [
    "DVSA approved testing facility",
    "Qualified and experienced MOT testers",
    "Same-day testing available",
    "Comprehensive pre-MOT health checks",
    "Competitive pricing with no hidden fees",
    "Free retest within 10 working days (if required)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              MOT Testing Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Comprehensive MOT testing with same-day results. Our DVSA approved facility ensures 
              your vehicle meets all legal requirements for road safety and environmental standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Calendar className="mr-2 h-5 w-5" />
                Book MOT Test
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-5 w-5" />
                Call (01246) 233483
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MOT Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                What is an MOT Test?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The MOT (Ministry of Transport) test is an annual safety check mandated by the government 
                  for vehicles over 3 years old. It ensures your vehicle meets road safety and environmental standards.
                </p>
                <p>
                  Our comprehensive Class 4 MOT tests cover cars, light commercial vehicles, and ambulances 
                  up to 3,000kg gross vehicle weight. The test examines safety-critical components to ensure 
                  your vehicle is roadworthy.
                </p>
                <p>
                  Without a valid MOT certificate, it's illegal to drive your vehicle on public roads, 
                  and your insurance may be invalid.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Card className="border-border">
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground">DVSA Approved</h3>
                    <p className="text-sm text-muted-foreground">Authorised testing facility</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground">Same Day Results</h3>
                    <p className="text-sm text-muted-foreground">Quick turnaround time</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">MOT Test Checklist</CardTitle>
                  <CardDescription>
                    Key areas examined during your MOT test
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {motChecks.slice(0, 3).map((check, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold text-foreground mb-2">{check.category}</h4>
                        <ul className="space-y-1">
                          {check.items.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Complete MOT Checklist */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete MOT Test Checklist
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive MOT test covers all safety-critical areas to ensure your vehicle 
              meets legal requirements and is safe for road use.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motChecks.map((check, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{check.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {check.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Prepare Your Vehicle for MOT
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Simple checks you can do before your MOT test to improve your chances of passing 
              first time and avoid unnecessary repair costs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preparationTips.map((tip, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <tip.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Failures */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Most Common MOT Failures
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding the most common reasons for MOT failure can help you prepare 
              your vehicle and avoid costly repairs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {commonFailures.map((failure, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{failure.reason}</CardTitle>
                    <Badge variant="destructive" className="text-sm font-bold">
                      {failure.percentage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{failure.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose DP Automotive for Your MOT?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trust our DVSA approved facility for reliable, professional MOT testing services.
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
            Book Your MOT Test Today
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't wait until your MOT expires. Book your test early and ensure your vehicle 
            remains legal and roadworthy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Calendar className="mr-2 h-5 w-5" />
              Book MOT Test
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

export default MOT;
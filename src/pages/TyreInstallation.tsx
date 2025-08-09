import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, Shield, Wrench, Car, CheckCircle, AlertTriangle, Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const TyreInstallation = () => {
  useSEO({
    title: "Professional Tyre Installation & Fitting Services | DP Auto Repair & Diagnostics",
    description: "Expert tyre installation, fitting and balancing services. Quality tyres from leading brands with professional fitting. Book your tyre installation today.",
    keywords: "tyre installation, tyre fitting, wheel balancing, tyre replacement, car tyres, automotive tyres, tyre mounting"
  });

  const tyreServices = [
    {
      icon: Wrench,
      title: "Tyre Installation & Fitting",
      description: "Professional mounting and fitting of new tyres with precision balancing for optimal performance.",
      services: [
        "Tyre mounting and demounting",
        "Wheel balancing",
        "Valve replacement",
        "Pressure checking and adjustment"
      ],
      benefits: [
        "Smooth, vibration-free driving",
        "Extended tyre life",
        "Improved fuel efficiency"
      ]
    },
    {
      icon: Gauge,
      title: "Wheel Alignment",
      description: "Precise wheel alignment to ensure even tyre wear and optimal vehicle handling.",
      services: [
        "Front wheel alignment",
        "Four-wheel alignment",
        "Thrust angle adjustment",
        "Alignment diagnostics"
      ],
      benefits: [
        "Even tyre wear",
        "Better fuel economy",
        "Improved steering response"
      ]
    },
    {
      icon: Shield,
      title: "Tyre Inspection & Health Check",
      description: "Comprehensive tyre condition assessment to ensure safety and performance.",
      services: [
        "Tread depth measurement",
        "Sidewall inspection",
        "Pressure monitoring",
        "Wear pattern analysis"
      ],
      benefits: [
        "Enhanced safety",
        "Early problem detection",
        "Maximised tyre lifespan"
      ]
    }
  ];

  const tyreTypes = [
    {
      title: "Summer Tyres",
      description: "Optimised for warm weather conditions with excellent grip and handling.",
      features: ["Superior dry grip", "Reduced rolling resistance", "Enhanced fuel efficiency"]
    },
    {
      title: "Winter Tyres",
      description: "Designed for cold weather, snow and ice with specialised rubber compounds.",
      features: ["Improved cold weather grip", "Enhanced snow traction", "Shorter stopping distances"]
    },
    {
      title: "All-Season Tyres",
      description: "Versatile tyres suitable for year-round use in moderate climates.",
      features: ["Year-round performance", "Convenient single set", "Balanced characteristics"]
    },
    {
      title: "Performance Tyres",
      description: "High-performance tyres for enhanced handling and responsiveness.",
      features: ["Superior cornering grip", "Responsive steering", "Enhanced braking performance"]
    }
  ];

  const warningSignsForReplacement = [
    {
      icon: AlertTriangle,
      title: "Tread Depth Below 1.6mm",
      description: "Legal minimum tread depth reached - immediate replacement required."
    },
    {
      icon: AlertTriangle,
      title: "Visible Damage",
      description: "Cuts, bulges, or sidewall damage that could lead to sudden failure."
    },
    {
      icon: AlertTriangle,
      title: "Uneven Wear Patterns",
      description: "Irregular wear indicating alignment issues or suspension problems."
    },
    {
      icon: AlertTriangle,
      title: "Age-Related Deterioration",
      description: "Tyres over 6 years old showing signs of rubber deterioration."
    }
  ];

  const installationProcess = [
    {
      step: "1",
      title: "Vehicle Inspection",
      description: "Thorough assessment of current tyres and wheel condition"
    },
    {
      step: "2",
      title: "Tyre Selection",
      description: "Expert recommendation based on your vehicle and driving needs"
    },
    {
      step: "3",
      title: "Professional Fitting",
      description: "Careful removal of old tyres and installation of new ones"
    },
    {
      step: "4",
      title: "Balancing & Alignment",
      description: "Precision balancing and alignment for optimal performance"
    },
    {
      step: "5",
      title: "Final Inspection",
      description: "Comprehensive check and pressure adjustment before handover"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background via-background to-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Professional Tyre Fitting
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Expert tyre installation services with precision fitting and balancing. Choose from 
              leading tyre brands with professional installation for optimal safety and performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Installation
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-5 w-5" />
                Call (01246) 233483
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tyre Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Tyre Installation Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From professional fitting to wheel alignment, we provide comprehensive tyre services 
              to ensure your vehicle's safety and optimal performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tyreServices.map((service, index) => (
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
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((benefit, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tyre Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Choose the Right Tyres for Your Needs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We stock and install a wide range of tyre types from leading manufacturers to suit 
              every driving style and weather condition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tyreTypes.map((type, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* When to Replace Tyres */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              When Should You Replace Your Tyres?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Recognise the warning signs that indicate your tyres need replacement for optimal 
              safety and performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {warningSignsForReplacement.map((sign, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <sign.icon className="h-6 w-6 text-destructive" />
                    <CardTitle className="text-lg">{sign.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{sign.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Professional Installation Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We follow a comprehensive process to ensure your new tyres are fitted correctly 
              and perform optimally from day one.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {installationProcess.map((process, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{process.title}</h3>
                    <p className="text-muted-foreground">{process.description}</p>
                  </div>
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
            Ready for New Tyres?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get professional tyre installation with expert fitting and balancing. Contact us today 
            for a quote or to book your tyre installation service.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Installation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Quote
                </Link>
              </Button>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TyreInstallation;
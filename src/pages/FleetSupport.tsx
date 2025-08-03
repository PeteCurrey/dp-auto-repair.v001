import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, CheckCircle, Clock, Calendar, Phone, Users, Shield, FileText, Wrench, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const FleetSupport = () => {
  useSEO({
    title: "Fleet Support Services | DP Auto Repair & Diagnostics",
    description: "Comprehensive fleet support services for small businesses. Maintenance scheduling, priority service, fleet management, and cost-effective solutions for commercial vehicles.",
    keywords: "fleet support, commercial vehicle service, fleet maintenance, business fleet, vehicle fleet management, commercial auto repair"
  });

  const fleetServices = [
    {
      icon: Wrench,
      title: "Preventive Maintenance",
      description: "Scheduled maintenance programs to keep your fleet running efficiently and prevent costly breakdowns."
    },
    {
      icon: Clock,
      title: "Priority Service",
      description: "Fast-track service appointments and emergency repairs to minimize vehicle downtime."
    },
    {
      icon: FileText,
      title: "Fleet Management",
      description: "Comprehensive record keeping, maintenance tracking, and compliance documentation."
    },
    {
      icon: Shield,
      title: "MOT & Compliance",
      description: "Class 4 and Class 7 MOT testing with compliance management for commercial vehicles."
    },
    {
      icon: TrendingUp,
      title: "Cost Control",
      description: "Transparent pricing with fleet discounts and predictable maintenance budgeting."
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Assigned fleet coordinator for personalized service and consistent communication."
    }
  ];

  const vehicleTypes = [
    "Small vans and delivery vehicles",
    "Light commercial vehicles (LCV)",
    "Company cars and fleet vehicles",
    "Pickup trucks and utilities",
    "Service and maintenance vehicles",
    "Emergency and response vehicles"
  ];

  const fleetBenefits = [
    {
      title: "Reduced Downtime",
      description: "Proactive maintenance scheduling minimizes unexpected breakdowns and keeps your business moving.",
      icon: Clock
    },
    {
      title: "Cost Savings",
      description: "Fleet pricing, bulk service discounts, and preventive maintenance reduce overall operating costs.",
      icon: TrendingUp
    },
    {
      title: "Compliance Management",
      description: "Stay compliant with MOT testing, safety inspections, and regulatory requirements.",
      icon: Shield
    },
    {
      title: "Simplified Administration",
      description: "Centralized billing, maintenance records, and streamlined fleet management processes.",
      icon: FileText
    }
  ];

  const maintenancePrograms = [
    {
      name: "Basic Fleet Plan",
      features: [
        "Scheduled maintenance reminders",
        "Priority booking system",
        "Fleet discount pricing",
        "Basic maintenance records"
      ],
      ideal: "2-5 vehicles"
    },
    {
      name: "Professional Fleet Plan",
      features: [
        "Comprehensive maintenance scheduling",
        "Emergency breakdown priority",
        "Detailed fleet reporting",
        "MOT management and reminders",
        "Dedicated fleet coordinator"
      ],
      ideal: "6-15 vehicles"
    },
    {
      name: "Enterprise Fleet Plan",
      features: [
        "Custom maintenance programs",
        "24/7 breakdown support coordination",
        "Advanced fleet analytics",
        "Compliance management",
        "On-site consultations",
        "Bulk parts procurement"
      ],
      ideal: "15+ vehicles"
    }
  ];

  const whyChooseUs = [
    "Experienced in commercial vehicle maintenance and repair",
    "Flexible scheduling to accommodate business operations",
    "Transparent pricing with no hidden costs",
    "Comprehensive documentation and reporting",
    "Local family business understanding small fleet needs",
    "Quality workmanship with warranty protection"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Professional Fleet Support Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Comprehensive vehicle maintenance and repair services designed specifically for small business fleets. 
              Keep your vehicles running reliably while controlling costs and minimizing downtime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Calendar className="mr-2 h-5 w-5" />
                Discuss Fleet Needs
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-5 w-5" />
                Call (01246) 233483
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Comprehensive Fleet Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From routine maintenance to emergency repairs, we provide complete fleet support 
              services tailored to your business needs and operational requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetServices.map((service, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Vehicles We Support
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We provide fleet support services for a wide range of commercial and business vehicles, 
                from small delivery vans to larger commercial vehicles.
              </p>
              <div className="space-y-3">
                {vehicleTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Fleet Size Specialization
                  </CardTitle>
                  <CardDescription>
                    Tailored services for small to medium business fleets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-2">Small Fleets (2-5 vehicles)</h4>
                      <p className="text-sm text-muted-foreground">Basic maintenance programs with flexible scheduling</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-2">Medium Fleets (6-15 vehicles)</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive programs with dedicated coordination</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-foreground mb-2">Larger Fleets (15+ vehicles)</h4>
                      <p className="text-sm text-muted-foreground">Custom solutions with advanced fleet management</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Fleet Support Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional fleet support delivers measurable benefits to your business operations, 
              from reduced costs to improved vehicle reliability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {fleetBenefits.map((benefit, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <benefit.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Programs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Fleet Maintenance Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the fleet maintenance program that best fits your business size and requirements. 
              All programs include priority service and transparent pricing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {maintenancePrograms.map((program, index) => (
              <Card key={index} className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    Ideal for {program.ideal}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
                Why Choose DP Automotive for Fleet Support?
              </h2>
              <p className="text-lg text-muted-foreground">
                As a local family business, we understand the challenges of managing a small fleet 
                and provide personalized service to keep your business moving.
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
            Ready to Optimize Your Fleet Operations?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our fleet support services can reduce your vehicle operating costs, 
            minimize downtime, and keep your business running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="mr-2 h-5 w-5" />
              Call (01246) 233483
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FleetSupport;
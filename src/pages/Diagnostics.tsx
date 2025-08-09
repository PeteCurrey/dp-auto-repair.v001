import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, CheckCircle, ArrowRight, Monitor, Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const Diagnostics = () => {
  useSEO({
    title: "Vehicle Diagnostics Services | Advanced Computer Diagnostics | DP Automotive",
    description: "Professional vehicle diagnostics in Chesterfield. Advanced computer diagnostics, engine analysis, electrical testing, and error code reading. Expert fault finding for all makes and models.",
    keywords: "vehicle diagnostics Chesterfield, computer diagnostics, engine diagnostics, electrical testing, fault finding, error codes, OBD diagnostics",
    canonical: "https://dpautorepair.co.uk/diagnostics",
    ogTitle: "Vehicle Diagnostics Services | Advanced Computer Diagnostics",
    ogDescription: "Professional vehicle diagnostics in Chesterfield. Advanced computer diagnostics and expert fault finding."
  });

  const diagnosticServices = [
    {
      icon: Gauge,
      title: "Engine Diagnostics",
      description: "Comprehensive engine performance analysis and fault detection",
      services: [
        "Engine control module (ECM) testing",
        "Fuel system diagnostics",
        "Ignition system analysis",
        "Emission system testing",
        "Turbocharger diagnostics",
        "Compression testing"
      ],
      benefits: [
        "Identify performance issues",
        "Prevent costly repairs",
        "Improve fuel efficiency",
        "Reduce emissions"
      ]
    },
    {
      icon: Zap,
      title: "Electrical Testing",
      description: "Advanced electrical system diagnostics and testing",
      services: [
        "Battery and charging system tests",
        "Starter motor diagnostics",
        "Alternator performance testing",
        "Wiring harness inspection",
        "Sensor calibration and testing",
        "Control module programming"
      ],
      benefits: [
        "Reliable electrical systems",
        "Prevent electrical failures",
        "Accurate fault identification",
        "Extended component life"
      ]
    },
    {
      icon: Monitor,
      title: "Performance Analysis",
      description: "Real-time vehicle performance monitoring and analysis",
      services: [
        "Live data stream analysis",
        "Performance parameter monitoring",
        "Emissions testing and analysis",
        "Fuel trim diagnostics",
        "Timing analysis",
        "Cylinder balance testing"
      ],
      benefits: [
        "Optimised performance",
        "Early problem detection",
        "Accurate troubleshooting",
        "Improved reliability"
      ]
    },
    {
      icon: Cpu,
      title: "Error Code Reading",
      description: "Professional OBD and manufacturer-specific code interpretation",
      services: [
        "OBD-II code reading and clearing",
        "Manufacturer-specific codes",
        "Freeze frame data analysis",
        "Pending code identification",
        "Code history analysis",
        "System readiness testing"
      ],
      benefits: [
        "Quick fault identification",
        "Accurate problem diagnosis",
        "Comprehensive system check",
        "Prevent false diagnoses"
      ]
    }
  ];

  const equipment = [
    {
      title: "Latest Diagnostic Tools",
      description: "State-of-the-art equipment for accurate fault finding"
    },
    {
      title: "Manufacturer Software",
      description: "Access to dealer-level diagnostic systems for all major brands"
    },
    {
      title: "Oscilloscopes",
      description: "Advanced signal analysis for complex electrical issues"
    },
    {
      title: "Emission Analysers",
      description: "Professional testing equipment for emission system diagnostics"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "Discuss symptoms and concerns with our expert technicians"
    },
    {
      step: "2",
      title: "Comprehensive Scan",
      description: "Complete vehicle scan using advanced diagnostic equipment"
    },
    {
      step: "3",
      title: "Data Analysis",
      description: "Professional interpretation of diagnostic data and error codes"
    },
    {
      step: "4",
      title: "Detailed Report",
      description: "Clear explanation of findings with recommended solutions"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-32">
          <div className="container mx-auto px-4">
            <Breadcrumb 
              className="mb-8"
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Diagnostics' }
              ]}
            />
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Vehicle
                <span className="block text-primary">Diagnostics</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Advanced computer diagnostics to identify issues quickly and accurately. 
                Our state-of-the-art equipment and expert technicians provide 
                comprehensive diagnostic solutions for all vehicle makes and models.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Diagnostic Test
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Call for Advice
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comprehensive Diagnostic Services
              </h2>
              <p className="text-lg text-muted-foreground">
                From engine performance issues to complex electrical faults, 
                our advanced diagnostic capabilities identify problems quickly and accurately.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {diagnosticServices.map((service, index) => (
                <Card key={service.title} className="shadow-card border-0">
                  <CardHeader className="p-8">
                    <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl mb-4">{service.title}</CardTitle>
                    <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Services Include:</h3>
                      <ul className="space-y-2">
                        {service.services.map((item) => (
                          <li key={item} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8">
                    <h3 className="font-semibold text-lg mb-4">Benefits:</h3>
                    <ul className="space-y-2 mb-6">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center">
                          <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span className="font-medium text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild className="w-full gradient-primary text-primary-foreground">
                      <Link to="/contact">
                        Book Service
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Professional Diagnostic Equipment
                </h2>
                <p className="text-lg text-muted-foreground">
                  We invest in the latest diagnostic technology to ensure 
                  accurate fault finding and efficient problem resolution.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {equipment.map((item) => (
                  <Card key={item.title} className="text-center shadow-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Card className="shadow-card border-0 bg-secondary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Why Professional Diagnostics Matter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Accurate Problem Identification:</h3>
                      <p className="text-muted-foreground mb-4">
                        Modern vehicles have complex computer systems that require specialised 
                        equipment to diagnose properly. Our professional-grade tools provide 
                        detailed insights that basic code readers cannot match.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Cost-Effective Solutions:</h3>
                      <p className="text-muted-foreground">
                        Accurate diagnostics prevent unnecessary repairs and part replacements. 
                        By identifying the root cause of issues, we save you time and money 
                        while ensuring lasting solutions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Diagnostic Process
                </h2>
                <p className="text-lg text-muted-foreground">
                  We follow a systematic approach to ensure accurate 
                  diagnosis and effective problem resolution.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {process.map((item) => (
                  <Card key={item.step} className="text-center shadow-card border-0">
                    <CardHeader>
                      <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                        {item.step}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Common Diagnostic Scenarios
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our diagnostic services help identify and resolve a wide range of vehicle issues.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Check Engine Light",
                    description: "Comprehensive analysis to determine the cause of warning lights"
                  },
                  {
                    title: "Performance Issues",
                    description: "Identify causes of poor acceleration, rough idling, or reduced power"
                  },
                  {
                    title: "Starting Problems",
                    description: "Diagnose no-start or hard-start conditions with advanced testing"
                  },
                  {
                    title: "Electrical Faults",
                    description: "Complex electrical system troubleshooting and fault location"
                  },
                  {
                    title: "Emission Problems",
                    description: "MOT failure diagnostics and emission system fault finding"
                  },
                  {
                    title: "Network Issues",
                    description: "CAN bus and communication problems between vehicle modules"
                  }
                ].map((issue) => (
                  <Card key={issue.title} className="shadow-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{issue.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{issue.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Professional Diagnostics?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't guess what's wrong with your vehicle. Our advanced diagnostic 
                services provide accurate answers and effective solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Diagnostics
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Call (01246) 233483
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Diagnostics;
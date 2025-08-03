import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, ArrowRight, Battery, Cable, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const ElectricalServices = () => {
  useSEO({
    title: "Electrical Services | Vehicle Electrical Repair & Diagnostics | DP Automotive",
    description: "Complete electrical system diagnosis and repair in Chesterfield. Battery testing, alternator repair, starter service, and wiring repairs for all vehicle makes and models.",
    keywords: "electrical services Chesterfield, battery testing, alternator repair, starter motor, wiring repairs, electrical diagnostics, vehicle electrical",
    canonical: "https://dpautomotive.co.uk/electrical-services",
    ogTitle: "Electrical Services | Vehicle Electrical Repair & Diagnostics",
    ogDescription: "Complete electrical system diagnosis and repair in Chesterfield. Expert electrical services for all vehicles."
  });

  const electricalServices = [
    {
      icon: Battery,
      title: "Battery Testing & Replacement",
      description: "Comprehensive battery health checks and professional replacement services",
      services: [
        "Battery load testing",
        "Capacity and condition assessment",
        "Terminal cleaning and protection",
        "Battery replacement and programming",
        "Charging system analysis",
        "Hybrid battery diagnostics"
      ],
      benefits: [
        "Reliable starting power",
        "Extended battery life",
        "Prevent unexpected failures",
        "Optimised charging efficiency"
      ]
    },
    {
      icon: Zap,
      title: "Alternator Repair & Service",
      description: "Expert alternator diagnosis, repair, and replacement services",
      services: [
        "Alternator output testing",
        "Voltage regulator diagnostics",
        "Bearing and brush replacement",
        "Complete alternator rebuilds",
        "Belt and pulley inspection",
        "Charging system optimisation"
      ],
      benefits: [
        "Consistent charging performance",
        "Prevent electrical failures",
        "Cost-effective repairs",
        "Extended component life"
      ]
    },
    {
      icon: Monitor,
      title: "Starter Motor Service",
      description: "Professional starter motor diagnosis and repair solutions",
      services: [
        "Starter motor testing",
        "Solenoid replacement",
        "Brush and commutator service",
        "Drive gear inspection",
        "Complete starter rebuilds",
        "Installation and programming"
      ],
      benefits: [
        "Reliable engine starting",
        "Eliminate starting problems",
        "Prevent no-start situations",
        "Improved cold weather performance"
      ]
    },
    {
      icon: Cable,
      title: "Wiring Repairs",
      description: "Expert electrical wiring diagnosis and repair services",
      services: [
        "Wiring harness inspection",
        "Short circuit diagnosis",
        "Connector repair and replacement",
        "Custom wiring solutions",
        "Corrosion damage repair",
        "ECU communication repairs"
      ],
      benefits: [
        "Eliminate electrical faults",
        "Prevent fire hazards",
        "Restore proper function",
        "Long-lasting solutions"
      ]
    }
  ];

  const commonIssues = [
    {
      title: "Dead Battery",
      symptoms: ["Engine won't start", "Dim headlights", "Electrical accessories not working"],
      causes: ["Battery age", "Parasitic drain", "Charging system failure", "Extreme temperatures"]
    },
    {
      title: "Alternator Failure",
      symptoms: ["Battery warning light", "Dimming lights while driving", "Strange noises"],
      causes: ["Worn brushes", "Faulty voltage regulator", "Bearing failure", "Belt issues"]
    },
    {
      title: "Starter Problems",
      symptoms: ["Clicking noise when starting", "Engine cranks slowly", "No response when key turned"],
      causes: ["Worn starter motor", "Faulty solenoid", "Poor connections", "Battery issues"]
    },
    {
      title: "Wiring Faults",
      symptoms: ["Intermittent electrical problems", "Blown fuses", "Warning lights"],
      causes: ["Corrosion", "Physical damage", "Rodent damage", "Manufacturing defects"]
    }
  ];

  const modernSystems = [
    {
      title: "Engine Management",
      description: "ECU diagnostics and programming for optimal engine performance"
    },
    {
      title: "Body Control Modules",
      description: "Central locking, lighting, and comfort system repairs"
    },
    {
      title: "Safety Systems",
      description: "ABS, airbag, and stability control system diagnostics"
    },
    {
      title: "Infotainment",
      description: "Audio, navigation, and connectivity system repairs"
    },
    {
      title: "Climate Control",
      description: "Air conditioning and heating system electrical components"
    },
    {
      title: "Hybrid Systems",
      description: "High-voltage electrical system diagnostics and service"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-20 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Electrical
                <span className="block text-primary">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Complete electrical system diagnosis and repair services. 
                From battery testing to complex wiring repairs, our expert 
                technicians handle all your vehicle's electrical needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Electrical Service
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Emergency Electrical Help
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
                Comprehensive Electrical Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                From basic battery replacement to complex electrical fault finding, 
                we provide expert solutions for all your vehicle's electrical systems.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {electricalServices.map((service, index) => (
                <Card key={service.title} className="shadow-card border-0">
                  <CardHeader className="p-8">
                    <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl mb-4">{service.title}</CardTitle>
                    <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Services Include:</h4>
                        <ul className="space-y-2">
                          {service.services.map((item) => (
                            <li key={item} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center">
                              <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                              <span className="text-sm font-medium">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Issues Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Common Electrical Problems
              </h2>
              <p className="text-lg text-muted-foreground">
                Recognising the signs of electrical problems can help prevent 
                costly breakdowns and ensure your safety on the road.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {commonIssues.map((issue) => (
                <Card key={issue.title} className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl mb-4">{issue.title}</CardTitle>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Warning Signs:</h4>
                        <ul className="space-y-1">
                          {issue.symptoms.map((symptom) => (
                            <li key={symptom} className="flex items-start">
                              <Zap className="w-4 h-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Common Causes:</h4>
                        <ul className="space-y-1">
                          {issue.causes.map((cause) => (
                            <li key={cause} className="flex items-start">
                              <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Modern Systems Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Modern Vehicle Electronics
              </h2>
              <p className="text-lg text-muted-foreground">
                Today's vehicles feature sophisticated electronic systems that 
                require specialised knowledge and equipment to service properly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modernSystems.map((system) => (
                <Card key={system.title} className="text-center shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">{system.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{system.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <Card className="shadow-card border-0 bg-secondary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Expert Electronic Diagnostics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Advanced Equipment:</h4>
                      <ul className="space-y-2">
                        {[
                          "Manufacturer-specific diagnostic tools",
                          "Oscilloscopes for signal analysis",
                          "CAN bus communication testing",
                          "High-voltage safety equipment",
                          "Programming and coding tools"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Our Expertise:</h4>
                      <ul className="space-y-2">
                        {[
                          "Certified electrical technicians",
                          "Continuous training on new systems",
                          "Access to technical databases",
                          "Experience with all vehicle makes",
                          "Safe high-voltage procedures"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <ArrowRight className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-card border-0 bg-destructive/5 border-destructive/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl md:text-3xl mb-4">
                    Electrical Safety Warning
                  </CardTitle>
                  <p className="text-lg text-muted-foreground">
                    Vehicle electrical systems can be dangerous if handled incorrectly. 
                    Always seek professional help for electrical problems.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Safety Risks:</h4>
                      <ul className="space-y-2">
                        {[
                          "Electric shock from high-voltage systems",
                          "Fire hazard from faulty wiring",
                          "Damage to expensive electronic components",
                          "Safety system malfunctions",
                          "Voided warranties from improper repairs"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <Zap className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Professional Advantages:</h4>
                      <ul className="space-y-2">
                        {[
                          "Proper safety equipment and procedures",
                          "Accurate diagnosis saves money",
                          "Quality repairs with warranties",
                          "Compliance with safety standards",
                          "Preserve vehicle value and reliability"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experiencing Electrical Problems?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let electrical issues leave you stranded. Our expert technicians 
                are equipped to diagnose and repair all types of vehicle electrical problems safely and efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Electrical Repair
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

export default ElectricalServices;
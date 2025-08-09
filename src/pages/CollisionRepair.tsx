import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, CheckCircle, ArrowRight, Shield, Paintbrush, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const CollisionRepair = () => {
  useSEO({
    title: "Collision Repair Services | Professional Body Work & Paint | DP Automotive",
    description: "Expert collision repair and bodywork services in Chesterfield. Dent repair, paint restoration, frame alignment, and insurance work. Professional body shop services.",
    keywords: "collision repair Chesterfield, bodywork, paint restoration, dent repair, frame alignment, insurance claims, body shop, accident repair",
    canonical: "https://dpautorepair.co.uk/collision-repair",
    ogTitle: "Collision Repair Services | Professional Body Work & Paint",
    ogDescription: "Expert collision repair and bodywork services in Chesterfield. Professional body shop services for all insurance claims."
  });

  const repairServices = [
    {
      icon: Wrench,
      title: "Dent Repair",
      description: "Professional dent removal and body panel restoration",
      services: [
        "Paintless dent removal (PDR)",
        "Traditional dent repair",
        "Hail damage restoration",
        "Door ding removal",
        "Crease repair",
        "Panel beating services"
      ],
      benefits: [
        "Cost-effective solutions",
        "Preserve original paint",
        "Quick turnaround",
        "Professional finish"
      ]
    },
    {
      icon: Paintbrush,
      title: "Paint Restoration",
      description: "Complete paint services from touch-ups to full resprays",
      services: [
        "Colour matching and mixing",
        "Spray booth painting",
        "Touch-up paint repairs",
        "Full panel resprays",
        "Clear coat restoration",
        "Custom paint finishes"
      ],
      benefits: [
        "Perfect colour matching",
        "Professional finish quality",
        "Durable paint systems",
        "UV protection"
      ]
    },
    {
      icon: Shield,
      title: "Frame Alignment",
      description: "Structural repair and chassis alignment services",
      services: [
        "Frame straightening",
        "Unibody repair",
        "Chassis alignment",
        "Structural welding",
        "Safety cage repairs",
        "Measurement verification"
      ],
      benefits: [
        "Restore structural integrity",
        "Ensure proper alignment",
        "Maintain safety standards",
        "Precision measurements"
      ]
    },
    {
      icon: Car,
      title: "Insurance Work",
      description: "Complete insurance claim handling and repair services",
      services: [
        "Insurance assessments",
        "Claim documentation",
        "Direct billing",
        "Rental car coordination",
        "Progress updates",
        "Quality guarantees"
      ],
      benefits: [
        "Hassle-free claims process",
        "Direct insurer billing",
        "Transparent communication",
        "Guaranteed workmanship"
      ]
    }
  ];

  const repairProcess = [
    {
      step: "1",
      title: "Initial Assessment",
      description: "Comprehensive damage evaluation and repair estimate preparation"
    },
    {
      step: "2",
      title: "Insurance Coordination",
      description: "Direct communication with insurance companies for claim approval"
    },
    {
      step: "3",
      title: "Parts Ordering",
      description: "Source genuine OEM or quality aftermarket parts as required"
    },
    {
      step: "4",
      title: "Repair Execution",
      description: "Professional repair work using industry-standard techniques"
    },
    {
      step: "5",
      title: "Quality Control",
      description: "Thorough inspection and testing to ensure repair quality"
    },
    {
      step: "6",
      title: "Final Delivery",
      description: "Vehicle handover with comprehensive warranty documentation"
    }
  ];

  const insurancePartners = [
    "Admiral", "Aviva", "AXA", "Churchill", "Direct Line", "Hastings",
    "LV=", "More Than", "RAC", "Saga", "Tesco", "Zurich"
  ];

  const repairTypes = [
    {
      title: "Minor Collision Damage",
      description: "Small dents, scratches, and paint damage",
      examples: ["Car park bumps", "Shopping trolley damage", "Minor scrapes", "Paint chips"]
    },
    {
      title: "Moderate Collision Damage",
      description: "Panel replacement and moderate structural work",
      examples: ["Door replacements", "Bumper damage", "Headlight replacement", "Wing damage"]
    },
    {
      title: "Major Collision Damage",
      description: "Extensive bodywork and structural repairs",
      examples: ["Multiple panel damage", "Frame alignment", "Airbag deployment", "Structural welding"]
    }
  ];

  const qualityStandards = [
    {
      title: "Certified Technicians",
      description: "Fully qualified body repair specialists with industry certifications"
    },
    {
      title: "Modern Equipment",
      description: "State-of-the-art repair equipment and spray booth facilities"
    },
    {
      title: "Quality Materials",
      description: "Genuine OEM parts and premium paint systems for lasting repairs"
    },
    {
      title: "Industry Standards",
      description: "All repairs meet or exceed manufacturer and insurance standards"
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
              <h1 className="text-4xl md:text-6xl font-montserrat font-extralight mb-6">
                Collision Repair
                <span className="block text-primary">& Body Work</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Professional body work and collision repair services for all vehicle types. 
                From minor dents to major accident damage, we restore your vehicle 
                to pre-accident condition with quality you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Get Repair Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Emergency Repairs
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
                Complete Collision Repair Services
              </h2>
              <p className="text-lg text-muted-foreground">
                From minor scratches to major collision damage, our comprehensive 
                body shop services restore your vehicle to its original condition.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {repairServices.map((service, index) => (
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

        {/* Repair Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Repair Process
              </h2>
              <p className="text-lg text-muted-foreground">
                We follow a systematic approach to ensure every repair meets 
                the highest standards of quality and customer satisfaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repairProcess.map((item) => (
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
        </section>

        {/* Insurance Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Insurance Work Specialists
                </h2>
                <p className="text-lg text-muted-foreground">
                  We work directly with all major insurance companies to make 
                  your claim process as smooth and stress-free as possible.
                </p>
              </div>

              <Card className="shadow-card border-0 bg-secondary/20 mb-12">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Hassle-Free Insurance Claims</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Our Insurance Services:</h4>
                      <ul className="space-y-2">
                        {[
                          "Direct insurance company billing",
                          "Comprehensive damage assessments",
                          "Professional claim documentation",
                          "Regular progress updates",
                          "Rental car coordination",
                          "Warranty on all repair work"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Benefits to You:</h4>
                      <ul className="space-y-2">
                        {[
                          "No upfront payment required",
                          "Faster claim processing",
                          "Professional representation",
                          "Transparent communication",
                          "Quality guarantees",
                          "Stress-free experience"
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

              <div className="text-center">
                <h4 className="font-semibold text-lg mb-4">Approved by Major Insurers:</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm text-muted-foreground">
                  {insurancePartners.map((insurer) => (
                    <div key={insurer} className="p-2 border border-border rounded text-center">
                      {insurer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Repair Types Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Types of Collision Damage We Repair
              </h2>
              <p className="text-lg text-muted-foreground">
                No matter the extent of damage, our experienced technicians 
                have the skills and equipment to restore your vehicle.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {repairTypes.map((type) => (
                <Card key={type.title} className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl mb-4">{type.title}</CardTitle>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Common Examples:</h4>
                      <ul className="space-y-2">
                        {type.examples.map((example) => (
                          <li key={example} className="flex items-start">
                            <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/contact">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Standards Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Quality You Can Trust
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our commitment to quality ensures every repair meets or exceeds 
                  industry standards and manufacturer specifications.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {qualityStandards.map((standard) => (
                  <Card key={standard.title} className="text-center shadow-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{standard.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{standard.description}</p>
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
                Need Collision Repair Services?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let accident damage compromise your vehicle's safety or appearance. 
                Contact our expert body shop team for professional collision repair services 
                that restore your vehicle to pre-accident condition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Start Your Repair
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

export default CollisionRepair;
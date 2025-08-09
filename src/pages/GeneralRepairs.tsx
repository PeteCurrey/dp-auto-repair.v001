import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, CheckCircle, ArrowRight, Car, Settings, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const GeneralRepairs = () => {
  useSEO({
    title: "General Auto Repairs | Complete Vehicle Repair Services | DP Automotive Chesterfield",
    description: "Comprehensive automotive repair services in Chesterfield. Expert engine, transmission, brake, and suspension repairs for all makes and models. ASE certified technicians.",
    keywords: "auto repair Chesterfield, engine repair, transmission service, brake repair, suspension work, vehicle repairs, automotive service",
    canonical: "https://dpautorepair.co.uk/general-repairs",
    ogTitle: "General Auto Repairs | Complete Vehicle Repair Services",
    ogDescription: "Comprehensive automotive repair services in Chesterfield. Expert repairs for all makes and models."
  });

  const repairServices = [
    {
      icon: Car,
      title: "Engine Repair",
      description: "Complete engine diagnostic and repair services",
      services: [
        "Engine diagnostics and fault finding",
        "Cylinder head repairs and replacements",
        "Timing belt and chain services",
        "Engine rebuilds and overhauls",
        "Cooling system repairs",
        "Oil leak repairs and prevention"
      ],
      benefits: [
        "Restore engine performance",
        "Improve fuel efficiency",
        "Extend engine lifespan",
        "Prevent costly breakdowns"
      ]
    },
    {
      icon: Settings,
      title: "Transmission Service",
      description: "Expert transmission repairs and maintenance",
      services: [
        "Automatic transmission service",
        "Manual gearbox repairs",
        "Clutch replacement and adjustment",
        "Transmission fluid changes",
        "CVT transmission service",
        "Driveshaft and CV joint repairs"
      ],
      benefits: [
        "Smooth gear changes",
        "Extended transmission life",
        "Better fuel economy",
        "Reliable power transfer"
      ]
    },
    {
      icon: Shield,
      title: "Brake Systems",
      description: "Comprehensive brake system inspection and repair",
      services: [
        "Brake pad and disc replacement",
        "Brake fluid changes",
        "Brake line repairs",
        "Handbrake adjustments",
        "ABS system diagnostics",
        "Brake caliper servicing"
      ],
      benefits: [
        "Enhanced safety",
        "Improved stopping power",
        "Reduced brake noise",
        "Peace of mind driving"
      ]
    },
    {
      icon: Wrench,
      title: "Suspension Work",
      description: "Complete suspension system services",
      services: [
        "Shock absorber replacement",
        "Spring repairs and replacements",
        "Wheel alignment and balancing",
        "Steering rack repairs",
        "Ball joint replacements",
        "Anti-roll bar maintenance"
      ],
      benefits: [
        "Improved ride comfort",
        "Better handling",
        "Even tyre wear",
        "Enhanced vehicle stability"
      ]
    }
  ];

  const whyChooseUs = [
    {
      title: "ASE Certified Technicians",
      description: "Our qualified mechanics have years of experience with all vehicle makes and models"
    },
    {
      title: "State-of-the-Art Equipment",
      description: "We use the latest diagnostic tools and equipment for accurate fault finding"
    },
    {
      title: "Quality Parts & Materials",
      description: "We source genuine OEM and high-quality aftermarket parts for lasting repairs"
    },
    {
      title: "Comprehensive Warranties",
      description: "All our repair work comes with guarantees for your complete peace of mind"
    },
    {
      title: "Transparent Pricing",
      description: "Clear, upfront pricing with no hidden costs or surprise charges"
    },
    {
      title: "Customer Service",
      description: "Friendly, professional service with regular updates on your vehicle's progress"
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
                General Auto
                <span className="block text-primary">Repairs</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Complete automotive repair services for all makes and models. 
                From engine repairs to transmission service, our ASE certified 
                technicians deliver quality workmanship you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Repair Service
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Call for Quote
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
                Complete Repair Services
              </h2>
              <p className="text-lg text-muted-foreground">
                From minor adjustments to major overhauls, we provide comprehensive 
                repair solutions to keep your vehicle running safely and efficiently.
              </p>
            </div>

            <div className="space-y-12">
              {repairServices.map((service, index) => (
                <Card key={service.title} className="overflow-hidden shadow-card border-0">
                  <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                    <CardHeader className="p-8">
                      <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl mb-4">{service.title}</CardTitle>
                      <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Our Services Include:</h4>
                        <ul className="space-y-2">
                          {service.services.map((item) => (
                            <li key={item} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardHeader>
                    
                    <CardContent className={`p-8 bg-secondary/20 ${index % 2 === 1 ? 'md:order-first' : ''}`}>
                      <h4 className="font-semibold text-lg mb-4">Key Benefits:</h4>
                      <ul className="space-y-3 mb-8">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center">
                            <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                            <span className="font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="space-y-4">
                        <Button asChild className="w-full gradient-primary text-primary-foreground">
                          <Link to="/contact">
                            Book {service.title}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/contact">
                            Get Quote
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose DP Automotive?
                </h2>
                <p className="text-lg text-muted-foreground">
                  With years of experience and a commitment to excellence, 
                  we deliver reliable repairs that keep you on the road.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyChooseUs.map((item) => (
                  <Card key={item.title} className="text-center shadow-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Repair Process
                </h2>
                <p className="text-lg text-muted-foreground">
                  We follow a systematic approach to ensure every repair 
                  is completed to the highest standards.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "1",
                    title: "Initial Diagnosis",
                    description: "Comprehensive inspection and diagnostic testing to identify the root cause"
                  },
                  {
                    step: "2",
                    title: "Quote & Approval",
                    description: "Clear, detailed quote with no hidden costs before any work begins"
                  },
                  {
                    step: "3",
                    title: "Expert Repair",
                    description: "Skilled technicians perform repairs using quality parts and proven methods"
                  },
                  {
                    step: "4",
                    title: "Quality Check",
                    description: "Thorough testing and inspection to ensure repairs meet our high standards"
                  }
                ].map((item) => (
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

        {/* CTA Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Vehicle Repairs?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let vehicle problems disrupt your day. Contact our expert 
                technicians for reliable, professional repair services you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Schedule Repair
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

export default GeneralRepairs;
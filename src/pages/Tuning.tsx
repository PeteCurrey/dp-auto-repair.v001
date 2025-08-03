import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Gauge, Thermometer, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const Tuning = () => {
  useSEO({
    title: "Performance Tuning Services | ECU Remapping & Exhaust Fabrication | DP Automotive",
    description: "Professional ECU remapping, performance exhaust fabrication, and intercooler services in Chesterfield. Unlock your vehicle's potential with our expert tuning solutions.",
    keywords: "ECU remapping, performance tuning, exhaust fabrication, intercooler installation, performance upgrades, engine tuning, Chesterfield",
    canonical: "https://dpautomotive.co.uk/tuning",
    ogTitle: "Performance Tuning Services | ECU Remapping & Exhaust Fabrication",
    ogDescription: "Professional ECU remapping, performance exhaust fabrication, and intercooler services in Chesterfield."
  });

  const services = [
    {
      icon: Zap,
      title: "ECU Remapping",
      description: "Optimise your engine's performance with professional ECU remapping services",
      features: [
        "Increased power and torque output",
        "Improved fuel efficiency",
        "Enhanced throttle response",
        "Custom maps for your specific requirements",
        "Economy and performance modes available"
      ],
      benefits: [
        "Up to 30% power increase",
        "Up to 20% torque improvement",
        "Better driving experience",
        "Potential fuel savings"
      ]
    },
    {
      icon: Gauge,
      title: "Performance Exhaust Fabrication",
      description: "Custom performance exhaust systems designed and fabricated to your specifications",
      features: [
        "Stainless steel construction",
        "Custom mandrel bending",
        "Cat-back and turbo-back systems",
        "Sound level optimisation",
        "Performance-focused design"
      ],
      benefits: [
        "Improved exhaust flow",
        "Enhanced engine sound",
        "Increased performance",
        "Durable construction"
      ]
    },
    {
      icon: Thermometer,
      title: "Intercooler Services",
      description: "Professional intercooler installation and upgrades for enhanced performance",
      features: [
        "Front-mount intercooler installation",
        "Upgraded intercooler cores",
        "Custom piping fabrication",
        "Silicone hose upgrades",
        "Performance testing and validation"
      ],
      benefits: [
        "Lower intake temperatures",
        "Consistent power delivery",
        "Reduced heat soak",
        "Enhanced reliability"
      ]
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
                Performance Tuning
                <span className="block text-primary">& Modifications</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Unlock your vehicle's true potential with our professional ECU remapping, 
                custom exhaust fabrication, and intercooler services. Expert tuning solutions 
                for enhanced performance and efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Get Performance Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Book Consultation
                  </Link>
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
                Professional Tuning Services
              </h2>
              <p className="text-lg text-muted-foreground">
                From ECU remapping to custom exhaust fabrication, we provide comprehensive 
                performance solutions tailored to your vehicle's specific requirements.
              </p>
            </div>

            <div className="space-y-12">
              {services.map((service, index) => (
                <Card key={service.title} className="overflow-hidden shadow-card border-0">
                  <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                    <CardHeader className="p-8">
                      <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl mb-4">{service.title}</CardTitle>
                      <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Service Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
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
                            Request Quote
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
                  Why Choose DP Automotive for Tuning?
                </h2>
                <p className="text-lg text-muted-foreground">
                  With years of experience and state-of-the-art equipment, we deliver 
                  professional tuning solutions that exceed expectations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Expert Knowledge",
                    description: "Our technicians have extensive experience with all major vehicle makes and models"
                  },
                  {
                    title: "Quality Guarantees",
                    description: "All our tuning work comes with comprehensive warranties for your peace of mind"
                  },
                  {
                    title: "Custom Solutions",
                    description: "Every tuning project is tailored to your specific requirements and driving style"
                  },
                  {
                    title: "Latest Technology",
                    description: "We use the most advanced diagnostic and tuning equipment available"
                  },
                  {
                    title: "Performance Testing",
                    description: "All modifications are thoroughly tested to ensure optimal performance and reliability"
                  },
                  {
                    title: "Ongoing Support",
                    description: "We provide continued support and advice long after your tuning is complete"
                  }
                ].map((item) => (
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

        {/* CTA Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Unlock Your Vehicle's Potential?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contact us today to discuss your performance tuning requirements. 
                Our expert team is ready to help you achieve your performance goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Get Started Today
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

export default Tuning;
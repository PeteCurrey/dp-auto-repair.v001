import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, CheckCircle, ArrowRight, Zap, Gauge, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const PerformanceTuning = () => {
  useSEO({
    title: "Performance Tuning Services | Engine Tuning & Upgrades | DP Automotive",
    description: "Professional performance tuning services in Chesterfield. Engine tuning, performance upgrades, exhaust systems, and air intake modifications for enhanced vehicle performance.",
    keywords: "performance tuning Chesterfield, engine tuning, performance upgrades, exhaust systems, air intake, vehicle performance, power enhancement",
    canonical: "https://dpautorepair.co.uk/performance-tuning",
    ogTitle: "Performance Tuning Services | Engine Tuning & Upgrades",
    ogDescription: "Professional performance tuning services in Chesterfield. Engine tuning and performance upgrades for enhanced vehicle performance."
  });

  const tuningServices = [
    {
      icon: Settings,
      title: "Engine Tuning",
      description: "Professional engine calibration and optimisation for enhanced performance",
      services: [
        "ECU parameter adjustment",
        "Fuel mapping optimisation",
        "Ignition timing refinement",
        "Boost pressure calibration",
        "Rev limiter adjustment",
        "Performance validation testing"
      ],
      benefits: [
        "Increased power output",
        "Enhanced throttle response",
        "Improved torque delivery",
        "Better fuel efficiency"
      ]
    },
    {
      icon: Zap,
      title: "Performance Upgrades",
      description: "Hardware modifications to maximise your vehicle's potential",
      services: [
        "Turbocharger upgrades",
        "Supercharger installation",
        "Performance chip installation",
        "Fuel system upgrades",
        "Cooling system enhancement",
        "Engine internals strengthening"
      ],
      benefits: [
        "Significant power gains",
        "Enhanced reliability",
        "Future-proof modifications",
        "Professional installation"
      ]
    },
    {
      icon: Gauge,
      title: "Exhaust Systems",
      description: "Custom performance exhaust solutions for optimal flow and sound",
      services: [
        "Cat-back exhaust systems",
        "Turbo-back installations",
        "High-flow catalytic converters",
        "Performance headers",
        "Exhaust tip upgrades",
        "Sound level optimisation"
      ],
      benefits: [
        "Improved exhaust flow",
        "Enhanced engine sound",
        "Power and torque gains",
        "Visual appeal"
      ]
    },
    {
      icon: Wrench,
      title: "Air Intake Systems",
      description: "Performance air intake modifications for increased airflow",
      services: [
        "Cold air intake installation",
        "High-flow air filter upgrades",
        "Intake manifold modifications",
        "Throttle body upgrades",
        "Blow-off valve installation",
        "Intake piping optimisation"
      ],
      benefits: [
        "Increased airflow volume",
        "Better filtration efficiency",
        "Enhanced engine sound",
        "Improved throttle response"
      ]
    }
  ];

  const tuningTypes = [
    {
      title: "Stage 1 Tuning",
      description: "Entry-level performance enhancement",
      modifications: [
        "ECU remapping",
        "Air filter upgrade",
        "Basic exhaust modifications"
      ],
      gains: "15-25% power increase",
      suitable: "Daily drivers seeking better performance"
    },
    {
      title: "Stage 2 Tuning",
      description: "Moderate performance upgrade package",
      modifications: [
        "Stage 1 plus exhaust system",
        "Intake system upgrade",
        "Intercooler enhancement"
      ],
      gains: "25-35% power increase",
      suitable: "Enthusiasts wanting significant gains"
    },
    {
      title: "Stage 3 Tuning",
      description: "High-performance modification package",
      modifications: [
        "Stage 2 plus turbo upgrade",
        "Fuel system enhancement",
        "Internal engine strengthening"
      ],
      gains: "35%+ power increase",
      suitable: "Track and racing applications"
    }
  ];

  const considerations = [
    {
      title: "Reliability",
      description: "All modifications designed to maintain long-term reliability"
    },
    {
      title: "Warranty",
      description: "Comprehensive warranties on all performance work"
    },
    {
      title: "Insurance",
      description: "Guidance on insurance implications of modifications"
    },
    {
      title: "MOT Compliance",
      description: "Ensuring all modifications remain MOT compliant"
    },
    {
      title: "Fuel Quality",
      description: "Recommendations for optimal fuel types and additives"
    },
    {
      title: "Maintenance",
      description: "Adjusted service schedules for modified vehicles"
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
                Performance
                <span className="block text-primary">Tuning</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Optimise your vehicle's performance and efficiency with professional 
                tuning services. From engine calibration to performance upgrades, 
                we unlock your vehicle's true potential safely and reliably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Performance Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Discuss Your Project
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
                Performance Enhancement Services
              </h2>
              <p className="text-lg text-muted-foreground">
                From subtle improvements to radical transformations, 
                we provide comprehensive performance solutions tailored to your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {tuningServices.map((service, index) => (
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

        {/* Tuning Stages Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Performance Tuning Stages
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the right level of performance enhancement 
                based on your requirements and intended use.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tuningTypes.map((type, index) => (
                <Card key={type.title} className={`shadow-card border-0 ${index === 1 ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardHeader className="text-center">
                    {index === 1 && (
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mx-auto mb-4 w-fit">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-2xl mb-2">{type.title}</CardTitle>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <div className="text-lg font-bold text-primary mb-2">{type.gains}</div>
                    <div className="text-sm text-muted-foreground">{type.suitable}</div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3">Typical Modifications:</h4>
                    <ul className="space-y-2 mb-6">
                      {type.modifications.map((mod) => (
                        <li key={mod} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{mod}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className={`w-full ${index === 1 ? 'gradient-primary text-primary-foreground' : ''}`} variant={index === 1 ? 'default' : 'outline'}>
                      <Link to="/contact">
                        Enquire About {type.title}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Considerations Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Important Considerations
                </h2>
                <p className="text-lg text-muted-foreground">
                  Performance modifications require careful consideration of various factors 
                  to ensure optimal results and continued reliability.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {considerations.map((consideration) => (
                  <Card key={consideration.title} className="text-center shadow-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{consideration.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{consideration.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Card className="shadow-card border-0 bg-secondary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Professional Performance Tuning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Our Approach:</h4>
                      <ul className="space-y-2">
                        {[
                          "Comprehensive vehicle assessment",
                          "Custom tuning solutions",
                          "Quality parts and components",
                          "Thorough testing and validation",
                          "Ongoing support and advice"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Why Choose Us:</h4>
                      <ul className="space-y-2">
                        {[
                          "Years of tuning experience",
                          "State-of-the-art equipment",
                          "Proven track record",
                          "Comprehensive warranties",
                          "Competitive pricing"
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

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Tuning Process
                </h2>
                <p className="text-lg text-muted-foreground">
                  We follow a systematic approach to ensure every performance 
                  modification delivers the desired results safely and reliably.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "1",
                    title: "Consultation",
                    description: "Discuss your performance goals and assess your vehicle's current state"
                  },
                  {
                    step: "2",
                    title: "Planning",
                    description: "Develop a custom tuning plan based on your requirements and budget"
                  },
                  {
                    step: "3",
                    title: "Implementation",
                    description: "Professional installation and calibration of all modifications"
                  },
                  {
                    step: "4",
                    title: "Testing",
                    description: "Comprehensive testing and fine-tuning to optimise performance"
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
                Ready to Enhance Your Vehicle's Performance?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your driving experience with professional performance tuning. 
                Contact us today to discuss your performance goals and discover what's possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Start Your Project
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

export default PerformanceTuning;
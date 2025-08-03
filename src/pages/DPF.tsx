import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Settings, CheckCircle, ArrowRight, Wrench, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const DPF = () => {
  useSEO({
    title: "DPF Problems & Solutions | Diesel Particulate Filter Services | DP Automotive",
    description: "Expert DPF diagnosis, cleaning, and repair services in Chesterfield. Solve DPF problems including clogging, regeneration failure, and warning lights. Professional diesel particulate filter solutions.",
    keywords: "DPF problems, diesel particulate filter, DPF cleaning, DPF repair, regeneration failure, DPF warning light, Chesterfield diesel service",
    canonical: "https://dpautomotive.co.uk/dpf",
    ogTitle: "DPF Problems & Solutions | Diesel Particulate Filter Services",
    ogDescription: "Expert DPF diagnosis, cleaning, and repair services in Chesterfield. Professional diesel particulate filter solutions."
  });

  const commonProblems = [
    {
      icon: AlertTriangle,
      title: "DPF Clogging",
      description: "Soot and particulate matter accumulation blocking the filter",
      symptoms: [
        "Reduced engine performance",
        "Increased fuel consumption",
        "Black smoke from exhaust",
        "DPF warning light activation"
      ],
      causes: [
        "Frequent short trips",
        "Stop-and-go traffic",
        "Low exhaust temperatures",
        "Poor quality fuel"
      ]
    },
    {
      icon: Settings,
      title: "Regeneration Failure",
      description: "DPF unable to burn off accumulated soot at high temperatures",
      symptoms: [
        "Persistent warning lights",
        "Limp mode activation",
        "Engine power reduction",
        "Excessive smoke"
      ],
      causes: [
        "Malfunctioning sensors",
        "Faulty engine management",
        "Incomplete regeneration cycles",
        "Contaminated DPF"
      ]
    },
    {
      icon: Wrench,
      title: "Thermal Stress",
      description: "Structural damage from extreme temperature cycles",
      symptoms: [
        "DPF cracking or melting",
        "Ash accumulation",
        "Filter substrate damage",
        "Complete system failure"
      ],
      causes: [
        "Frequent regeneration cycles",
        "Extended idling periods",
        "Excessive soot loading",
        "Manufacturing defects"
      ]
    }
  ];

  const solutions = [
    {
      title: "Professional DPF Cleaning",
      description: "Deep cleaning to remove accumulated soot and ash",
      process: [
        "Complete DPF removal",
        "Ultrasonic cleaning process",
        "Compressed air blow-through",
        "Quality inspection and testing"
      ]
    },
    {
      title: "Forced Regeneration",
      description: "Controlled burn-off of accumulated particulates",
      process: [
        "Diagnostic system connection",
        "Temperature monitoring",
        "Controlled soot burn-off",
        "System verification testing"
      ]
    },
    {
      title: "DPF Replacement",
      description: "Complete filter replacement when cleaning isn't sufficient",
      process: [
        "Genuine OEM part sourcing",
        "Professional installation",
        "System programming",
        "Performance validation"
      ]
    }
  ];

  const preventativeMeasures = [
    {
      icon: CheckCircle,
      title: "Regular Motorway Driving",
      description: "Drive at motorway speeds to allow DPF to reach regeneration temperatures"
    },
    {
      icon: Shield,
      title: "Use High-Quality Fuel",
      description: "Quality fuel reduces soot production and supports DPF efficiency"
    },
    {
      icon: Settings,
      title: "Follow Maintenance Schedule",
      description: "Adhere to manufacturer's service intervals to prevent issues"
    },
    {
      icon: Wrench,
      title: "Address Warning Lights",
      description: "Don't ignore DPF warning lights - seek professional help promptly"
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
                DPF Problems
                <span className="block text-primary">& Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Expert diagnosis and repair of Diesel Particulate Filter issues. 
                From warning lights to complete filter failures, we provide 
                professional DPF solutions to keep your diesel vehicle running smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book DPF Diagnosis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Emergency DPF Help
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding DPF Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Understanding Diesel Particulate Filters
                </h2>
                <p className="text-lg text-muted-foreground">
                  Diesel Particulate Filters (DPFs) are essential components for reducing harmful 
                  emissions from diesel engines. However, they can experience various issues that 
                  require professional attention.
                </p>
              </div>

              <Card className="shadow-card border-0 mb-12">
                <CardHeader>
                  <CardTitle className="text-2xl">How DPFs Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A DPF captures and stores exhaust soot particles to reduce emissions. 
                    When the filter becomes full, it initiates a regeneration process that 
                    burns off the accumulated soot at high temperatures (typically 600°C+).
                  </p>
                  <p className="text-muted-foreground">
                    This regeneration process requires specific driving conditions and can 
                    fail if the vehicle is primarily used for short trips or city driving.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Problems Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Common DPF Problems
              </h2>
              <p className="text-lg text-muted-foreground">
                Recognising the signs and understanding the causes of DPF issues 
                can help prevent costly repairs and ensure your vehicle's reliability.
              </p>
            </div>

            <div className="space-y-12">
              {commonProblems.map((problem, index) => (
                <Card key={problem.title} className="overflow-hidden shadow-card border-0">
                  <div className="grid md:grid-cols-2 gap-8">
                    <CardHeader className="p-8">
                      <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center mb-6">
                        <problem.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-2xl mb-4">{problem.title}</CardTitle>
                      <p className="text-muted-foreground text-lg mb-6">{problem.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-4">Warning Signs:</h4>
                        <ul className="space-y-2">
                          {problem.symptoms.map((symptom) => (
                            <li key={symptom} className="flex items-start">
                              <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-8 bg-secondary/20">
                      <h4 className="font-semibold text-lg mb-4">Common Causes:</h4>
                      <ul className="space-y-3">
                        {problem.causes.map((cause) => (
                          <li key={cause} className="flex items-start">
                            <ArrowRight className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Professional DPF Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Our experienced technicians provide comprehensive DPF services 
                using the latest diagnostic equipment and proven repair methods.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Card key={solution.title} className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-4">Our Process:</h4>
                    <ul className="space-y-2">
                      {solution.process.map((step, index) => (
                        <li key={step} className="flex items-start">
                          <span className="w-6 h-6 gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Preventative Measures Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Preventing DPF Problems
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple maintenance practices can significantly reduce the likelihood 
                of DPF issues and extend your filter's lifespan.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {preventativeMeasures.map((measure) => (
                <Card key={measure.title} className="text-center shadow-card border-0">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <measure.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{measure.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{measure.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* When to Seek Help Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-card border-0 bg-destructive/5">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl md:text-3xl mb-4">
                    When to Seek Professional Help
                  </CardTitle>
                  <p className="text-lg text-muted-foreground">
                    Don't ignore DPF warning signs. Early intervention can prevent 
                    costly repairs and keep your vehicle running efficiently.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Immediate Attention Required:</h4>
                      <ul className="space-y-2">
                        {[
                          "DPF warning light is illuminated",
                          "Engine in limp mode",
                          "Excessive black smoke",
                          "Significant power loss",
                          "Strong exhaust odours"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Why Choose DP Automotive:</h4>
                      <ul className="space-y-2">
                        {[
                          "Advanced DPF diagnostic equipment",
                          "Experienced diesel specialists",
                          "Comprehensive service warranties",
                          "Competitive pricing",
                          "Quick turnaround times"
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
                Experiencing DPF Problems?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let DPF issues leave you stranded. Contact our expert technicians 
                today for fast, reliable DPF diagnosis and repair services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book DPF Service
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

export default DPF;
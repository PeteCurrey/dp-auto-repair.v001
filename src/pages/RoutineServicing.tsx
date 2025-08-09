import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, ArrowRight, Calendar, Droplets, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const RoutineServicing = () => {
  useSEO({
    title: "Routine Vehicle Servicing | Regular Maintenance Services | DP Automotive",
    description: "Professional routine servicing in Chesterfield. Oil changes, filter replacements, fluid checks, and safety inspections. Keep your vehicle running smoothly with regular maintenance.",
    keywords: "routine servicing Chesterfield, vehicle maintenance, oil change, filter replacement, vehicle service, regular maintenance, safety inspection",
    canonical: "https://dpautorepair.co.uk/routine-servicing",
    ogTitle: "Routine Vehicle Servicing | Regular Maintenance Services",
    ogDescription: "Professional routine servicing in Chesterfield. Keep your vehicle running smoothly with regular maintenance."
  });

  const servicingTypes = [
    {
      icon: Droplets,
      title: "Oil Changes",
      description: "Regular oil and filter changes to keep your engine running smoothly",
      services: [
        "Engine oil replacement",
        "Oil filter replacement",
        "Oil quality assessment",
        "Disposal of old oil",
        "Top-up of other fluids",
        "Basic visual inspection"
      ],
      intervals: [
        "Every 6 months or 6,000 miles",
        "Manufacturer-specific intervals",
        "Severe driving conditions",
        "Synthetic oil benefits"
      ]
    },
    {
      icon: Filter,
      title: "Filter Replacements",
      description: "Complete filter maintenance for optimal vehicle performance",
      services: [
        "Air filter replacement",
        "Cabin/pollen filter change",
        "Fuel filter replacement",
        "Oil filter service",
        "Transmission filter change",
        "Hydraulic filter service"
      ],
      intervals: [
        "Annual filter inspections",
        "Mileage-based replacements",
        "Seasonal considerations",
        "Performance improvements"
      ]
    },
    {
      icon: Shield,
      title: "Fluid Checks",
      description: "Comprehensive fluid level and quality inspections",
      services: [
        "Brake fluid testing",
        "Coolant level and quality",
        "Power steering fluid",
        "Transmission fluid check",
        "Windscreen washer top-up",
        "Differential oil service"
      ],
      intervals: [
        "Monthly level checks",
        "Quality testing",
        "Seasonal preparations",
        "System maintenance"
      ]
    },
    {
      icon: Calendar,
      title: "Safety Inspections",
      description: "Thorough safety checks to ensure roadworthiness",
      services: [
        "Tyre condition and pressure",
        "Brake system inspection",
        "Light and electrical checks",
        "Suspension components",
        "Exhaust system check",
        "Steering alignment"
      ],
      intervals: [
        "Pre-MOT inspections",
        "Seasonal safety checks",
        "Long journey preparations",
        "Regular maintenance"
      ]
    }
  ];

  const servicePackages = [
    {
      title: "Basic Service",
      description: "Essential maintenance for regular drivers",
      includes: [
        "Engine oil change",
        "Oil filter replacement",
        "Fluid level checks",
        "Tyre pressure check",
        "Basic visual inspection",
        "Service reminder reset"
      ],
      recommended: "Every 6 months or 6,000 miles"
    },
    {
      title: "Full Service",
      description: "Comprehensive maintenance for optimal performance",
      includes: [
        "All Basic Service items",
        "Air filter replacement",
        "Cabin filter change",
        "Brake system inspection",
        "Battery test",
        "Exhaust emission check",
        "Suspension check",
        "Drive belt inspection"
      ],
      recommended: "Every 12 months or 12,000 miles"
    },
    {
      title: "Major Service",
      description: "Extensive maintenance for maximum reliability",
      includes: [
        "All Full Service items",
        "Spark plug replacement",
        "Fuel filter change",
        "Coolant system service",
        "Transmission service",
        "Brake fluid replacement",
        "Timing belt inspection",
        "Comprehensive diagnostics"
      ],
      recommended: "Every 24 months or 24,000 miles"
    }
  ];

  const benefits = [
    {
      title: "Prevent Costly Repairs",
      description: "Regular maintenance identifies potential issues before they become expensive problems"
    },
    {
      title: "Maintain Warranty",
      description: "Keep your vehicle warranty valid with documented service history"
    },
    {
      title: "Improve Fuel Economy",
      description: "Well-maintained vehicles run more efficiently and use less fuel"
    },
    {
      title: "Enhance Safety",
      description: "Regular checks ensure your vehicle is safe and roadworthy"
    },
    {
      title: "Extend Vehicle Life",
      description: "Proper maintenance significantly extends your vehicle's lifespan"
    },
    {
      title: "Maintain Value",
      description: "Full service history helps maintain your vehicle's resale value"
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
                Routine Vehicle
                <span className="block text-primary">Servicing</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Keep your vehicle running smoothly with regular professional maintenance. 
                From oil changes to comprehensive inspections, our routine servicing 
                helps prevent problems and ensures optimal performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Service
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:01246233483">
                    Service Enquiry
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
                Comprehensive Servicing Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Our routine servicing covers all essential maintenance areas 
                to keep your vehicle safe, reliable, and efficient.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {servicingTypes.map((service, index) => (
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
                        <h4 className="font-semibold text-lg mb-3">Service Intervals:</h4>
                        <ul className="space-y-2">
                          {service.intervals.map((interval) => (
                            <li key={interval} className="flex items-center">
                              <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                              <span className="text-sm font-medium">{interval}</span>
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

        {/* Service Packages Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Service Packages
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the right service level for your vehicle's needs and driving patterns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {servicePackages.map((pkg, index) => (
                <Card key={pkg.title} className={`shadow-card border-0 ${index === 1 ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardHeader className="text-center">
                    {index === 1 && (
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mx-auto mb-4 w-fit">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-2xl mb-2">{pkg.title}</CardTitle>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <div className="text-sm text-primary font-medium bg-primary/10 px-3 py-2 rounded-lg">
                      {pkg.recommended}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className={`w-full ${index === 1 ? 'gradient-primary text-primary-foreground' : ''}`} variant={index === 1 ? 'default' : 'outline'}>
                      <Link to="/contact">
                        Book {pkg.title}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Benefits of Regular Servicing
                </h2>
                <p className="text-lg text-muted-foreground">
                  Regular maintenance is an investment in your vehicle's performance, 
                  safety, and longevity.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit) => (
                  <Card key={benefit.title} className="text-center shadow-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Reminders Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-card border-0 bg-secondary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl md:text-3xl mb-4">
                    Service Reminder System
                  </CardTitle>
                  <p className="text-lg text-muted-foreground">
                    Never miss another service with our convenient reminder system.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">How It Works:</h4>
                      <ul className="space-y-2">
                        {[
                          "Automatic service history tracking",
                          "Email and SMS reminders",
                          "Customised service intervals",
                          "MOT and insurance reminders",
                          "Special offer notifications"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Benefits:</h4>
                      <ul className="space-y-2">
                        {[
                          "Never miss a service deadline",
                          "Maintain warranty compliance",
                          "Protect your investment",
                          "Peace of mind motoring",
                          "Convenient booking system"
                        ].map((item) => (
                          <li key={item} className="flex items-start">
                            <ArrowRight className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <Button asChild className="gradient-primary text-primary-foreground">
                      <Link to="/contact">
                        Sign Up for Reminders
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
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
                Keep Your Vehicle in Peak Condition
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Regular servicing is the key to reliable, safe, and efficient motoring. 
                Book your next service today and experience the difference professional 
                maintenance makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Link to="/contact">
                    Book Your Service
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

export default RoutineServicing;
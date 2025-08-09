import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Thermometer, Wind, AlertCircle, CheckCircle, Wrench, Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const AirConditioning = () => {
  useSEO({
    title: "Air Conditioning Regas & Repair Services | DP Auto Repair & Diagnostics",
    description: "Professional air conditioning regas, repair and maintenance services. Keep your car cool with our expert A/C services. Book your air con service today.",
    keywords: "air conditioning regas, car AC repair, air con service, automotive air conditioning, AC gas top up, climate control repair"
  });

  const acServices = [
    {
      icon: Snowflake,
      title: "Air Conditioning Regas",
      description: "Complete system regas with high-quality refrigerant to restore optimal cooling performance.",
      services: [
        "System evacuation and recharge",
        "R134a and R1234yf refrigerant",
        "Leak detection and repair",
        "Performance testing"
      ],
      benefits: [
        "Restored cooling efficiency",
        "Reduced fuel consumption",
        "Extended system lifespan"
      ]
    },
    {
      icon: Thermometer,
      title: "Climate Control Repair",
      description: "Comprehensive diagnosis and repair of climate control systems and components.",
      services: [
        "Temperature sensor replacement",
        "Blend door actuator repair",
        "Control module diagnostics",
        "Cabin filter replacement"
      ],
      benefits: [
        "Accurate temperature control",
        "Improved air quality",
        "Enhanced comfort"
      ]
    },
    {
      icon: Wind,
      title: "System Maintenance",
      description: "Preventative maintenance to keep your air conditioning running efficiently.",
      services: [
        "Condenser cleaning",
        "Evaporator inspection",
        "Belt and pulley checks",
        "Pressure testing"
      ],
      benefits: [
        "Prevents costly breakdowns",
        "Maintains warranty",
        "Optimal performance"
      ]
    }
  ];

  const commonIssues = [
    {
      icon: AlertCircle,
      title: "Poor Cooling Performance",
      symptoms: ["Warm air from vents", "Inconsistent temperatures", "Takes long time to cool"],
      causes: ["Low refrigerant levels", "Blocked condenser", "Faulty compressor"]
    },
    {
      icon: AlertCircle,
      title: "Strange Noises",
      symptoms: ["Clicking sounds", "Grinding noises", "Squealing belts"],
      causes: ["Worn bearings", "Loose belts", "Failing compressor clutch"]
    },
    {
      icon: AlertCircle,
      title: "Unpleasant Odours",
      symptoms: ["Musty smells", "Sweet odours", "Chemical smells"],
      causes: ["Dirty cabin filter", "Refrigerant leaks", "Mould in system"]
    }
  ];

  const whyChooseUs = [
    "Qualified air conditioning technicians",
    "Latest diagnostic equipment",
    "High-quality refrigerants and parts",
    "Comprehensive leak detection",
    "All makes and models serviced",
    "Competitive pricing with warranty"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background via-background to-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Air Conditioning Regas & Repair
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keep your vehicle cool and comfortable with our professional air conditioning services. 
              From regas to complete system repairs, we ensure optimal performance year-round.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                <Calendar className="mr-2 h-5 w-5" />
                Book AC Service
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-5 w-5" />
                Call (01246) 233483
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Air Conditioning Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Air Conditioning Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive air conditioning services ensure your vehicle's climate control 
              system operates at peak efficiency, providing comfort in all weather conditions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {acServices.map((service, index) => (
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

      {/* Common Issues */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Common Air Conditioning Problems
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Recognise the signs of air conditioning issues and understand what might be causing them. 
              Early detection can save you from costly repairs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {commonIssues.map((issue, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <issue.icon className="h-6 w-6 text-destructive" />
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Symptoms:</h4>
                      <ul className="space-y-1">
                        {issue.symptoms.map((symptom, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {symptom}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Common Causes:</h4>
                      <ul className="space-y-1">
                        {issue.causes.map((cause, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {cause}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose DP Automotive for Air Conditioning?
              </h2>
              <p className="text-lg text-muted-foreground">
                Trust our experienced team to keep your vehicle's air conditioning running smoothly.
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
            Stay Cool This Summer
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't let a faulty air conditioning system ruin your journey. Book your AC service today 
            and enjoy comfortable driving all year round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Calendar className="mr-2 h-5 w-5" />
              Book AC Service
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AirConditioning;
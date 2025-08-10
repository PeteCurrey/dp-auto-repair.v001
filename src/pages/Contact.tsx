
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Car,
  Calendar,
  MessageSquare,
  ArrowRight 
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Map from "@/components/Map";

const Contact = () => {
  useSEO({
    title: "Contact DP Automotive | Book Auto Repair Service Chesterfield",
    description: "Contact DP Automotive for professional auto repair services in Chesterfield. Located at Unit 5 Vanguard Trading Estate. Call (01246) 233483 to book your service today.",
    keywords: "contact DP Automotive, book auto repair Chesterfield, automotive service booking, car repair contact",
    canonical: "https://dpautorepair.co.uk/contact",
    ogTitle: "Contact DP Automotive | Book Auto Repair Service Chesterfield",
    ogDescription: "Contact DP Automotive for professional auto repair services in Chesterfield. Call (01246) 233483 to book your service today."
  });

  const { toast } = useToast();
  const location = useLocation();

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(01246) 233483",
      description: "Call us during business hours for immediate assistance",
      action: "tel:+01246233483"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@dpautorepair.co.uk",
      description: "Send us a message and we'll respond within 24 hours",
      action: "mailto:hello@dpautorepair.co.uk"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Unit 5 Vanguard Trading Estate, Chesterfield S40 2TZ",
      description: "Easy parking available on-site",
      action: "https://www.google.com/maps/dir/?api=1&destination=53.2307,-1.4659"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 9:00 AM - 5:00 PM",
      description: "Closed Saturdays & Sundays",
      action: null
    }
  ];

  const services = [
    "General Repairs",
    "Diagnostics", 
    "Routine Servicing",
    "Electrical Services",
    "Performance Tuning",
    "Collision Repair",
    "Emergency Service",
    "Other"
  ];

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState(services[0]);
  const [vehicleInfo, setVehicleInfo] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${firstName} ${lastName}`.trim();
    if (!fullName || !email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email so we can get back to you.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    console.log("Submitting contact form...", { fullName, email, phoneValue, serviceNeeded, vehicleInfo, message });

    const { error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          full_name: fullName,
          email,
          phone: phoneValue || null,
          service_needed: serviceNeeded || null,
          vehicle_info: vehicleInfo || null,
          message: message || null,
          source_page: location?.pathname || "/contact",
        },
      ]);

    if (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Submission failed",
        description: "We couldn't send your message. Please try again in a moment.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message sent",
        description: "Thanks for contacting us — we’ll be in touch shortly.",
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneValue("");
      setServiceNeeded(services[0]);
      setVehicleInfo("");
      setMessage("");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/50">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-montserrat font-extralight mb-6">
              Contact
              <span className="block text-primary-glow">DP Automotive</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to get your vehicle serviced? Have questions about our services? 
              We're here to help. Reach out using any of the methods below.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title} 
                  className="hover-lift shadow-card border-0 bg-card/80 backdrop-blur-sm text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{info.title}</h2>
                    {info.action ? (
                      <a 
                        href={info.action}
                        className="text-primary font-medium hover:underline block mb-2"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-primary font-medium mb-2">{info.details}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input 
                          placeholder="John" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input 
                          placeholder="Doe" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input 
                        type="tel" 
                        placeholder="(01246) 123-456" 
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Service Needed</label>
                      <select 
                        className="w-full p-2 border border-input rounded-md bg-background"
                        value={serviceNeeded}
                        onChange={(e) => setServiceNeeded(e.target.value)}
                      >
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Vehicle Information</label>
                      <Input 
                        placeholder="Year, Make, Model (e.g., 2020 Honda Civic)" 
                        value={vehicleInfo}
                        onChange={(e) => setVehicleInfo(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea 
                        placeholder="Please describe your vehicle's issues or the service you need..."
                        className="min-h-[120px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full gradient-primary text-primary-foreground shadow-elegant"
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-8">
                <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Car className="w-6 h-6 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start h-auto p-4" variant="outline">
                      <Calendar className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Book a Service</div>
                        <div className="text-sm text-muted-foreground">Schedule your vehicle maintenance</div>
                      </div>
                    </Button>
                    
                    <Button className="w-full justify-start h-auto p-4" variant="outline">
                      <Phone className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Emergency Service</div>
                        <div className="text-sm text-muted-foreground">Call for urgent repairs</div>
                      </div>
                    </Button>
                    
                    <Button className="w-full justify-start h-auto p-4" variant="outline">
                      <MessageSquare className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Get a Quote</div>
                        <div className="text-sm text-muted-foreground">Request pricing information</div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Visit Our Workshop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Map lat={53.2307} lng={-1.4659} markerLabel="DP Automotive Repair & Diagnostics" />
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Unit 5 Vanguard Trading Estate</p>
                      <p className="text-muted-foreground">Chesterfield S40 2TZ</p>
                      <p className="text-muted-foreground">Free on-site parking available</p>
                    </div>
                    <Button className="w-full mt-4" variant="outline" asChild>
                      <a href="https://www.google.com/maps/dir/?api=1&destination=53.2307,-1.4659" target="_blank" rel="noopener noreferrer">
                        Get Directions
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-2xl mx-auto shadow-card border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Need Emergency Service?</h2>
                <p className="text-muted-foreground mb-6">
                  Vehicle breakdown or urgent repair needed? Call us immediately for 
                  emergency automotive services.
                </p>
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  Clock, 
  Shield,
  ArrowRight,
  Star,
  CheckCircle 
} from "lucide-react";
import mechanicImage from "@/assets/mechanic-diagnostics.jpg";
import workshopImage from "@/assets/professional-garage-snapon.jpg";
import { useSEO } from "@/hooks/useSEO";

const About = () => {
  useSEO({
    title: "About DP Automotive | 15+ Years Auto Repair Experience Chesterfield",
    description: "Learn about DP Automotive's 15+ years of professional automotive repair experience in Chesterfield. ASE certified technicians, quality workmanship, and customer satisfaction guaranteed.",
    keywords: "about DP Automotive, automotive repair experience, ASE certified technicians Chesterfield, auto repair history, professional mechanics",
    canonical: "https://dpautomotive.co.uk/about",
    ogTitle: "About DP Automotive | 15+ Years Auto Repair Experience Chesterfield",
    ogDescription: "Learn about DP Automotive's 15+ years of professional automotive repair experience in Chesterfield."
  });

  const stats = [
    { icon: Users, value: "500+", label: "Happy Customers" },
    { icon: Clock, value: "15+", label: "Years Experience" },
    { icon: Award, value: "ASE", label: "Certified Technicians" },
    { icon: Shield, value: "100%", label: "Satisfaction Guarantee" }
  ];

  const values = [
    {
      title: "Quality Workmanship",
      description: "Every repair is performed to the highest standards using quality parts and proven techniques."
    },
    {
      title: "Honest Pricing",
      description: "Transparent, competitive pricing with no hidden fees or surprise charges."
    },
    {
      title: "Customer First",
      description: "Your satisfaction is our priority. We treat every vehicle as if it were our own."
    },
    {
      title: "Continuous Learning",
      description: "Our technicians stay current with the latest automotive technology and repair methods."
    }
  ];

  const certifications = [
    "ASE Master Technician Certified",
    "Bosch Automotive Service Solutions",
    "Hunter Engineering Alignment",
    "NAPA AutoCare Center"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-6">
                  About DP Automotive
                </Badge>
                <h1 className="text-4xl md:text-6xl font-montserrat font-extralight mb-6">
                  Your Trusted
                  <span className="block text-primary-glow">Automotive Partner</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  For over 15 years, DP Automotive has been Chesterfield's premier 
                  destination for reliable, professional automotive repair and diagnostics. 
                  We combine old-school craftsmanship with cutting-edge technology.
                </p>
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="relative">
                <img 
                  src={mechanicImage} 
                  alt="Professional mechanic performing diagnostics"
                  className="rounded-lg shadow-elegant w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label} 
                  className="text-center hover-lift shadow-card border-0 bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={workshopImage} 
                  alt="Professional automotive garage with quality Snap On tools"
                  className="rounded-lg shadow-elegant w-full"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Story & Mission
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2009, DP Automotive began as a small family-owned business 
                    with a simple mission: provide honest, reliable automotive services 
                    that customers can trust.
                  </p>
                  <p>
                    What started as a one-bay operation has grown into Chesterfield's 
                    most trusted automotive service center, equipped with state-of-the-art 
                    diagnostic equipment and staffed by ASE-certified technicians.
                  </p>
                  <p>
                    Today, we continue to uphold the same values that founded our business: 
                    integrity, quality, and customer satisfaction above all else.
                  </p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Our Certifications</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground">
                These principles guide everything we do and ensure that every 
                customer receives the exceptional service they deserve.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={value.title} 
                  className="hover-lift shadow-card border-0 bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust DP Automotive 
              with their vehicle's care and maintenance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                Book Your Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Us Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
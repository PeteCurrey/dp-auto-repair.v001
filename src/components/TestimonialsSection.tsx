import { useState, useEffect } from "react";
import { Star, Quote, Shield, Award, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "James Richardson",
    vehicle: "BMW 330d",
    rating: 5,
    text: "Absolutely brilliant service! Had my ECU remapped and the difference is incredible. Professional, honest, and fairly priced. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    name: "Sarah Mitchell",
    vehicle: "Ford Focus",
    rating: 5,
    text: "Best garage in Chesterfield. They diagnosed a fault that two other garages couldn't find. Fair pricing and great communication throughout.",
    date: "1 month ago",
  },
  {
    name: "David Thompson",
    vehicle: "Audi A4",
    rating: 5,
    text: "Had my MOT done here for years. Always honest about what needs doing and never try to upsell unnecessary work. Trustworthy and reliable.",
    date: "3 weeks ago",
  },
  {
    name: "Emma Wilson",
    vehicle: "VW Golf GTI",
    rating: 5,
    text: "The team here really know their stuff. My Golf runs better than ever after their full service. Will definitely be coming back!",
    date: "1 week ago",
  },
  {
    name: "Michael Brown",
    vehicle: "Mercedes C-Class",
    rating: 5,
    text: "Exceptional attention to detail. They found and fixed issues that the main dealer missed. Saved me hundreds compared to Mercedes prices.",
    date: "2 months ago",
  },
];

const trustBadges = [
  { icon: Shield, label: "12 Month Warranty", description: "On all work" },
  { icon: Award, label: "ASE Certified", description: "Expert technicians" },
  { icon: Clock, label: "15+ Years", description: "Serving Chesterfield" },
  { icon: Star, label: "5 Star Rated", description: "Customer reviews" },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 hover-lift"
            >
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <badge.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{badge.label}</h3>
              <p className="text-sm text-secondary-foreground/70">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with DP Automotive.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-card">
                    <Quote className="h-10 w-10 text-primary/30 mb-4" />
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-lg mb-6 text-foreground/90">"{testimonial.text}"</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.vehicle}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card border-border hover:bg-accent hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card border-border hover:bg-accent hidden md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-secondary-foreground/30 hover:bg-secondary-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-secondary-foreground/70 mb-4">
            Join hundreds of satisfied customers in Chesterfield
          </p>
          <Button asChild className="gradient-primary text-primary-foreground shadow-elegant">
            <a href="/book">Book Your Service Today</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

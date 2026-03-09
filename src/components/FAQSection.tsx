import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQ[];
  className?: string;
}

const FAQSection = ({ 
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our automotive services.",
  faqs,
  className = ""
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 60} direction="none">
                <Card className={`shadow-card border-0 transition-all duration-300 ${openIndex === index ? 'border-l-4 border-l-primary shadow-elegant' : ''}`}>
                  <CardHeader>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto text-left"
                      onClick={() => toggleFAQ(index)}
                    >
                      <CardTitle className="text-lg font-semibold text-left">
                        {faq.question}
                      </CardTitle>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${openIndex === index ? 'rotate-180' : ''}`} />
                    </Button>
                  </CardHeader>
                  {/* Animated height using grid trick */}
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <CardContent className="pt-0">
                        <div className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

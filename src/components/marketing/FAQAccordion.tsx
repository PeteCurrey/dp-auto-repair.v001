import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  questions: FAQItem[];
  title?: string;
  subtitle?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  questions, 
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our services in Chesterfield"
}) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-4 text-foreground">{title}</h2>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {questions.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-lg px-6 transition-all duration-300 hover:shadow-elegant overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline hover:text-primary decoration-transparent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;

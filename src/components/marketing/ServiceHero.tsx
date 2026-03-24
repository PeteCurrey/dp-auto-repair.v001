import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  cta1Text?: string;
  cta1Href?: string;
  cta2Text?: string;
  cta2Href?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  subtitle,
  cta1Text = "Book Online",
  cta1Href = "/contact",
  cta2Text = "01246 233483",
  cta2Href = "tel:01246233483"
}) => {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/50 to-secondary/20 pt-[160px] pb-32 lg:pb-40 -mt-[160px] overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 pt-20 md:pt-24 lg:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full animate-fade-in">
            Chesterfield Specialists
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground mb-8 animate-slide-up">
            {title.split('|')[0].trim()}
            <span className="block text-primary font-normal mt-2">
              {title.split('|')[1]?.trim() || ''}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto animate-slide-up delay-100">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
            <Button asChild size="lg" className="px-10 h-14 text-lg font-medium shadow-elegant hover-lift gradient-primary border-0">
              <Link href={cta1Href}>
                <Calendar className="h-5 w-5 mr-3" />
                {cta1Text}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-10 h-14 text-lg font-medium border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <a href={cta2Href}>
                <Phone className="h-5 w-5 mr-3 text-primary" />
                {cta2Text}
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  );
};

export default ServiceHero;

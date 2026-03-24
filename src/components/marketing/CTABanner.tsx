import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

interface CTABannerProps {
  headline: string;
  subtext: string;
  phone?: string;
  bookingHref?: string;
}

const CTABanner: React.FC<CTABannerProps> = ({
  headline,
  subtext,
  phone = "01246 233483",
  bookingHref = "/contact"
}) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl rounded-3xl gradient-primary p-12 lg:p-20 text-center text-primary-foreground shadow-elegant relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extralight mb-6">{headline}</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            {subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="px-10 h-14 text-lg font-medium shadow-lg hover-lift">
              <Link href={bookingHref}>
                <Calendar className="h-5 w-5 mr-3" />
                Book Online Today
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-10 h-14 text-lg font-medium bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover-lift">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                {phone}
              </a>
            </Button>
          </div>
        </div>
        
        {/* Soft decorative background circles */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default CTABanner;

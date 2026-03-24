import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { marketingAreas } from '@/data/marketing-areas';

const AreasList: React.FC = () => {
  const areas = Object.values(marketingAreas);
  
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extralight mb-4">Local Areas We Cover</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Providing expert car repairs and servicing across Chesterfield and surrounding Derbyshire communities.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {areas.map((area) => (
            <Link 
              key={area.slug} 
              href={`/areas/${area.slug}`}
              className="group flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {area.location}
              </span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Abstract map decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <circle cx="50" cy="50" r="1" fill="currentColor" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>
    </section>
  );
};

export default AreasList;

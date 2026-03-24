import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { marketingVehicles } from '@/data/marketing-vehicles';

const VehicleMakeGrid: React.FC = () => {
  const makes = Object.values(marketingVehicles);
  
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extralight mb-4">Vehicle Makes We Service</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert maintenance and repairs for all major manufacturers using dealer-level diagnostics.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {makes.map((make) => (
            <Link key={make.slug} href={`/vehicles/${make.slug}`}>
              <Card className="hover:shadow-elegant transition-all duration-300 group border-border/40 hover:border-primary/30">
                <CardContent className="p-6 flex flex-col items-center justify-center aspect-square">
                  <div className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors text-center">
                    {make.make}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Specialist
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            Don't see your make? We service all cars and light commercials. 
            <Link href="/contact" className="text-primary font-medium ml-2 hover:underline">Enquire now</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VehicleMakeGrid;

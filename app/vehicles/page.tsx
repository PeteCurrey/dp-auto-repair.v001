import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadcrumbNav from '@/components/marketing/BreadcrumbNav';
import VehicleMakeGrid from '@/components/marketing/VehicleMakeGrid';
import CTABanner from '@/components/marketing/CTABanner';

export const metadata: Metadata = {
  title: "Vehicle Specialists Chesterfield | Car Makes We Service",
  description: "Expert independent specialist garage in Chesterfield for Ford, VW, BMW, Audi, Mercedes and more. Manufacturer-standard servicing for all major brands.",
};

export default function VehiclesHub() {
  const breadcrumbItems = [{ label: 'Vehicles' }];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 text-foreground">
        <div className="container mx-auto px-4">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-6">
              Vehicle <span className="text-primary font-normal">Specialists</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We provide dealer-level diagnostics and manufacturer-standard maintenance for all major automotive brands, specialising in German, Japanese, and domestic marques.
            </p>
          </div>

          <VehicleMakeGrid />

          <div className="py-20">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-3xl font-extralight mb-8">Independent Expertise. Genuine Reliability.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                At DP Automotive, we've invested in the same specialized diagnostic software and tooling used by main dealers. 
                This allows us to carry out complex repairs and official servicing while maintaining your manufacturer's warranty 
                through the Block Exemption Regulation — often at a fraction of the dealer's price.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm uppercase tracking-widest font-medium opacity-70">Warranty Safe</div>
                </div>
                <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2">Dealership</div>
                  <div className="text-sm uppercase tracking-widest font-medium opacity-70">Standard Tools</div>
                </div>
                <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2">Local</div>
                  <div className="text-sm uppercase tracking-widest font-medium opacity-70">Chesterfield Garage</div>
                </div>
              </div>
            </div>
          </div>

          <CTABanner 
            headline="Expert care for your specific vehicle"
            subtext="Select your make above to learn more about our specialist services or contact us for a personalized quote."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

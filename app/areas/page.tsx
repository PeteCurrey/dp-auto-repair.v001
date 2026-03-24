import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadcrumbNav from '@/components/marketing/BreadcrumbNav';
import AreasList from '@/components/marketing/AreasList';
import CTABanner from '@/components/marketing/CTABanner';

export const metadata: Metadata = {
  title: "Areas We Cover | Car Repairs Chesterfield & Derbyshire",
  description: "DP Automotive serves Chesterfield and surrounding North Derbyshire areas including Dronfield, Staveley, Clay Cross, and Matlock.",
};

export default function AreasHub() {
  const breadcrumbItems = [{ label: 'Areas' }];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-6">
              Areas <span className="text-primary font-normal">We Cover</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Based in the Vanguard Trading Estate, we are perfectly positioned to serve drivers from across Chesterfield and the surrounding North Derbyshire region.
            </p>
          </div>

          <AreasList />

          <div className="py-20 max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-extralight text-center mb-12">Why Drivers Across Derbyshire Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Convenient Location</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our central location just off Britannia Road in Chesterfield makes us an easy reach from the A61 and M1 motorway. Whether you're coming from Dronfield to the north or Clay Cross to the south, we're highly accessible.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Diagnostic Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Many of our customers travel from further afield specifically for our advanced diagnostic capabilities, which often surpass what is available at standard village garages.
                </p>
              </div>
            </div>
            
            <div className="mt-16 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 h-64 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground italic border border-border/50">
                [Google Maps Integration Placeholder]
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-light mb-4">Visit Our Workshop</h3>
                <address className="not-italic text-lg text-muted-foreground mb-6">
                  Unit 5, Vanguard Trading Estate,<br />
                  Britannia Road, Chesterfield,<br />
                  Derbyshire, S40 2TZ
                </address>
                <div className="flex flex-col gap-2 text-sm text-primary font-medium tracking-wide">
                  <div>MON - FRI: 08:00 - 17:30</div>
                  <div>SATURDAY: 08:00 - 13:00</div>
                  <div>SUNDAY: CLOSED</div>
                </div>
              </div>
            </div>
          </div>

          <CTABanner 
            headline="Expert car repairs right on your doorstep"
            subtext="Contact DP Automotive today to schedule your service or request a collection from your local area."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

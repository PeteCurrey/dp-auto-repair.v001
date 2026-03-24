import InformationalLandingTemplate from "@/components/InformationalLandingTemplate";

export default function ExhaustFabricationPage() {
  return (
    <InformationalLandingTemplate
      slug="tuning/exhaust-fabrication"
      pageTitle="Custom Exhaust Fabrication Chesterfield | Stainless Steel Systems"
      description="Bespoke T304 stainless steel exhaust solutions designed and built to your exact specifications in Chesterfield. Lifetime warranty on all systems."
      h1="Custom Exhaust Fabrication & Performance Systems"
      intro="Bespoke T304 stainless steel exhaust solutions designed and built to your exact specifications."
      mainContent={[
        {
          title: "Bespoke Stainless Steel Exhausts",
          content: "When it comes to your vehicle's exhaust, there's no substitute for a custom-built solution. Whether you're looking for a specific sound, improved performance, or a lifetime warranty, our expert fabricators build systems that outperform off-the-shelf alternatives.",
          points: [
            "Cat-Back & Turbo-Back Systems",
            "Custom Tailpipe Designs",
            "T304 Grade Stainless Steel",
            "Mandrel Bends for Maximum Flow"
          ]
        },
        {
          title: "Why Choose Custom Fabrication?",
          content: "Our systems are built directly onto the car for a perfect fit, come with a lifetime warranty, and can be acoustically tuned to your preference."
        }
      ]}
    />
  );
}

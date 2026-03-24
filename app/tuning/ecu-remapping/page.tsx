import InformationalLandingTemplate from "@/components/InformationalLandingTemplate";

export default function ECURemappingPage() {
  return (
    <InformationalLandingTemplate
      slug="tuning/ecu-remapping"
      pageTitle="Professional ECU Remapping Chesterfield | Performance Tuning"
      description="Unlock your vehicle's true potential with our precision engine remapping services in Chesterfield. Stage 1, Stage 2, and EGR/DPF solutions."
      h1="Professional ECU Remapping & Performance Tuning"
      intro="Unlock your vehicle's true potential with our precision engine remapping services in Chesterfield."
      mainContent={[
        {
          title: "Unlock Hidden Performance",
          content: "Modern vehicles are often 'detuned' by manufacturers to meet global market requirements and insurance groupings. Our professional ECU remapping service safely unlocks this hidden potential, delivering more power, smoother delivery, and frequently improved fuel economy.",
          points: [
            "Stage 1 Tuning: Optimal power gains for stock vehicles.",
            "Stage 2 Tuning: Higher gains for vehicles with supporting hardware.",
            "Eco Tuning: Focused on maximizing fuel efficiency."
          ]
        },
        {
          title: "Specialist Solutions",
          content: "Beyond pure performance, we offer specific software solutions for common modern diesel and petrol issues including DPF, EGR, and AdBlue software deletion for off-road use."
        }
      ]}
      showCalculator={true}
    />
  );
}

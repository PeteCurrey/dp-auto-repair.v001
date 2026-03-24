import InformationalLandingTemplate from "@/components/InformationalLandingTemplate";

export default function PerformancePartsPage() {
  return (
    <InformationalLandingTemplate
      slug="tuning/performance-parts"
      pageTitle="Performance Parts & Hardware Upgrades Chesterfield"
      description="Take your vehicle's performance to the next level with high-end hardware and professional installation at DP Auto Repair Chesterfield."
      h1="Premium Performance Parts & Hardware Upgrades"
      intro="Take your vehicle's performance to the next level with high-end hardware and professional installation."
      mainContent={[
        {
          title: "High-Quality Performance Upgrades",
          content: "A remap is only part of the story. To truly transform your driving experience, high-quality hardware upgrades are essential. We source and install industry-leading parts from the world's best manufacturers.",
          points: [
            "High-Flow Air Induction Systems",
            "Suspension Upgrades (Springs/Coilovers)",
            "Performance Brake Kits & Pads",
            "Uprated Intercoolers & Cooling",
            "Stance & Stability (Wheel Spacers)",
            "Heavy-Duty Clutch Upgrades"
          ]
        },
        {
          title: "Professional Installation",
          content: "Our qualified technicians have years of experience with performance hardware. We ensure every part is fitted to OEM+ standards or better, following strict torque specifications."
        }
      ]}
    />
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import AvirriaAdmin from "@/pages/AvirriaAdmin";

// Tuning Landing Pages
import EcuRemapChesterfield from "@/pages/EcuRemapChesterfield";
import EcuRemappingChesterfield from "@/pages/EcuRemappingChesterfield";
import PerformanceChipChesterfield from "@/pages/PerformanceChipChesterfield";
import CarTuningChesterfield from "@/pages/CarTuningChesterfield";
import CarPerformanceGarageChesterfield from "@/pages/CarPerformanceGarageChesterfield";
import CarEngineTuningChesterfield from "@/pages/CarEngineTuningChesterfield";
import TuningGarageChesterfield from "@/pages/TuningGarageChesterfield";

// Missing landing pages
import MotDueChecker from "@/pages/MotDueChecker";
import LocalMotGarage from "@/pages/LocalMotGarage";
import CarRemap from "@/pages/CarRemap";
import RemappingGuide from "@/pages/RemappingGuide";
import WhatIsCarRemapping from "@/pages/WhatIsCarRemapping";
import CarGaragesChesterfield from "@/pages/CarGaragesChesterfield";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Tuning from "./pages/Tuning";
import EcuRemapping from "./pages/EcuRemapping";
import ExhaustFabrication from "./pages/ExhaustFabrication";
import PerformancePartsInstallation from "./pages/PerformancePartsInstallation";
import DPF from "./pages/DPF";
import GeneralRepairs from "./pages/GeneralRepairs";
import Diagnostics from "./pages/Diagnostics";
import RoutineServicing from "./pages/RoutineServicing";
import ElectricalServices from "./pages/ElectricalServices";
import PerformanceTuning from "./pages/PerformanceTuning";
import CollisionRepair from "./pages/CollisionRepair";
import AirConditioning from "./pages/AirConditioning";
import TyreInstallation from "./pages/TyreInstallation";
import MOT from "./pages/MOT";
import RecoveryBreakdown from "./pages/RecoveryBreakdown";
import ClutchReplacement from "./pages/ClutchReplacement";
import TimingChainBelt from "./pages/TimingChainBelt";
import BrakeService from "./pages/BrakeService";
import SuspensionRepairs from "./pages/SuspensionRepairs";
import FleetSupport from "./pages/FleetSupport";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FordServicingChesterfield from "./pages/FordServicingChesterfield";
import BMWServicingChesterfield from "./pages/BMWServicingChesterfield";
import AudiServicingChesterfield from "./pages/AudiServicingChesterfield";
import VolkswagenServicingChesterfield from "./pages/VolkswagenServicingChesterfield";
import MercedesServicingChesterfield from "./pages/MercedesServicingChesterfield";
import AlfaRomeoServicingChesterfield from "./pages/AlfaRomeoServicingChesterfield";
import BentleyServicingChesterfield from "./pages/BentleyServicingChesterfield";
import CitroenServicingChesterfield from "./pages/CitroenServicingChesterfield";
import ChryslerServicingChesterfield from "./pages/ChryslerServicingChesterfield";
import DodgeServicingChesterfield from "./pages/DodgeServicingChesterfield";
import AbarthServicingChesterfield from "./pages/AbarthServicingChesterfield";
import AstonMartinServicingChesterfield from "./pages/AstonMartinServicingChesterfield";
import ChevroletServicingChesterfield from "./pages/ChevroletServicingChesterfield";
import CupraServicingChesterfield from "./pages/CupraServicingChesterfield";
import FerrariServicingChesterfield from "./pages/FerrariServicingChesterfield";
import FiatServicingChesterfield from "./pages/FiatServicingChesterfield";
import HondaServicingChesterfield from "./pages/HondaServicingChesterfield";
import HyundaiServicingChesterfield from "./pages/HyundaiServicingChesterfield";
import IsuzuServicingChesterfield from "./pages/IsuzuServicingChesterfield";
import JaguarServicingChesterfield from "./pages/JaguarServicingChesterfield";
import JeepServicingChesterfield from "./pages/JeepServicingChesterfield";
import KiaServicingChesterfield from "./pages/KiaServicingChesterfield";
import LamborghiniServicingChesterfield from "./pages/LamborghiniServicingChesterfield";
import LandRoverServicingChesterfield from "./pages/LandRoverServicingChesterfield";
import LexusServicingChesterfield from "./pages/LexusServicingChesterfield";
import LotusServicingChesterfield from "./pages/LotusServicingChesterfield";
import MazdaServicingChesterfield from "./pages/MazdaServicingChesterfield";
import MitsubishiServicingChesterfield from "./pages/MitsubishiServicingChesterfield";
import MiniServicingChesterfield from "./pages/MiniServicingChesterfield";
import PeugeotServicingChesterfield from "./pages/PeugeotServicingChesterfield";
import PorscheServicingChesterfield from "./pages/PorscheServicingChesterfield";
import RenaultServicingChesterfield from "./pages/RenaultServicingChesterfield";
import RollsRoyceServicingChesterfield from "./pages/RollsRoyceServicingChesterfield";
import SeatServicingChesterfield from "./pages/SeatServicingChesterfield";
import SkodaServicingChesterfield from "./pages/SkodaServicingChesterfield";
import SubaruServicingChesterfield from "./pages/SubaruServicingChesterfield";
import SuzukiServicingChesterfield from "./pages/SuzukiServicingChesterfield";
import ToyotaServicingChesterfield from "./pages/ToyotaServicingChesterfield";
import VauxhallServicingChesterfield from "./pages/VauxhallServicingChesterfield";
import TVRServicingChesterfield from "./pages/TVRServicingChesterfield";
import WestfieldServicingChesterfield from "./pages/WestfieldServicingChesterfield";
import VolvoServicingChesterfield from "./pages/VolvoServicingChesterfield";
import MechanicChesterfield from "./pages/MechanicChesterfield";
import OilChangeChesterfield from "./pages/OilChangeChesterfield";
import BrakeRepairChesterfield from "./pages/BrakeRepairChesterfield";
import ClutchReplacementChesterfield from "./pages/ClutchReplacementChesterfield";
import ExhaustReplacementChesterfield from "./pages/ExhaustReplacementChesterfield";
import TimingChainReplacementChesterfield from "./pages/TimingChainReplacementChesterfield";

// New Landing Pages
import ServiceVsMotDifference from "./pages/ServiceVsMotDifference";
import HowLongMotTakes from "./pages/HowLongMotTakes";
import HowLongServiceTakes from "./pages/HowLongServiceTakes";
import WhenChangeTimingBelt from "./pages/WhenChangeTimingBelt";
import MotRetest from "./pages/MotRetest";
import MotAndService from "./pages/MotAndService";
import BrakeDiscLifespan from "./pages/BrakeDiscLifespan";
import WhenMotDue from "./pages/WhenMotDue";

import SitemapXML from "./components/SitemapXML";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/avorria-admin" element={<AvirriaAdmin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tuning" element={<Tuning />} />
          <Route path="/tuning/ecu-remapping" element={<EcuRemapping />} />
          <Route path="/tuning/exhaust-fabrication" element={<ExhaustFabrication />} />
          <Route path="/tuning/performance-parts" element={<PerformancePartsInstallation />} />
          <Route path="/dpf" element={<DPF />} />
          <Route path="/general-repairs" element={<GeneralRepairs />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/routine-servicing" element={<RoutineServicing />} />
          <Route path="/electrical-services" element={<ElectricalServices />} />
          <Route path="/performance-tuning" element={<PerformanceTuning />} />
          <Route path="/collision-repair" element={<CollisionRepair />} />
          <Route path="/air-conditioning" element={<AirConditioning />} />
          <Route path="/tyre-installation" element={<TyreInstallation />} />
          <Route path="/mot" element={<MOT />} />
          <Route path="/recovery-breakdown" element={<RecoveryBreakdown />} />
          <Route path="/clutch-replacement" element={<ClutchReplacement />} />
          <Route path="/timing-chain-belt" element={<TimingChainBelt />} />
          <Route path="/brake-service" element={<BrakeService />} />
          <Route path="/suspension-repairs" element={<SuspensionRepairs />} />
          <Route path="/fleet-support" element={<FleetSupport />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Tuning Landing Pages - Not in main menu */}
          <Route path="/ecu-remap-chesterfield" element={<EcuRemapChesterfield />} />
          <Route path="/ecu-remapping-chesterfield" element={<EcuRemappingChesterfield />} />
          <Route path="/performance-chip-chesterfield" element={<PerformanceChipChesterfield />} />
          <Route path="/car-tuning-chesterfield" element={<CarTuningChesterfield />} />
          <Route path="/car-performance-garage-chesterfield" element={<CarPerformanceGarageChesterfield />} />
          <Route path="/car-engine-tuning-chesterfield" element={<CarEngineTuningChesterfield />} />
          <Route path="/tuning-garage-chesterfield" element={<TuningGarageChesterfield />} />

          {/* SEO Landing Pages - Not in main menu */}
          <Route path="/ford-servicing-chesterfield" element={<FordServicingChesterfield />} />
          <Route path="/bmw-servicing-chesterfield" element={<BMWServicingChesterfield />} />
          <Route path="/audi-servicing-chesterfield" element={<AudiServicingChesterfield />} />
          <Route path="/volkswagen-servicing-chesterfield" element={<VolkswagenServicingChesterfield />} />
          <Route path="/mercedes-servicing-chesterfield" element={<MercedesServicingChesterfield />} />
          <Route path="/alfa-romeo-servicing-chesterfield" element={<AlfaRomeoServicingChesterfield />} />
          <Route path="/bentley-servicing-chesterfield" element={<BentleyServicingChesterfield />} />
          <Route path="/citroen-servicing-chesterfield" element={<CitroenServicingChesterfield />} />
          <Route path="/chrysler-servicing-chesterfield" element={<ChryslerServicingChesterfield />} />
          <Route path="/dodge-servicing-chesterfield" element={<DodgeServicingChesterfield />} />
          <Route path="/abarth-servicing-chesterfield" element={<AbarthServicingChesterfield />} />
          <Route path="/aston-martin-servicing-chesterfield" element={<AstonMartinServicingChesterfield />} />
          <Route path="/chevrolet-servicing-chesterfield" element={<ChevroletServicingChesterfield />} />
          <Route path="/cupra-servicing-chesterfield" element={<CupraServicingChesterfield />} />
          <Route path="/ferrari-servicing-chesterfield" element={<FerrariServicingChesterfield />} />
          <Route path="/fiat-servicing-chesterfield" element={<FiatServicingChesterfield />} />
          <Route path="/honda-servicing-chesterfield" element={<HondaServicingChesterfield />} />
          <Route path="/hyundai-servicing-chesterfield" element={<HyundaiServicingChesterfield />} />
          <Route path="/isuzu-servicing-chesterfield" element={<IsuzuServicingChesterfield />} />
          <Route path="/jaguar-servicing-chesterfield" element={<JaguarServicingChesterfield />} />
          <Route path="/jeep-servicing-chesterfield" element={<JeepServicingChesterfield />} />
          <Route path="/kia-servicing-chesterfield" element={<KiaServicingChesterfield />} />
          <Route path="/lamborghini-servicing-chesterfield" element={<LamborghiniServicingChesterfield />} />
          <Route path="/land-rover-servicing-chesterfield" element={<LandRoverServicingChesterfield />} />
          <Route path="/lexus-servicing-chesterfield" element={<LexusServicingChesterfield />} />
          <Route path="/lotus-servicing-chesterfield" element={<LotusServicingChesterfield />} />
          <Route path="/mazda-servicing-chesterfield" element={<MazdaServicingChesterfield />} />
          <Route path="/mitsubishi-servicing-chesterfield" element={<MitsubishiServicingChesterfield />} />
          <Route path="/mini-servicing-chesterfield" element={<MiniServicingChesterfield />} />
          <Route path="/peugeot-servicing-chesterfield" element={<PeugeotServicingChesterfield />} />
          <Route path="/porsche-servicing-chesterfield" element={<PorscheServicingChesterfield />} />
          <Route path="/renault-servicing-chesterfield" element={<RenaultServicingChesterfield />} />
        <Route path="/rolls-royce-servicing-chesterfield" element={<RollsRoyceServicingChesterfield />} />
        <Route path="/seat-servicing-chesterfield" element={<SeatServicingChesterfield />} />
        <Route path="/skoda-servicing-chesterfield" element={<SkodaServicingChesterfield />} />
        <Route path="/subaru-servicing-chesterfield" element={<SubaruServicingChesterfield />} />
        <Route path="/suzuki-servicing-chesterfield" element={<SuzukiServicingChesterfield />} />
        <Route path="/toyota-servicing-chesterfield" element={<ToyotaServicingChesterfield />} />
        <Route path="/vauxhall-servicing-chesterfield" element={<VauxhallServicingChesterfield />} />
        <Route path="/tvr-servicing-chesterfield" element={<TVRServicingChesterfield />} />
        <Route path="/westfield-servicing-chesterfield" element={<WestfieldServicingChesterfield />} />
        <Route path="/volvo-servicing-chesterfield" element={<VolvoServicingChesterfield />} />
        {/* Generic SEO Landing Pages */}
        <Route path="/mechanic-chesterfield" element={<MechanicChesterfield />} />
        <Route path="/oil-change-chesterfield" element={<OilChangeChesterfield />} />
        <Route path="/brake-repair-chesterfield" element={<BrakeRepairChesterfield />} />
        <Route path="/clutch-replacement-chesterfield" element={<ClutchReplacementChesterfield />} />
        <Route path="/exhaust-replacement-chesterfield" element={<ExhaustReplacementChesterfield />} />
        <Route path="/timing-chain-replacement-chesterfield" element={<TimingChainReplacementChesterfield />} />
        
        {/* New Landing Pages */}
        <Route path="/service-vs-mot-difference" element={<ServiceVsMotDifference />} />
        <Route path="/how-long-mot-takes" element={<HowLongMotTakes />} />
        <Route path="/how-long-service-takes" element={<HowLongServiceTakes />} />
        <Route path="/when-change-timing-belt" element={<WhenChangeTimingBelt />} />
        <Route path="/mot-retest" element={<MotRetest />} />
        <Route path="/mot-and-service" element={<MotAndService />} />
        <Route path="/brake-disc-lifespan" element={<BrakeDiscLifespan />} />
          <Route path="/when-mot-due" element={<WhenMotDue />} />
          <Route path="/mot-due-date-checker" element={<MotDueChecker />} />
          <Route path="/local-mot-garage" element={<LocalMotGarage />} />
          <Route path="/car-remap" element={<CarRemap />} />
          <Route path="/remapping-guide" element={<RemappingGuide />} />
          <Route path="/what-is-car-remapping" element={<WhatIsCarRemapping />} />
          <Route path="/car-garages-chesterfield" element={<CarGaragesChesterfield />} />
          
          {/* Sitemap route - must come before catch-all */}
          <Route path="/sitemap.xml" element={<SitemapXML />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

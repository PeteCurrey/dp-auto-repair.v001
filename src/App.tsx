import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Tuning from "./pages/Tuning";
import DPF from "./pages/DPF";
import GeneralRepairs from "./pages/GeneralRepairs";
import Diagnostics from "./pages/Diagnostics";
import RoutineServicing from "./pages/RoutineServicing";
import ElectricalServices from "./pages/ElectricalServices";
import PerformanceTuning from "./pages/PerformanceTuning";
import CollisionRepair from "./pages/CollisionRepair";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tuning" element={<Tuning />} />
          <Route path="/dpf" element={<DPF />} />
          <Route path="/general-repairs" element={<GeneralRepairs />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/routine-servicing" element={<RoutineServicing />} />
          <Route path="/electrical-services" element={<ElectricalServices />} />
          <Route path="/performance-tuning" element={<PerformanceTuning />} />
          <Route path="/collision-repair" element={<CollisionRepair />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

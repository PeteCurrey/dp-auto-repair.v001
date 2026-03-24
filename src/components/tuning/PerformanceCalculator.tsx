"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Car, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Wrench,
  MessageSquare,
  HelpCircle,
  Loader2,
  Mail,
  Smartphone,
  Check,
  Fuel,
  Info,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// --- Types & Config ---

type CtaScenario = 
  | "book_now" 
  | "confirm_quote" 
  | "manual_review" 
  | "custom_quote" 
  | "unsupported_contact";

const CTA_CONFIG: Record<CtaScenario, any> = {
  book_now: {
    primary: "Book Your ECU Remap",
    secondary: ["Get Exact Quote", "WhatsApp a Technician"],
    formTitle: "Want this confirmed for your exact vehicle?",
    formFields: ["email", "phone", "date"]
  },
  confirm_quote: {
    primary: "Request Technician-Confirmed Quote",
    secondary: ["Verify My Registration", "WhatsApp a Technician"],
    formTitle: "Send your reg and modifications for a precise recommendation",
    formFields: ["email", "phone", "mods"]
  },
  manual_review: {
    primary: "Request Manual Review",
    secondary: ["Speak to a Technician", "WhatsApp Vehicle Details"],
    formTitle: "Technician review required to confirm tuning options",
    formFields: ["email", "phone", "vehicle_details", "mods"]
  },
  custom_quote: {
    primary: "Request Custom Tuning Quote",
    secondary: ["Tell Us Your Setup", "Speak to a Technician"],
    formTitle: "Send your full modification list for a custom tuning estimate",
    formFields: ["email", "phone", "full_mods_list"]
  },
  unsupported_contact: {
    primary: "Contact Us to Check Options",
    secondary: ["Send Vehicle Details"],
    formTitle: "Manual review required for this vehicle",
    formFields: ["email", "phone", "message"]
  }
};

function resolveCtaScenario(result: any): CtaScenario {
  if (!result) return "unsupported_contact";
  const { supportStatus, lookup } = result;
  if (supportStatus.supportLevel === "unsupported") return "unsupported_contact";
  if (supportStatus.customTuningOnly) return "custom_quote";
  if (supportStatus.requiresManualReview || supportStatus.supportLevel === "manual_review") return "manual_review";
  if (supportStatus.supportLevel === "limited") return "manual_review";
  if (supportStatus.supportLevel === "standard" && lookup.matchConfidence === "high") return "book_now";
  return "confirm_quote";
}

// --- Components ---

export default function PerformanceCalculator() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("reg");
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [aiContent, setAiContent] = useState<any>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const { toast } = useToast();

  const handleRegSearch = async () => {
    if (!reg) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/lookup/vehicle?vrm=${encodeURIComponent(reg)}`);
      const data = await response.json();
      setResult(data);
      setStep(2);
    } catch (error) {
      console.error("Lookup failed:", error);
      toast({ title: "Lookup Failed", description: "Technical error during search.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoalSelect = async (g: string) => {
    setGoal(g);
    setIsConsulting(true);
    try {
      const resp = await fetch("/api/tuning/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle: result.vehicle, goal: g })
      });
      const data = await resp.json();
      setAiContent(data);
    } catch (error) {
      console.error("Consultation failed:", error);
    } finally {
      setIsConsulting(false);
    }
  };

  const currentScenario = resolveCtaScenario(result);
  const cfg = CTA_CONFIG[currentScenario];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const notes = formData.get("notes") as string || "";

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: `Calculator Lead: ${result.vehicle.make} (${currentScenario})`,
        email,
        phone,
        service_needed: "ECU Remapping",
        source_page: "Performance Calculator",
        vehicle_info: result.vehicle.vehicleLabel + (reg ? ` [Reg: ${reg}]` : ""),
        message: `Goal: ${goal}\nScenario: ${currentScenario}\nNotes: ${notes}\nAI Summary: ${aiContent?.summary || "N/A"}`
      });

      if (error) throw error;
      setLeadCaptured(true);
      toast({ title: "Enquiry Sent", description: "Our team will review your data and contact you." });
    } catch (error) {
      console.error("Lead submission failed:", error);
      toast({ title: "Submission Failed", variant: "destructive" });
    }
  };

  const reset = () => {
    setStep(1); setResult(null); setGoal(null); setReg("");
    setLeadCaptured(false); setAiContent(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 font-montserrat" id="performance-calculator">
      <div className="relative rounded-none border border-border bg-card text-card-foreground overflow-hidden shadow-2xl">
        {/* Step 1: Identification */}
        {step === 1 && (
          <div className="p-10 md:p-20 animate-fade-in text-center">
            <Badge variant="outline" className="bg-transparent text-muted-foreground border-border mb-6 py-1.5 px-4 text-xs font-light rounded-full">
              Performance Diagnostic Tool
            </Badge>
            <h2 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
              Discover Your <span className="text-primary font-normal">Gains</span>
            </h2>
            <p className="text-muted-foreground font-light max-w-xl mx-auto mb-12 text-lg leading-relaxed">
              Authorized DP Auto data engine providing real-time performance estimates and expert tuning advice.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative group mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <div className="bg-[#0052b4] text-white px-1.5 py-0.5 rounded-sm text-[10px] font-bold">GB</div>
                </div>
                <input
                  type="text"
                  placeholder="ENTER REG"
                  className="w-full bg-accent/50 border border-border rounded-lg py-6 pl-14 pr-4 uppercase text-2xl font-light focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                  value={reg}
                  onChange={(e) => setReg(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleRegSearch()}
                />
              </div>
              <Button 
                onClick={handleRegSearch}
                disabled={loading || !reg}
                className="w-full bg-primary text-white font-light py-8 rounded-lg text-lg transition-transform hover:bg-primary/90 hover:scale-[1.01]"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Zap className="mr-2 w-4 h-4" />}
                Calculate Performance
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Result State */}
        {step === 2 && result && (
          <div className="animate-fade-in flex flex-col lg:flex-row">
            {/* Left Column: Data & Insights */}
            <div className="flex-1 p-8 md:p-12 border-r border-white/5">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-light text-muted-foreground">
                      Match Confidence: <span className="text-foreground font-normal">{result.lookup.matchConfidence}</span>
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-light mb-2">
                    {result.vehicle.vehicleLabel}
                  </h3>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-border text-muted-foreground font-light text-xs rounded-full px-3">{result.vehicle.fuelType}</Badge>
                    <Badge variant="outline" className="border-border text-muted-foreground font-light text-xs rounded-full px-3">{result.vehicle.ecuType}</Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={reset} className="text-muted-foreground hover:text-foreground font-light">
                  Reset
                </Button>
              </div>

              {!goal ? (
                <div className="py-12 animate-fade-up">
                  <h4 className="text-2xl font-light mb-8 text-center text-foreground">What is your primary tuning goal?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["More Power", "Drivability", "Economy", "Towing", "Response"].map(g => (
                      <Button 
                        key={g}
                        variant="outline"
                        onClick={() => handleGoalSelect(g)}
                        className="py-8 bg-accent/30 border-border hover:border-primary hover:bg-accent/50 font-light rounded-lg text-sm transition-all"
                      >
                        {g}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-12 animate-fade-up">
                  {/* Results Display */}
                  {result.supportStatus.supportLevel === "standard" ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Stock Card */}
                      <div className="p-8 rounded-lg bg-accent/30 border border-border">
                        <p className="text-xs font-light text-muted-foreground mb-6">Original Output</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-light">{result.stockPerformance.powerHp}</span>
                          <span className="text-sm font-light text-muted-foreground">BHP</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-2xl font-light text-muted-foreground">{result.stockPerformance.torqueNm}</span>
                          <span className="text-xs font-light text-muted-foreground">NM</span>
                        </div>
                      </div>

                      {/* Tuned Card */}
                      <div className="p-8 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-xs font-light text-primary mb-6">Estimated {result.stages[activeStageIdx]?.stage} Gains</p>
                        <div className="flex items-baseline gap-2 text-foreground">
                          <span className="text-5xl font-light">
                            {result.stages[activeStageIdx]?.estimatedPowerRangeHp[0]}
                            <span className="text-primary/50 text-3xl mx-1 font-light">-</span>
                            {result.stages[activeStageIdx]?.estimatedPowerRangeHp[1]}
                          </span>
                          <span className="text-sm font-light text-primary">BHP</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2 text-primary">
                          <span className="text-3xl font-light">
                            {result.stages[activeStageIdx]?.estimatedTorqueRangeNm[0]}-{result.stages[activeStageIdx]?.estimatedTorqueRangeNm[1]}
                          </span>
                          <span className="text-xs font-light opacity-60">NM</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                      <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                      <h4 className="text-xl font-light mb-2 text-foreground">Technician Review Recommended</h4>
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                        We cannot provide an instant estimate for this specific vehicle model. Our team will review your data manually.
                      </p>
                    </div>
                  )}

                  {/* AI Content Layer */}
                  <div className="bg-accent/30 rounded-lg p-8 md:p-12 relative overflow-hidden group border border-border">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Wrench className="w-16 h-16 text-foreground" />
                    </div>
                    {isConsulting ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Analyzing vehicle data...</span>
                      </div>
                    ) : aiContent ? (
                      <div className="relative space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                          <Zap className="w-3 h-3" />
                          <span className="text-xs font-light text-primary">Technician AI Insights</span>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl font-light text-foreground">
                            "{aiContent.summary}"
                          </h4>
                          <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
                            {aiContent.drivingFeel} {aiContent.bestStageReason}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                          {aiContent.advisories?.map((adv: string, i: number) => (
                            <div key={i} className="flex gap-2">
                              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm font-light text-muted-foreground leading-tight">{adv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: CTA & Lead Form */}
            <div className="w-full lg:w-[450px] p-8 md:p-12 bg-accent/20 flex flex-col justify-between min-h-[700px] border-l border-border">
              {goal ? (
                <div className="animate-fade-in flex flex-col h-full">
                  <div className="mb-12">
                    <h5 className="text-2xl font-light mb-3 text-foreground">
                      {cfg.primary}
                    </h5>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">
                      {cfg.formTitle}
                    </p>

                    {!leadCaptured ? (
                      <form className="space-y-4" onSubmit={handleLeadSubmit}>
                        <div className="space-y-1.5">
                          <label className="text-xs font-light text-muted-foreground ml-1">Email Address</label>
                          <input name="email" required type="email" placeholder="name@email.com" className="w-full bg-accent/50 border border-border rounded-md py-3 px-4 text-sm font-light outline-none focus:border-primary transition-all text-foreground" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-light text-muted-foreground ml-1">Phone Number</label>
                          <input name="phone" required type="tel" placeholder="07123 456789" className="w-full bg-accent/50 border border-border rounded-md py-3 px-4 text-sm font-light outline-none focus:border-primary transition-all text-foreground" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-light text-muted-foreground ml-1">Additional Notes</label>
                          <textarea name="notes" placeholder="Current modifications, service history, etc." className="w-full bg-accent/50 border border-border rounded-md py-3 px-4 text-sm font-light outline-none focus:border-primary transition-all min-h-[100px] text-foreground" />
                        </div>
                        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 font-light py-6 rounded-md text-base mt-2 transition-colors">
                          Submit Enquiry
                        </Button>
                      </form>
                    ) : (
                      <div className="py-12 text-center space-y-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Check className="text-green-500 w-6 h-6" />
                        </div>
                        <p className="font-light text-lg text-foreground">Estimate Sent</p>
                        <p className="text-muted-foreground font-light text-sm px-8 leading-relaxed">Our technicians will review your request and call you within 24 hours.</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-8 border-t border-border">
                    <p className="text-xs font-light text-muted-foreground text-center mb-4">Direct Connect</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="border-border bg-accent/30 text-foreground py-5 rounded-md text-sm font-light hover:bg-accent/50 transition-all">
                        WhatsApp
                      </Button>
                      <Button variant="outline" className="border-border bg-accent/30 text-foreground py-5 rounded-md text-sm font-light hover:bg-accent/50 transition-all">
                        Call Us
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <Badge variant="outline" className="bg-accent/50 text-foreground mb-4">Consultation Panel</Badge>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    Analysis will unlock<br/>once goal is selected
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-8">
        {[
          { icon: Search, title: "Data-First", desc: "OEM-backed tuning rules" },
          { icon: ShieldCheck, title: "Warranty Safe", desc: "Engine safety limits retained" },
          { icon: Info, title: "Independent", desc: "Verified performance gains" },
          { icon: CheckCircle2, title: "15+ Years", desc: "Specialist technical experience" }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="p-3 rounded-full bg-accent/30 border border-border">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-light text-foreground">{item.title}</p>
              <p className="text-xs font-light text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

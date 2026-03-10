import { useMemo, useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Gauge, Zap, Search, Sparkles, Info, Fuel, Leaf, Download, Share2, TrendingUp, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { REMAP_DB } from "@/data/remap-db";
import { toast } from "sonner";

// Economy remap fuel saving estimates by engine type
const economySavings: Record<EnginePreset, { mpgGainPct: number; co2ReductionPct: number; annualSavingGbp: number }> = {
  petrol_turbo: { mpgGainPct: 10, co2ReductionPct: 8, annualSavingGbp: 220 },
  diesel_turbo: { mpgGainPct: 15, co2ReductionPct: 12, annualSavingGbp: 340 },
  petrol_na: { mpgGainPct: 5, co2ReductionPct: 4, annualSavingGbp: 110 },
};

const presets = {
  "petrol_turbo": { s1: { p: 0.2, t: 0.25 }, s2: { p: 0.3, t: 0.35 }, s3: { p: 0.35, t: 0.4 }, s4: { p: 0.38, t: 0.45 } },
  "diesel_turbo": { s1: { p: 0.25, t: 0.35 }, s2: { p: 0.3, t: 0.45 }, s3: { p: 0.35, t: 0.5 }, s4: { p: 0.38, t: 0.55 } },
  "petrol_na": { s1: { p: 0.08, t: 0.1 }, s2: { p: 0.1, t: 0.12 }, s3: { p: 0.12, t: 0.15 }, s4: { p: 0.12, t: 0.15 } },
} as const;

type EnginePreset = keyof typeof presets;

interface StageResult {
  stage: number;
  power: { final: number; gain: number };
  torque: { final: number; gain: number };
}

interface Gains {
  originalPower: number;
  originalTorque: number;
  stages: StageResult[];
  recommendedStage: number;
  vehicleLabel?: string;
  isAiPowered?: boolean;
  aiNotes?: string;
}

interface AiVehicleData {
  make: string;
  model: string;
  variant: string;
  engineType: EnginePreset;
  stockHp: number;
  stockNm: number;
  stage1Hp: number;
  stage1Nm: number;
  stage2Hp: number;
  stage2Nm: number;
  notes?: string;
}

function clamp(n: number, min = 0, max = 2000) {
  return Math.max(min, Math.min(max, n));
}

function computeGains(engine: EnginePreset, hp: number, nm: number): Gains {
  const s = presets[engine];
  const stages = [1, 2, 3, 4].map((stg) => {
    const key = `s${stg}` as keyof typeof s;
    const pGain = Math.round(hp * s[key].p);
    const tGain = Math.round(nm * s[key].t);
    return {
      stage: stg,
      power: { final: clamp(hp + pGain), gain: pGain },
      torque: { final: clamp(nm + tGain), gain: tGain },
    };
  });
  const recommendedStage = stages.reduce((acc, st) => (st.power.gain > 0 ? st.stage : acc), 1);
  return { originalPower: hp, originalTorque: nm, stages, recommendedStage };
}

function computeAiGains(data: AiVehicleData): Gains {
  const s1PowerGain = data.stage1Hp - data.stockHp;
  const s1TorqueGain = data.stage1Nm - data.stockNm;
  const s2PowerGain = data.stage2Hp - data.stockHp;
  const s2TorqueGain = data.stage2Nm - data.stockNm;
  const s3PowerGain = Math.round(s2PowerGain * 1.15);
  const s3TorqueGain = Math.round(s2TorqueGain * 1.12);
  const s4PowerGain = Math.round(s2PowerGain * 1.25);
  const s4TorqueGain = Math.round(s2TorqueGain * 1.2);

  const stages: StageResult[] = [
    { stage: 1, power: { final: data.stage1Hp, gain: s1PowerGain }, torque: { final: data.stage1Nm, gain: s1TorqueGain } },
    { stage: 2, power: { final: data.stage2Hp, gain: s2PowerGain }, torque: { final: data.stage2Nm, gain: s2TorqueGain } },
    { stage: 3, power: { final: data.stockHp + s3PowerGain, gain: s3PowerGain }, torque: { final: data.stockNm + s3TorqueGain, gain: s3TorqueGain } },
    { stage: 4, power: { final: data.stockHp + s4PowerGain, gain: s4PowerGain }, torque: { final: data.stockNm + s4TorqueGain, gain: s4TorqueGain } },
  ];

  return {
    originalPower: data.stockHp,
    originalTorque: data.stockNm,
    stages,
    recommendedStage: 1,
    vehicleLabel: `${data.make} ${data.model} ${data.variant}`,
    isAiPowered: true,
    aiNotes: data.notes,
  };
}

/* ── Animated circular gauge ── */
function CircularGauge({ value, max, label, unit, gain, color = "primary" }: {
  value: number; max: number; label: string; unit: string; gain?: number; color?: "primary" | "accent"
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference - pct * circumference;
  const colorClass = color === "primary" ? "text-primary" : "text-accent-foreground";
  const strokeClass = color === "primary" ? "stroke-primary" : "stroke-accent-foreground";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" className="stroke-secondary/30" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={radius} fill="none"
            className={`${strokeClass} transition-all duration-1000 ease-out`}
            strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl sm:text-2xl font-bold ${colorClass}`}>{value}</span>
          <span className="text-[10px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {gain !== undefined && gain > 0 && (
        <span className="text-xs font-semibold text-primary flex items-center gap-0.5">
          <TrendingUp className="w-3 h-3" /> +{gain} {unit}
        </span>
      )}
    </div>
  );
}

/* ── Animated progress bar ── */
function ProgressBar({ label, original, final: finalVal, unit, maxVal }: { label: string; original: number; final: number; unit: string; maxVal: number }) {
  const origPct = Math.min((original / maxVal) * 100, 100);
  const finalPct = Math.min((finalVal / maxVal) * 100, 100);
  const gain = finalVal - original;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{finalVal} {unit} <span className="text-primary font-semibold">(+{gain})</span></span>
      </div>
      <div className="relative h-3.5 w-full rounded-full bg-secondary/30 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/20 transition-all duration-700"
          style={{ width: `${origPct}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${finalPct}%`,
            background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))`
          }}
        />
        {/* Animated shine */}
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-30 transition-all duration-1000 ease-out"
          style={{
            width: `${finalPct}%`,
            background: `linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.4) 80%, transparent 100%)`
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Stock: {original} {unit}</span>
        <span>Remapped: {finalVal} {unit}</span>
      </div>
    </div>
  );
}

export default function PerformanceGainCalculator({ className }: { className?: string }) {
  const [engine, setEngine] = useState<EnginePreset>("petrol_turbo");
  const [hp, setHp] = useState<number>(150);
  const [nm, setNm] = useState<number>(250);
  const [mode, setMode] = useState<"vehicle" | "manual" | "ai">("vehicle");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [variant, setVariant] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [economyMode, setEconomyMode] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGains, setAiGains] = useState<Gains | null>(null);
  const [aiEngineType, setAiEngineType] = useState<EnginePreset>("diesel_turbo");
  const [showAllStages, setShowAllStages] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const makes = useMemo(() => Object.keys(REMAP_DB).sort(), []);
  const models = useMemo(() => (make ? (REMAP_DB[make]?.models ?? []).map((m) => m.name) : []), [make]);
  const variants = useMemo(() => {
    if (!make || !model) return [] as string[];
    const m = REMAP_DB[make]?.models.find((mm) => mm.name === model);
    return m ? m.variants.map((v) => v.name) : [];
  }, [make, model]);

  const localGains = useMemo(() => computeGains(engine, clamp(hp), clamp(nm)), [engine, hp, nm]);
  const gains = aiGains && mode === "ai" ? aiGains : localGains;
  const activeStage = selectedStage !== null ? gains.stages[selectedStage] : gains.stages[gains.recommendedStage - 1];

  const maxPower = Math.max(gains.originalPower, ...gains.stages.map(s => s.power.final)) * 1.15;
  const maxTorque = Math.max(gains.originalTorque, ...gains.stages.map(s => s.torque.final)) * 1.15;

  const activeEngineType = mode === "ai" ? aiEngineType : engine;
  const ecoData = economySavings[activeEngineType];

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiGains(null);
    setSelectedStage(null);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/remap-lookup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: aiQuery.trim() }),
        }
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "Failed to look up vehicle");
      }

      const data: AiVehicleData = await resp.json();
      setAiEngineType(data.engineType);
      const result = computeAiGains(data);
      setAiGains(result);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not look up vehicle data");
    } finally {
      setAiLoading(false);
    }
  };

  const vehicleLabel = useMemo(() => {
    if (gains.vehicleLabel) return gains.vehicleLabel;
    if (make && model && variant) return `${make} ${model} - ${variant}`;
    return null;
  }, [gains.vehicleLabel, make, model, variant]);

  const handleShare = useCallback(async () => {
    const text = `${vehicleLabel ? vehicleLabel + " — " : ""}Stage ${activeStage.stage} ECU Remap: ${activeStage.power.final}hp (+${activeStage.power.gain}hp) / ${activeStage.torque.final}Nm (+${activeStage.torque.gain}Nm) — DP Auto Repair, Chesterfield`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "ECU Remap Results", text, url: window.location.href });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Results copied to clipboard!");
    }
  }, [vehicleLabel, activeStage]);

  const handleExport = useCallback(() => {
    const lines = [
      "═══════════════════════════════════════",
      "   ECU REMAP PERFORMANCE ESTIMATE",
      "   DP Auto Repair & Diagnostics",
      "═══════════════════════════════════════",
      "",
      vehicleLabel ? `Vehicle: ${vehicleLabel}` : "",
      `Engine Type: ${activeEngineType.replace("_", " ").toUpperCase()}`,
      "",
      "── STOCK FIGURES ──",
      `Power:  ${gains.originalPower} hp`,
      `Torque: ${gains.originalTorque} Nm`,
      "",
      "── REMAP STAGES ──",
    ];

    const stagesToShow = gains.isAiPowered ? gains.stages.slice(0, 2) : gains.stages;
    stagesToShow.forEach(s => {
      const rec = s.stage === gains.recommendedStage ? " ★ RECOMMENDED" : "";
      lines.push(`Stage ${s.stage}${rec}:`);
      lines.push(`  Power:  ${s.power.final} hp (+${s.power.gain} hp)`);
      lines.push(`  Torque: ${s.torque.final} Nm (+${s.torque.gain} Nm)`);
      lines.push("");
    });

    if (economyMode) {
      lines.push("── ECONOMY REMAP ──");
      lines.push(`MPG Improvement: +${ecoData.mpgGainPct}%`);
      lines.push(`CO₂ Reduction:   -${ecoData.co2ReductionPct}%`);
      lines.push(`Est. Annual Saving: £${ecoData.annualSavingGbp}`);
      lines.push("");
    }

    lines.push("═══════════════════════════════════════");
    lines.push("Results are indicative. Dyno validation recommended.");
    lines.push("Book: dpautorepair.co.uk | (01246) 233483");
    lines.push("═══════════════════════════════════════");

    const blob = new Blob([lines.filter(Boolean).join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `remap-estimate${vehicleLabel ? "-" + vehicleLabel.replace(/\s+/g, "-").toLowerCase() : ""}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Results exported!");
  }, [gains, vehicleLabel, economyMode, ecoData, activeEngineType]);

  const displayedStages = gains.isAiPowered
    ? gains.stages.slice(0, 2)
    : showAllStages
      ? gains.stages
      : gains.stages.slice(0, 2);

  return (
    <section className={cn("py-10 md:py-16", className)} aria-labelledby="calc-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="shadow-card border-0 overflow-hidden" ref={resultsRef}>
          <CardHeader className="px-4 md:px-6 pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle id="calc-heading" className="text-xl md:text-2xl flex items-center gap-2">
                <Gauge className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Performance Gain Calculator
              </CardTitle>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" onClick={handleShare} className="text-xs gap-1 h-8">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
                <Button variant="ghost" size="sm" onClick={handleExport} className="text-xs gap-1 h-8">
                  <Download className="w-3.5 h-3.5" /> Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-6">
            {/* Left: Inputs */}
            <div className="space-y-4">
              <Tabs value={mode} onValueChange={(v) => { setMode(v as typeof mode); if (v !== "ai") setAiGains(null); setSelectedStage(null); }} className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full h-auto">
                  <TabsTrigger value="vehicle" className="text-xs sm:text-sm py-2">By Vehicle</TabsTrigger>
                  <TabsTrigger value="ai" className="flex items-center gap-1 text-xs sm:text-sm py-2">
                    <span>Search</span>
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="text-xs sm:text-sm py-2">Manual</TabsTrigger>
                </TabsList>

                {/* Vehicle tab */}
                <TabsContent value="vehicle" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make</Label>
                      <Select value={make} onValueChange={(v) => { setMake(v); setModel(""); setVariant(""); setSelectedStage(null); }}>
                        <SelectTrigger id="make"><SelectValue placeholder="Select make" /></SelectTrigger>
                        <SelectContent>{makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Select disabled={!make} value={model} onValueChange={(v) => { setModel(v); setVariant(""); }}>
                        <SelectTrigger id="model"><SelectValue placeholder={make ? "Select model" : "Select make first"} /></SelectTrigger>
                        <SelectContent>{models.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="variant">Engine/Variant</Label>
                      <Select disabled={!model} value={variant} onValueChange={(v) => {
                        setVariant(v);
                        setSelectedStage(null);
                        const mod = REMAP_DB[make]?.models.find((mm) => mm.name === model);
                        const vObj = mod?.variants.find((vv) => vv.name === v);
                        if (vObj) { setEngine(vObj.engineType as EnginePreset); setHp(vObj.hp); setNm(vObj.nm); }
                      }}>
                        <SelectTrigger id="variant"><SelectValue placeholder={model ? "Select variant" : "Select model first"} /></SelectTrigger>
                        <SelectContent>{variants.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* AI Search tab */}
                <TabsContent value="ai" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-search">Search any vehicle</Label>
                    <p className="text-xs text-muted-foreground">
                      Enter any make, model or engine — e.g. "BMW 320d F30" or "2018 Golf GTI"
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        id="ai-search"
                        placeholder="e.g. Audi S3 8V, Fiesta ST 2019..."
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleAiSearch(); }}
                        disabled={aiLoading}
                        className="min-w-0"
                      />
                      <Button onClick={handleAiSearch} disabled={aiLoading || !aiQuery.trim()} className="shrink-0 w-full sm:w-auto">
                        <Search className="w-4 h-4 mr-1" />
                        {aiLoading ? "Searching…" : "Search"}
                      </Button>
                    </div>
                  </div>

                  {aiLoading && (
                    <div className="space-y-3 p-4 rounded-lg bg-secondary/10">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4 animate-pulse text-primary" />
                        Looking up real-world tuning data…
                      </div>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  )}

                  {aiGains && !aiLoading && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Sparkles className="w-4 h-4 text-primary" />
                        {aiGains.vehicleLabel}
                      </div>
                      {aiGains.aiNotes && (
                        <p className="text-xs text-muted-foreground flex items-start gap-1">
                          <Info className="w-3 h-3 mt-0.5 shrink-0" />
                          {aiGains.aiNotes}
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground">
                        Figures based on known tuning data for this specific engine platform
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Manual tab */}
                <TabsContent value="manual" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="engine">Engine type</Label>
                      <Select value={engine} onValueChange={(v) => { setEngine(v as EnginePreset); setSelectedStage(null); }}>
                        <SelectTrigger id="engine"><SelectValue placeholder="Select engine" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol_turbo">Turbo Petrol</SelectItem>
                          <SelectItem value="diesel_turbo">Turbo Diesel</SelectItem>
                          <SelectItem value="petrol_na">Naturally Aspirated Petrol</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hp">Stock power (hp)</Label>
                      <Input id="hp" inputMode="numeric" value={hp} onChange={(e) => setHp(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nm">Stock torque (Nm)</Label>
                      <Input id="nm" inputMode="numeric" value={nm} onChange={(e) => setNm(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Stage selector pills */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Trophy className="w-4 h-4 text-primary" />
                  Select Tuning Stage
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(gains.isAiPowered ? gains.stages.slice(0, 2) : gains.stages).map((s) => {
                    const isSelected = (selectedStage !== null ? selectedStage : gains.recommendedStage - 1) === s.stage - 1;
                    return (
                      <button
                        key={s.stage}
                        onClick={() => setSelectedStage(s.stage - 1)}
                        className={cn(
                          "relative rounded-lg border p-2.5 sm:p-3 text-center transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30"
                            : "border-border hover:border-primary/40 hover:bg-primary/5"
                        )}
                      >
                        <div className="text-[10px] text-muted-foreground mb-0.5">Stage {s.stage}</div>
                        <div className={cn("text-sm font-bold", isSelected ? "text-primary" : "text-foreground")}>
                          +{s.power.gain} hp
                        </div>
                        <div className="text-[10px] text-muted-foreground">+{s.torque.gain} Nm</div>
                        {s.stage === gains.recommendedStage && (
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                            Recommended
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Economy remap toggle */}
              <div className="flex items-center justify-between rounded-md p-3 md:p-4 bg-accent/10 border border-accent/20 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Leaf className="w-4 h-4 text-accent-foreground shrink-0" />
                  <div className="min-w-0">
                    <Label htmlFor="eco-toggle" className="text-sm font-medium cursor-pointer">Economy Remap</Label>
                    <p className="text-xs text-muted-foreground hidden sm:block">Show estimated fuel savings</p>
                  </div>
                </div>
                <Switch id="eco-toggle" checked={economyMode} onCheckedChange={setEconomyMode} />
              </div>

              {economyMode && (
                <div className="rounded-md p-3 md:p-4 bg-accent/5 border border-accent/20 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Fuel className="w-4 h-4 text-primary" />
                    Estimated Fuel Savings
                  </div>
                  <div className="grid grid-cols-3 gap-2 md:gap-3 text-center">
                    <div className="rounded-lg bg-background p-2 md:p-3 border">
                      <div className="text-base md:text-lg font-bold text-primary">+{ecoData.mpgGainPct}%</div>
                      <div className="text-[9px] md:text-[10px] text-muted-foreground leading-tight">MPG Improvement</div>
                    </div>
                    <div className="rounded-lg bg-background p-2 md:p-3 border">
                      <div className="text-base md:text-lg font-bold text-primary">-{ecoData.co2ReductionPct}%</div>
                      <div className="text-[9px] md:text-[10px] text-muted-foreground leading-tight">CO₂ Reduction</div>
                    </div>
                    <div className="rounded-lg bg-background p-2 md:p-3 border">
                      <div className="text-base md:text-lg font-bold text-primary">£{ecoData.annualSavingGbp}</div>
                      <div className="text-[9px] md:text-[10px] text-muted-foreground leading-tight">Est. Annual Saving</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Economy remap optimises fuelling and shift points for efficiency. Savings based on 10,000 miles/year at average UK fuel prices.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="gradient-primary text-primary-foreground w-full sm:w-auto" asChild>
                  <Link to="/contact"><ArrowRight className="w-4 h-4 mr-2" />Get Remap Quote</Link>
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <Link to="/contact">Book Consultation</Link>
                </Button>
              </div>
            </div>

            {/* Right: Visual Results */}
            <div className="space-y-5 md:space-y-6">
              {/* Circular gauges for active stage */}
              <div className="rounded-xl border bg-gradient-to-br from-background to-secondary/10 p-4 md:p-6">
                {vehicleLabel && (
                  <p className="text-xs font-medium text-muted-foreground text-center mb-3">{vehicleLabel}</p>
                )}
                <div className="flex justify-center gap-6 sm:gap-10">
                  <CircularGauge
                    value={activeStage.power.final}
                    max={maxPower}
                    label="Power"
                    unit="hp"
                    gain={activeStage.power.gain}
                  />
                  <CircularGauge
                    value={activeStage.torque.final}
                    max={maxTorque}
                    label="Torque"
                    unit="Nm"
                    gain={activeStage.torque.gain}
                  />
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-muted-foreground">Stage {activeStage.stage}</span>
                  {activeStage.stage === gains.recommendedStage && (
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium ml-2">Recommended</span>
                  )}
                </div>
              </div>

              {/* Before / After comparison */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="rounded-lg border p-3 md:p-4 bg-secondary/5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Stock</div>
                  <div className="text-xl md:text-2xl font-bold">{gains.originalPower} <span className="text-sm font-normal text-muted-foreground">hp</span></div>
                  <div className="text-sm text-muted-foreground">{gains.originalTorque} Nm</div>
                </div>
                <div className="rounded-lg border border-primary/30 p-3 md:p-4 bg-primary/5">
                  <div className="text-[10px] uppercase tracking-wider text-primary mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Remapped
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-primary">{activeStage.power.final} <span className="text-sm font-normal text-primary/70">hp</span></div>
                  <div className="text-sm text-primary/80">{activeStage.torque.final} Nm</div>
                </div>
              </div>

              {/* Stage-by-stage progress bars */}
              <div className="space-y-5">
                {displayedStages.map((s) => (
                  <div key={s.stage} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">Stage {s.stage}</span>
                      {s.stage === gains.recommendedStage && (
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">Recommended</span>
                      )}
                    </div>
                    <ProgressBar label="Power" original={gains.originalPower} final={s.power.final} unit="hp" maxVal={maxPower} />
                    <ProgressBar label="Torque" original={gains.originalTorque} final={s.torque.final} unit="Nm" maxVal={maxTorque} />
                  </div>
                ))}
                
                {/* Show more/less stages toggle (non-AI only) */}
                {!gains.isAiPowered && gains.stages.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllStages(!showAllStages)}
                    className="w-full text-xs text-muted-foreground hover:text-foreground gap-1"
                  >
                    {showAllStages ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    {showAllStages ? "Show fewer stages" : `Show all ${gains.stages.length} stages`}
                  </Button>
                )}
              </div>

              {gains.isAiPowered && (
                <p className="text-xs text-muted-foreground flex items-start gap-1">
                  <Sparkles className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
                  AI-sourced figures based on real-world tuning data for this engine platform. Stage 1 = software only; Stage 2 = with supporting hardware.
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Results are indicative and depend on vehicle health, fuel quality, and supporting hardware. We retain OEM safety limits.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

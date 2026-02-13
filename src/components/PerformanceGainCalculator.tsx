import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Gauge, Zap, Search, Sparkles, Info, Fuel, Leaf } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { REMAP_DB } from "@/data/remap-db";
import { toast } from "sonner";

// Economy remap fuel saving estimates by engine type (percentage improvement)
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

  // Extrapolate stage 3 & 4 from the AI stage 2 data with modest increments
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

function ProgressBar({ label, original, final: finalVal, unit, maxVal }: { label: string; original: number; final: number; unit: string; maxVal: number }) {
  const origPct = Math.min((original / maxVal) * 100, 100);
  const finalPct = Math.min((finalVal / maxVal) * 100, 100);
  const gain = finalVal - original;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{finalVal} {unit} <span className="text-primary">(+{gain})</span></span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-secondary/40 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/30 transition-all duration-700"
          style={{ width: `${origPct}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-700"
          style={{ width: `${finalPct}%` }}
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

  // Economy remap toggle
  const [economyMode, setEconomyMode] = useState(false);

  // AI search state
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGains, setAiGains] = useState<Gains | null>(null);

  // Track the active engine type for economy calculations
  const [aiEngineType, setAiEngineType] = useState<EnginePreset>("diesel_turbo");

  const makes = useMemo(() => Object.keys(REMAP_DB).sort(), []);
  const models = useMemo(() => (make ? (REMAP_DB[make]?.models ?? []).map((m) => m.name) : []), [make]);
  const variants = useMemo(() => {
    if (!make || !model) return [] as string[];
    const m = REMAP_DB[make]?.models.find((mm) => mm.name === model);
    return m ? m.variants.map((v) => v.name) : [];
  }, [make, model]);

  const localGains = useMemo(() => computeGains(engine, clamp(hp), clamp(nm)), [engine, hp, nm]);
  const gains = aiGains && mode === "ai" ? aiGains : localGains;

  const maxPower = Math.max(gains.originalPower, ...gains.stages.map(s => s.power.final)) * 1.15;
  const maxTorque = Math.max(gains.originalTorque, ...gains.stages.map(s => s.torque.final)) * 1.15;

  const activeEngineType = mode === "ai" ? aiEngineType : engine;
  const ecoData = economySavings[activeEngineType];
  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiGains(null);

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

  return (
    <section className={cn("py-16", className)} aria-labelledby="calc-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle id="calc-heading" className="text-2xl flex items-center gap-2">
              <Gauge className="w-6 h-6 text-primary" />
              Performance Gain Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-4">
              <Tabs value={mode} onValueChange={(v) => { setMode(v as typeof mode); if (v !== "ai") setAiGains(null); }} className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="vehicle">By Vehicle</TabsTrigger>
                  <TabsTrigger value="ai" className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> AI Search
                  </TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>

                {/* Vehicle tab (unchanged logic) */}
                <TabsContent value="vehicle" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make</Label>
                      <Select value={make} onValueChange={(v) => { setMake(v); setModel(""); setVariant(""); }}>
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
                    <div className="flex gap-2">
                      <Input
                        id="ai-search"
                        placeholder="e.g. Audi S3 8V, Ford Fiesta ST 2019..."
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleAiSearch(); }}
                        disabled={aiLoading}
                      />
                      <Button onClick={handleAiSearch} disabled={aiLoading || !aiQuery.trim()} className="shrink-0">
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
                      <Select value={engine} onValueChange={(v) => setEngine(v as EnginePreset)}>
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

              {/* Recommended stage */}
              <div className="rounded-md p-4 bg-secondary/10">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="w-4 h-4 text-primary" />
                  Recommended stage
                </div>
                <p className="mt-1 text-2xl font-semibold">Stage {gains.recommendedStage}</p>
                <p className="text-muted-foreground text-sm">Estimates vary by vehicle condition and hardware. Dyno validation recommended.</p>
              </div>

              {/* Economy remap toggle */}
              <div className="flex items-center justify-between rounded-md p-4 bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-accent-foreground" />
                  <div>
                    <Label htmlFor="eco-toggle" className="text-sm font-medium cursor-pointer">Economy Remap</Label>
                    <p className="text-xs text-muted-foreground">Show estimated fuel savings</p>
                  </div>
                </div>
                <Switch id="eco-toggle" checked={economyMode} onCheckedChange={setEconomyMode} />
              </div>

              {economyMode && (
                <div className="rounded-md p-4 bg-accent/5 border border-accent/20 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Fuel className="w-4 h-4 text-primary" />
                    Estimated Fuel Savings
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-background p-3 border">
                      <div className="text-lg font-bold text-primary">+{ecoData.mpgGainPct}%</div>
                      <div className="text-[10px] text-muted-foreground">MPG Improvement</div>
                    </div>
                    <div className="rounded-lg bg-background p-3 border">
                      <div className="text-lg font-bold text-primary">-{ecoData.co2ReductionPct}%</div>
                      <div className="text-[10px] text-muted-foreground">CO₂ Reduction</div>
                    </div>
                    <div className="rounded-lg bg-background p-3 border">
                      <div className="text-lg font-bold text-primary">£{ecoData.annualSavingGbp}</div>
                      <div className="text-[10px] text-muted-foreground">Est. Annual Saving</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Economy remap optimises fuelling and shift points for efficiency. Savings based on 10,000 miles/year at average UK fuel prices. Actual results vary by driving style.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button className="gradient-primary text-primary-foreground" asChild>
                  <Link to="/contact"><ArrowRight className="w-4 h-4 mr-2" />Get Remap Quote</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Book Consultation</Link>
                </Button>
              </div>
            </div>

            {/* Right: Results with progress bars */}
            <div className="space-y-6">
              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Original</div>
                  <div className="mt-1 text-2xl font-semibold">{gains.originalPower} hp</div>
                  <div className="text-sm">{gains.originalTorque} Nm</div>
                </div>
                <div className="rounded-lg border p-4 border-primary/30 bg-primary/5">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" /> Best result
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-primary">
                    {gains.stages[gains.stages.length - 1].power.final} hp
                  </div>
                  <div className="text-sm">{gains.stages[gains.stages.length - 1].torque.final} Nm</div>
                </div>
              </div>

              {/* Stage-by-stage progress bars */}
              <div className="space-y-5">
                {gains.stages.slice(0, gains.isAiPowered ? 2 : 4).map((s) => (
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

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gauge, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { REMAP_DB } from "@/data/remap-db";
// Simple stage presets inspired by industry norms. Values are conservative estimates.
const presets = {
  "petrol_turbo": { s1: { p: 0.2, t: 0.25 }, s2: { p: 0.3, t: 0.35 }, s3: { p: 0.35, t: 0.4 }, s4: { p: 0.38, t: 0.45 } },
  "diesel_turbo": { s1: { p: 0.25, t: 0.35 }, s2: { p: 0.3, t: 0.45 }, s3: { p: 0.35, t: 0.5 }, s4: { p: 0.38, t: 0.55 } },
  "petrol_na": { s1: { p: 0.08, t: 0.1 }, s2: { p: 0.1, t: 0.12 }, s3: { p: 0.12, t: 0.15 }, s4: { p: 0.12, t: 0.15 } },
} as const;

type EnginePreset = keyof typeof presets;

type Gains = {
  originalPower: number;
  originalTorque: number;
  stages: Array<{
    stage: number;
    power: { final: number; gain: number };
    torque: { final: number; gain: number };
    formatted: { power: string; torque: string };
  }>;
  recommendedStage: number;
};

function clamp(n: number, min = 0, max = 2000) {
  return Math.max(min, Math.min(max, n));
}

function computeGains(engine: EnginePreset, hp: number, nm: number): Gains {
  const s = presets[engine];
  const stages = [1, 2, 3, 4].map((stg) => {
    const key = `s${stg}` as const;
    const pMul = s[key].p;
    const tMul = s[key].t;
    const pGain = Math.round(hp * pMul);
    const tGain = Math.round(nm * tMul);
    const pFinal = clamp(hp + pGain);
    const tFinal = clamp(nm + tGain);
    const powerStr = `POWER:${hp} ${pFinal}hp +${pGain}`;
    const torqueStr = `TORQUE:${nm} ${tFinal}nm +${tGain}`;
    return {
      stage: stg,
      power: { final: pFinal, gain: pGain },
      torque: { final: tFinal, gain: tGain },
      formatted: { power: powerStr, torque: torqueStr },
    };
  });
  // Recommend the highest stage that provides at least a small increase
  const recommendedStage = stages.reduce((acc, s) => (s.power.gain > 0 ? s.stage : acc), 1);
  return { originalPower: hp, originalTorque: nm, stages, recommendedStage };
}

export default function PerformanceGainCalculator({ className }: { className?: string }) {
  const [engine, setEngine] = useState<EnginePreset>("petrol_turbo");
  const [hp, setHp] = useState<number>(150);
  const [nm, setNm] = useState<number>(250);
  // Selection mode and cascading selections for vehicle-based lookup
  const [mode, setMode] = useState<"vehicle" | "manual">("vehicle");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [variant, setVariant] = useState<string>("");

  const makes = useMemo(() => Object.keys(REMAP_DB).sort(), []);
  const models = useMemo(() => (make ? (REMAP_DB[make]?.models ?? []).map((m) => m.name) : []), [make]);
  const variants = useMemo(() => {
    if (!make || !model) return [] as string[];
    const m = REMAP_DB[make]?.models.find((mm) => mm.name === model);
    return m ? m.variants.map((v) => v.name) : [];
  }, [make, model]);

  const gains = useMemo(() => computeGains(engine, clamp(hp), clamp(nm)), [engine, hp, nm]);

  return (
    <section className={cn("py-16", className)} aria-labelledby="calc-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle id="calc-heading" className="text-2xl">Performance Gain Calculator</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Tabs value={mode} onValueChange={(v) => setMode(v as "vehicle" | "manual")}
                className="space-y-4">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="vehicle">By vehicle</TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>

                <TabsContent value="vehicle" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make</Label>
                      <Select value={make} onValueChange={(v) => { setMake(v); setModel(""); setVariant(""); }}>
                        <SelectTrigger id="make" aria-label="Vehicle make">
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          {makes.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Select disabled={!make} value={model} onValueChange={(v) => { setModel(v); setVariant(""); }}>
                        <SelectTrigger id="model" aria-label="Vehicle model">
                          <SelectValue placeholder={make ? "Select model" : "Select make first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="variant">Engine/Variant</Label>
                      <Select disabled={!model} value={variant} onValueChange={(v) => {
                        setVariant(v);
                        const mod = REMAP_DB[make]?.models.find((mm) => mm.name === model);
                        const vObj = mod?.variants.find((vv) => vv.name === v);
                        if (vObj) {
                          setEngine(vObj.engineType as EnginePreset);
                          setHp(vObj.hp);
                          setNm(vObj.nm);
                        }
                      }}>
                        <SelectTrigger id="variant" aria-label="Engine or variant">
                          <SelectValue placeholder={model ? "Select variant" : "Select model first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {variants.map((v) => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="engine">Engine type</Label>
                      <Select value={engine} onValueChange={(v) => setEngine(v as EnginePreset)}>
                        <SelectTrigger id="engine" aria-label="Engine type">
                          <SelectValue placeholder="Select engine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol_turbo">Turbo Petrol</SelectItem>
                          <SelectItem value="diesel_turbo">Turbo Diesel</SelectItem>
                          <SelectItem value="petrol_na">Naturally Aspirated Petrol</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hp">Stock power (hp)</Label>
                      <Input
                        id="hp"
                        inputMode="numeric"
                        value={hp}
                        onChange={(e) => setHp(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                        aria-describedby="hp-help"
                      />
                      <span id="hp-help" className="sr-only">Enter stock horsepower</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nm">Stock torque (Nm)</Label>
                      <Input
                        id="nm"
                        inputMode="numeric"
                        value={nm}
                        onChange={(e) => setNm(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                        aria-describedby="nm-help"
                      />
                      <span id="nm-help" className="sr-only">Enter stock torque in Newton-metres</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="rounded-md p-4 bg-secondary/10">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="w-4 h-4 text-primary" />
                  Recommended stage
                </div>
                <p className="mt-1 text-2xl font-semibold">Stage {gains.recommendedStage}</p>
                <p className="text-muted-foreground text-sm">Estimates vary by vehicle condition and hardware. Dyno validation recommended.</p>
              </div>

              <div className="flex gap-3">
                <Button className="gradient-primary text-primary-foreground" asChild>
                  <a href="/contact" aria-label="Get a remap quote">
                    Get Remap Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact" aria-label="Book a consultation">Book Consultation</a>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Original</div>
                  <div className="mt-1 text-2xl font-semibold">{gains.originalPower} hp</div>
                  <div className="text-sm">{gains.originalTorque} Nm</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground flex items-center gap-2"><Gauge className="w-4 h-4 text-primary" /> Top result</div>
                  <div className="mt-1 text-2xl font-semibold">{gains.stages[gains.recommendedStage - 1].power.final} hp</div>
                  <div className="text-sm">{gains.stages[gains.recommendedStage - 1].torque.final} Nm</div>
                </div>
              </div>

              <div className="rounded-lg border overflow-x-auto">
                <div className="grid grid-cols-3 md:grid-cols-4 text-xs font-medium text-muted-foreground border-b min-w-[640px]">
                  <div className="px-3 py-2">Stage</div>
                  <div className="px-3 py-2">Power</div>
                  <div className="px-3 py-2">Torque</div>
                  <div className="px-3 py-2 hidden md:block">Strings</div>
                </div>
                {gains.stages.map((s) => (
                  <div key={s.stage} className="grid grid-cols-3 md:grid-cols-4 text-sm border-b last:border-b-0 min-w-[640px]">
                    <div className="px-3 py-2 font-medium">Stage {s.stage}</div>
                    <div className="px-3 py-2">
                      {s.power.final} hp <span className="text-muted-foreground">(+{s.power.gain})</span>
                    </div>
                    <div className="px-3 py-2">
                      {s.torque.final} Nm <span className="text-muted-foreground">(+{s.torque.gain})</span>
                    </div>
                    <div
                      className="px-3 py-2 hidden md:block text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap"
                      title={`${s.formatted.power} | ${s.formatted.torque}`}
                    >
                      {s.formatted.power} | {s.formatted.torque}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">Results are indicative and depend on vehicle health, fuel quality, and supporting hardware. We retain OEM safety limits.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

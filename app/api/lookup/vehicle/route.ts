import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const vrm = searchParams.get("vrm");

  if (!vrm) {
    return NextResponse.json({ error: "VRM is required" }, { status: 400 });
  }

  try {
    const { data: settings } = await supabase
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", "DVLA_API_KEY")
      .single();

    // Mocking real lookup for now with the requested structured schema
    const demoData = getStructuredDemoData(vrm);
    
    return NextResponse.json(demoData);

  } catch (error) {
    console.error("Vehicle lookup error:", error);
    return NextResponse.json({ error: "Failed to lookup vehicle" }, { status: 500 });
  }
}

function getStructuredDemoData(vrm: string) {
  const vrmUpper = vrm.toUpperCase();
  
  // Base structure
  const baseSchema = {
    lookup: {
      method: "registration",
      registration: vrmUpper,
      manualSelection: null,
      vehicleMatched: true,
      matchConfidence: "high",
      dataSource: "internal_tuning_dataset"
    },
    advisories: {
      general: [
        "Estimated figures vary by vehicle condition",
        "Fuel quality can affect final results",
        "Existing modifications may alter outcomes",
        "Insurance notification may be required after tuning"
      ],
      preTune: ["Diagnostics are recommended before tuning"],
      compliance: ["Road legality and emissions compliance depend on hardware setup and use case"]
    },
    leadState: {
      ctaScenario: "book_now",
      priority: "high_intent",
      captureMode: "inline_form",
      allowWhatsapp: true,
      allowCall: true,
      allowEmailResults: true
    }
  };

  if (vrmUpper === "BM68 BMW") {
    return {
      ...baseSchema,
      vehicle: {
        make: "BMW",
        model: "3 Series",
        variant: "2.0 Diesel 190hp",
        year: 2018,
        engineCode: "B47D20",
        engineSizeCc: 1995,
        fuelType: "Diesel",
        inductionType: "Turbo",
        transmission: "Automatic",
        drivetrain: "RWD",
        emissionsStandard: "Euro 6",
        ecuType: "Bosch EDC17",
        vehicleLabel: "BMW 320d 2.0 Diesel Auto 2018"
      },
      supportStatus: {
        isSupported: true,
        supportLevel: "standard",
        reason: null,
        requiresManualReview: false,
        customTuningOnly: false
      },
      stockPerformance: { powerHp: 190, torqueNm: 400 },
      stages: [
        {
          stage: "Stage 1",
          available: true,
          recommended: true,
          estimatedPowerRangeHp: [225, 230],
          estimatedTorqueRangeNm: [465, 475],
          gainPowerRangeHp: [35, 40],
          gainTorqueRangeNm: [65, 75],
          suitability: "Ideal for standard vehicles",
          hardwareRequired: [],
          hardwareOptional: [],
          notes: ["Typically suitable for a standard vehicle in good health"]
        },
        {
          stage: "Stage 2",
          available: true,
          recommended: false,
          estimatedPowerRangeHp: [235, 245],
          estimatedTorqueRangeNm: [480, 500],
          gainPowerRangeHp: [45, 55],
          gainTorqueRangeNm: [80, 100],
          suitability: "Best for modified vehicles",
          hardwareRequired: ["intake", "exhaust or supporting modifications"],
          hardwareOptional: [],
          notes: ["Requires supporting hardware before tuning"]
        }
      ]
    };
  }

  // Fallback for unknown reg
  return {
    ...baseSchema,
    lookup: { ...baseSchema.lookup, vehicleMatched: false, matchConfidence: "low" },
    vehicle: { make: "Unknown", model: "Unknown", variant: "Unknown", vehicleLabel: "Unknown Vehicle" },
    supportStatus: { isSupported: true, supportLevel: "manual_review", requiresManualReview: true },
    stockPerformance: { powerHp: 0, torqueNm: 0 },
    stages: []
  };
}

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const { vehicle, goal } = await request.json();

    if (!vehicle || !goal) {
      return NextResponse.json({ error: "Vehicle and goal are required" }, { status: 400 });
    }

    // 1. Fetch CLAUDE_API_KEY from admin_settings
    const { data: settings, error: settingsError } = await supabase
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", "CLAUDE_API_KEY")
      .single();

    if (settingsError || !settings?.setting_value) {
      return NextResponse.json({ 
        summary: `Focusing on ${goal} for your ${vehicle.make} ${vehicle.model} will involve precise ECU recalibration.`,
        drivingFeel: "Expect sharpened throttle response and a broader power band for a more responsive feel.",
        bestStageReason: "A Stage 1 remap is the most popular choice for this engine configuration to safely unlock potential.",
        advisories: ["98+ Octane fuel recommended", "Ensure vehicle is fully serviced"]
      });
    }

    // 2. Call Claude API
    const prompt = `
      You are an expert automotive tuning technician at DP Auto Repair. 
      A customer wants a performance estimate for their vehicle:
      Vehicle: ${vehicle.vehicleLabel}
      Specs: ${vehicle.powerHp}hp, ${vehicle.torqueNm}nm
      User's Tuning Goal: ${goal}

      Provide your expert analysis specifically filling the following JSON layers:
      {
        "summary": "Short 1-sentence estimate of power/torque lift.",
        "drivingFeel": "How the overtaking/response will feel for their Goal.",
        "bestStageReason": "Why Stage 1 or 2 is best for their current setup.",
        "advisories": ["Direct advice 1", "Direct advice 2"]
      }

      Keep the tone professional, authoritative, and helpful. No cartoonish or overly salesy language.
    `;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": settings.setting_value,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const content = data.content[0].text;
    
    // Parse JSON
    const jsonStr = content.includes("{") ? content.substring(content.indexOf("{"), content.lastIndexOf("}") + 1) : content;
    const aiContent = JSON.parse(jsonStr);

    return NextResponse.json(aiContent);

  } catch (error) {
    console.error("Claude tuning consult error:", error);
    // Fallback if AI fails
    return NextResponse.json({ 
      summary: "Noticeable lift in power and stronger mid-range torque.",
      drivingFeel: "Easier overtaking and sharper response.",
      bestStageReason: "Optimal for a standard daily driver.",
      modsNote: "No hardware modifications required for Stage 1.",
      advisories: ["Final gains depend on vehicle condition."],
      cta: "Contact us for a confirmed quote."
    });
  }
}

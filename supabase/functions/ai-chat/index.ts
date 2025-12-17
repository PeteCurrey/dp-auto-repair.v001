import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are DP Auto's friendly AI Service Advisor. You help customers with automotive questions, service recommendations, and booking assistance.

**About DP Automotive Repair & Diagnostics:**
- Location: Unit 5 Vanguard Trading Estate, Chesterfield, S40 2TZ
- Phone: (01246) 233483
- Hours: Monday-Friday 9AM-5PM, Closed Saturday & Sunday
- 15+ years experience, ASE-certified technicians
- 12-month warranty on parts and labour

**Services & Pricing (from):**
- MOT Test: £45
- Interim Service: £89
- Full Service: £149
- Major Service: £249
- Brake Pad Replacement: £79
- Brake Disc & Pad Replacement: £149
- Clutch Replacement: £350
- Timing Belt/Chain: £299
- Diagnostic Check: £49
- Air Con Regas: £59
- DPF Cleaning: £149
- ECU Remapping: £249
- Exhaust Fabrication: Quote on request
- Tyre Fitting: £15 per tyre

**Guidelines:**
- Be helpful, professional, and friendly
- When discussing prices, always say "from £X" as exact prices depend on vehicle
- If asked about booking, encourage them to use the Book Now button or call
- For complex questions, suggest they call or visit for a proper assessment
- Keep responses concise but informative
- If you don't know something specific, say so and suggest contacting the garage`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentPage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Add page context to system prompt
    let contextualPrompt = systemPrompt;
    if (currentPage) {
      contextualPrompt += `\n\n**Current Context:** The user is viewing the ${currentPage} page. Tailor your responses accordingly.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: contextualPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

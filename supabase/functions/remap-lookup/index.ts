import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "query is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are an automotive tuning data specialist. When given a vehicle description, return accurate real-world performance data including stock figures and realistic Stage 1 and Stage 2 remap gains.

Rules:
- Use known, published tuning data for the specific engine platform
- Be conservative with estimates — never overstate gains
- For naturally aspirated engines, gains are modest (5-12% power)
- For turbo petrol engines, Stage 1 typically gives 15-25% power gain
- For turbo diesel engines, Stage 1 typically gives 20-30% power gain
- Stage 2 assumes supporting hardware (intake, exhaust, intercooler)
- If you cannot identify the exact engine, use the closest known variant and note it
- engineType must be one of: petrol_turbo, diesel_turbo, petrol_na`,
            },
            {
              role: "user",
              content: `Provide performance and remap data for: ${query}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_vehicle_data",
                description:
                  "Return structured vehicle performance and remap data",
                parameters: {
                  type: "object",
                  properties: {
                    make: { type: "string", description: "Vehicle manufacturer" },
                    model: { type: "string", description: "Vehicle model and generation" },
                    variant: { type: "string", description: "Engine variant e.g. 2.0 TDI 150" },
                    engineType: {
                      type: "string",
                      enum: ["petrol_turbo", "diesel_turbo", "petrol_na"],
                      description: "Engine type classification",
                    },
                    stockHp: { type: "number", description: "Stock horsepower (bhp)" },
                    stockNm: { type: "number", description: "Stock torque (Nm)" },
                    stage1Hp: { type: "number", description: "Stage 1 remapped horsepower" },
                    stage1Nm: { type: "number", description: "Stage 1 remapped torque (Nm)" },
                    stage2Hp: { type: "number", description: "Stage 2 remapped horsepower" },
                    stage2Nm: { type: "number", description: "Stage 2 remapped torque (Nm)" },
                    notes: { type: "string", description: "Brief notes about the engine platform or tuning potential" },
                  },
                  required: [
                    "make", "model", "variant", "engineType",
                    "stockHp", "stockNm", "stage1Hp", "stage1Nm",
                    "stage2Hp", "stage2Nm",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "return_vehicle_data" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Failed to fetch vehicle data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      return new Response(
        JSON.stringify({ error: "Could not identify that vehicle. Try a more specific description." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const vehicleData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(vehicleData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("remap-lookup error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

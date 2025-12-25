import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SMSReminderRequest {
  customerPhone: string;
  customerName: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  bookingReference: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Try to get Twilio credentials from environment first, then from database
    let accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    let authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    let twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");

    // If not in environment, try to fetch from admin_settings table
    if (!accountSid || !authToken || !twilioPhone) {
      console.log("Twilio env vars not set, checking database...");
      
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { data: settings, error: settingsError } = await supabase
        .from("admin_settings")
        .select("setting_key, setting_value")
        .in("setting_key", ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_PHONE_NUMBER"]);

      if (settingsError) {
        console.error("Error fetching settings:", settingsError);
      } else if (settings) {
        settings.forEach((s: any) => {
          if (s.setting_key === "TWILIO_ACCOUNT_SID") accountSid = s.setting_value;
          if (s.setting_key === "TWILIO_AUTH_TOKEN") authToken = s.setting_value;
          if (s.setting_key === "TWILIO_PHONE_NUMBER") twilioPhone = s.setting_value;
        });
      }
    }

    if (!accountSid || !authToken || !twilioPhone) {
      console.error("Twilio credentials not configured");
      return new Response(
        JSON.stringify({ error: "SMS service not configured. Please add Twilio API keys in Settings > API Keys." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const {
      customerPhone,
      customerName,
      serviceType,
      appointmentDate,
      appointmentTime,
      bookingReference,
    }: SMSReminderRequest = await req.json();

    console.log(`Sending SMS reminder to ${customerPhone}`);

    const message = `Hi ${customerName}! Reminder: Your ${serviceType} appointment at DP Auto is on ${appointmentDate} at ${appointmentTime}. Ref: ${bookingReference}. Reply STOP to unsubscribe.`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const credentials = btoa(`${accountSid}:${authToken}`);

    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: customerPhone,
        From: twilioPhone,
        Body: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Twilio error:", data);
      return new Response(
        JSON.stringify({ error: data.message || "Failed to send SMS" }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("SMS sent successfully:", data.sid);

    return new Response(
      JSON.stringify({ success: true, messageSid: data.sid }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending SMS:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

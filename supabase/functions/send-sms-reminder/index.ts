import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!accountSid || !authToken || !twilioPhone) {
      console.error("Twilio credentials not configured");
      return new Response(
        JSON.stringify({ error: "SMS service not configured" }),
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

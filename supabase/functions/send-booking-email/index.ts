import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  customerName: string;
  customerEmail: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  bookingReference: string;
  vehicleInfo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const {
      customerName,
      customerEmail,
      serviceType,
      appointmentDate,
      appointmentTime,
      bookingReference,
      vehicleInfo,
    }: BookingEmailRequest = await req.json();

    console.log(`Sending booking confirmation email to ${customerEmail}`);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .details { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .reference { font-size: 24px; font-weight: bold; color: #e94560; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>Your appointment has been successfully booked. Here are your booking details:</p>
            
            <div class="details">
              <p class="reference">Reference: ${bookingReference}</p>
              <div class="detail-row">
                <span class="label">Service:</span> ${serviceType}
              </div>
              <div class="detail-row">
                <span class="label">Date:</span> ${appointmentDate}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${appointmentTime}
              </div>
              ${vehicleInfo ? `<div class="detail-row"><span class="label">Vehicle:</span> ${vehicleInfo}</div>` : ''}
            </div>
            
            <p>If you need to reschedule or cancel your appointment, please contact us.</p>
            <p>We look forward to seeing you!</p>
          </div>
          <div class="footer">
            <p>DP Auto - Professional Automotive Services</p>
            <p>Chesterfield, UK</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DP Auto <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Booking Confirmed - ${bookingReference}`,
        html: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);
      return new Response(
        JSON.stringify({ error: data.message || "Failed to send email" }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending booking email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MOTReminderRequest {
  sendAll?: boolean;
  vehicleId?: string;
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
        JSON.stringify({ error: "Email service not configured. Please add RESEND_API_KEY in API Keys settings." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { sendAll, vehicleId }: MOTReminderRequest = await req.json();

    // Get vehicles with MOT expiring within 4 weeks that haven't been reminded
    const fourWeeksFromNow = new Date();
    fourWeeksFromNow.setDate(fourWeeksFromNow.getDate() + 28);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let query = supabase
      .from('mot_reminders')
      .select('*')
      .gte('mot_expiry_date', today.toISOString().split('T')[0])
      .lte('mot_expiry_date', fourWeeksFromNow.toISOString().split('T')[0])
      .eq('reminder_sent', false)
      .not('client_email', 'is', null);

    if (vehicleId) {
      query = query.eq('id', vehicleId);
    }

    const { data: reminders, error: fetchError } = await query;

    if (fetchError) {
      console.error("Error fetching reminders:", fetchError);
      throw fetchError;
    }

    if (!reminders || reminders.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No pending MOT reminders to send", sent: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${reminders.length} MOT reminders to send`);

    let sentCount = 0;
    const errors: string[] = [];

    for (const reminder of reminders) {
      if (!reminder.client_email) continue;

      const expiryDate = new Date(reminder.mot_expiry_date);
      const formattedDate = expiryDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      try {
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🚗 MOT Reminder</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
              <p style="font-size: 16px;">Hello,</p>
              
              <p style="font-size: 16px;">This is a friendly reminder that your vehicle's MOT is due to expire soon:</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <p style="margin: 5px 0;"><strong>Vehicle:</strong> ${reminder.make || ''} ${reminder.model || ''} ${reminder.year ? `(${reminder.year})` : ''}</p>
                <p style="margin: 5px 0;"><strong>Registration:</strong> ${reminder.registration}</p>
                <p style="margin: 5px 0;"><strong>MOT Expiry Date:</strong> ${formattedDate}</p>
                <p style="margin: 5px 0; color: ${daysUntilExpiry <= 7 ? '#dc2626' : '#f59e0b'};"><strong>Days Remaining:</strong> ${daysUntilExpiry} days</p>
              </div>
              
              <p style="font-size: 16px;">Don't let your MOT expire! Book your MOT test with us today to ensure you stay legal on the road.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://dpautorepair.co.uk/book" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Book Your MOT Now</a>
              </div>
              
              <p style="font-size: 14px; color: #666;">Why choose DP Auto Repair?</p>
              <ul style="font-size: 14px; color: #666;">
                <li>✅ Competitive prices</li>
                <li>✅ Quick turnaround times</li>
                <li>✅ Expert technicians</li>
                <li>✅ Free retest if required</li>
              </ul>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="font-size: 14px; color: #666; text-align: center;">
                <strong>DP Auto Repair</strong><br>
                Chesterfield, Derbyshire<br>
                <a href="https://dpautorepair.co.uk" style="color: #1e3a5f;">www.dpautorepair.co.uk</a>
              </p>
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
            from: "DP Auto Repair <reminders@dpautorepair.co.uk>",
            to: [reminder.client_email],
            subject: `MOT Reminder: Your ${reminder.make || 'vehicle'} ${reminder.registration} expires soon`,
            html: htmlContent,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(`Resend error for ${reminder.client_email}:`, data);
          errors.push(`${reminder.registration}: ${data.message || 'Failed to send'}`);
          continue;
        }

        console.log(`MOT reminder sent to ${reminder.client_email}:`, data);

        // Update the reminder as sent
        const { error: updateError } = await supabase
          .from('reminders')
          .upsert({
            vehicle_id: reminder.id,
            reminder_type: 'mot',
            reminder_date: today.toISOString().split('T')[0],
            is_sent: true,
            message: `MOT reminder sent for ${reminder.registration}`
          }, {
            onConflict: 'vehicle_id,reminder_type'
          });

        if (updateError) {
          console.error(`Error updating reminder status for ${reminder.registration}:`, updateError);
        }

        sentCount++;
      } catch (emailError: any) {
        console.error(`Error sending email to ${reminder.client_email}:`, emailError);
        errors.push(`${reminder.registration}: ${emailError.message}`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Sent ${sentCount} MOT reminder${sentCount !== 1 ? 's' : ''}`,
        sent: sentCount,
        total: reminders.length,
        errors: errors.length > 0 ? errors : undefined
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-mot-reminder:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

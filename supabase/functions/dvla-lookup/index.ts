import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const dvlaApiKey = Deno.env.get('DVLA_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DVLAVehicleResponse {
  registrationNumber: string;
  make: string;
  model: string;
  yearOfManufacture: number;
  fuelType: string;
  engineCapacity: number;
  colour: string;
  typeApproval: string;
  co2Emissions: number;
  motStatus: string;
  motExpiryDate: string;
  taxStatus: string;
  taxDueDate: string;
}

interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  fuelType: string;
  engineCapacity: number;
  colour: string;
  motStatus: 'valid' | 'due_soon' | 'expired';
  motExpiryDate: string;
  taxStatus: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!dvlaApiKey) {
    console.error('DVLA_API_KEY not found in environment variables');
    return new Response(
      JSON.stringify({ error: 'DVLA API key not configured' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    const { registrationNumber } = await req.json();
    
    if (!registrationNumber) {
      return new Response(
        JSON.stringify({ error: 'Registration number is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Looking up vehicle: ${registrationNumber}`);

    const dvlaResponse = await fetch('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', {
      method: 'POST',
      headers: {
        'x-api-key': dvlaApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationNumber: registrationNumber.toUpperCase().replace(/\s+/g, '')
      }),
    });

    if (!dvlaResponse.ok) {
      console.error(`DVLA API error: ${dvlaResponse.status} ${dvlaResponse.statusText}`);
      
      if (dvlaResponse.status === 404) {
        return new Response(
          JSON.stringify({ 
            error: 'Vehicle not found in DVLA database. Please check the registration number and try different formatting (e.g., AB12 CDE or AB12CDE).',
            errorType: 'VEHICLE_NOT_FOUND',
            statusCode: 404
          }), 
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (dvlaResponse.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'DVLA service rate limit exceeded. Please try again in a few moments.',
            errorType: 'RATE_LIMITED',
            statusCode: 429
          }), 
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (dvlaResponse.status === 403) {
        return new Response(
          JSON.stringify({ 
            error: 'DVLA service access denied. Please contact support.',
            errorType: 'ACCESS_DENIED',
            statusCode: 403
          }), 
          { 
            status: 403, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          error: 'DVLA service temporarily unavailable. Please try again later.',
          errorType: 'SERVICE_ERROR',
          statusCode: dvlaResponse.status
        }), 
        { 
          status: dvlaResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const dvlaData: DVLAVehicleResponse = await dvlaResponse.json();
    console.log('DVLA API response:', dvlaData);

    // Determine MOT status based on expiry date
    const motStatus = (() => {
      if (!dvlaData.motExpiryDate) return 'expired';
      
      const expiryDate = new Date(dvlaData.motExpiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry < 0) return 'expired';
      if (daysUntilExpiry <= 30) return 'due_soon';
      return 'valid';
    })();

    // Map DVLA response to our VehicleInfo interface
    const vehicleInfo: VehicleInfo = {
      make: dvlaData.make,
      model: dvlaData.model,
      year: dvlaData.yearOfManufacture,
      fuelType: dvlaData.fuelType,
      engineCapacity: dvlaData.engineCapacity,
      colour: dvlaData.colour,
      motStatus,
      motExpiryDate: dvlaData.motExpiryDate,
      taxStatus: dvlaData.taxStatus
    };

    return new Response(JSON.stringify(vehicleInfo), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in dvla-lookup function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
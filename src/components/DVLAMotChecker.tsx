import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Car, Calendar, Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface VehicleData {
  registration: string;
  make: string;
  model: string;
  year: number;
  motExpiryDate: string;
  motStatus: 'valid' | 'expired' | 'due_soon';
  colour: string;
  fuelType: string;
  engineCapacity: number;
  taxStatus: string;
}

const DVLAMotChecker = () => {
  const [registration, setRegistration] = useState('');
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Real DVLA API lookup via our edge function
  const dvlaLookup = async (reg: string): Promise<VehicleData | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('dvla-lookup', {
        body: { registrationNumber: reg }
      });

      if (error) {
        console.error('DVLA lookup error:', error);
        throw new Error(error.message || 'Failed to lookup vehicle');
      }

      if (data) {
        return {
          registration: reg.toUpperCase().replace(/\s+/g, ''),
          make: data.make,
          model: data.model,
          year: data.year,
          fuelType: data.fuelType,
          engineCapacity: data.engineCapacity,
          colour: data.colour,
          motExpiryDate: data.motExpiryDate,
          motStatus: data.motStatus,
          taxStatus: data.taxStatus
        };
      }

      return null;
    } catch (error) {
      throw error;
    }
  };

  const handleSearch = async () => {
    if (!registration.trim()) {
      setError('Please enter a vehicle registration');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await dvlaLookup(registration);
      if (data) {
        setVehicleData(data);
      } else {
        setError('Vehicle not found in DVLA database.');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to retrieve vehicle information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMotStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800 border-green-200';
      case 'due_soon': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMotStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <Shield className="w-4 h-4" />;
      case 'due_soon': return <Calendar className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">MOT Due Date Checker</h3>
              <p className="text-muted-foreground">Enter your vehicle registration to check MOT status</p>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Input
              type="text"
              placeholder="Enter registration (e.g. AB12 CDE)"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="gradient-primary"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {loading ? 'Checking...' : 'Check MOT'}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {vehicleData && (
            <div className="border rounded-lg p-6 bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Vehicle Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registration:</span>
                      <span className="font-medium text-foreground">{vehicleData.registration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Make:</span>
                      <span className="font-medium text-foreground">{vehicleData.make}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span className="font-medium text-foreground">{vehicleData.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year:</span>
                      <span className="font-medium text-foreground">{vehicleData.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Colour:</span>
                      <span className="font-medium text-foreground">{vehicleData.colour}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Type:</span>
                      <span className="font-medium text-foreground">{vehicleData.fuelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engine:</span>
                      <span className="font-medium text-foreground">{vehicleData.engineCapacity}cc</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Status:</span>
                      <span className="font-medium text-foreground">{vehicleData.taxStatus}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">MOT Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getMotStatusColor(vehicleData.motStatus)}>
                        {getMotStatusIcon(vehicleData.motStatus)}
                        {vehicleData.motStatus === 'valid' && 'MOT Valid'}
                        {vehicleData.motStatus === 'due_soon' && 'Due Soon'}
                        {vehicleData.motStatus === 'expired' && 'Expired'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">MOT Expiry Date</p>
                      <p className="font-semibold text-foreground">{formatDate(vehicleData.motExpiryDate)}</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h5 className="font-medium text-foreground mb-2">Book Your MOT</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Book your MOT test with DP Auto Repair for reliable service and competitive prices.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="gradient-primary">
                        Book MOT
                      </Button>
                      <Button size="sm" variant="outline">
                        Call Us
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This tool provides estimated information. For official MOT status, 
              please check the <a href="https://www.gov.uk/check-mot-history" target="_blank" rel="noopener noreferrer" 
              className="text-primary hover:underline">government MOT history service</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DVLAMotChecker;
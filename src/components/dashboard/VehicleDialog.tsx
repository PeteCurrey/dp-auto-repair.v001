import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Search } from 'lucide-react';

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVehicleCreated: (vehicleId: string) => void;
  clientId?: string;
}

interface VehicleFormData {
  make: string;
  model: string;
  year: string;
  registration: string;
  vin: string;
  mileage: string;
  fuel_type: string;
  mot_expiry: string;
  service_due_date: string;
  service_due_mileage: string;
  colour: string;
  engine_capacity: string;
}

interface DVLAVehicleInfo {
  make: string;
  model: string;
  year: number;
  fuelType: string;
  engineCapacity: number;
  colour: string;
  motStatus: string;
  motExpiryDate: string;
  taxStatus: string;
}

const VehicleDialog = ({ open, onOpenChange, onVehicleCreated, clientId }: VehicleDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [formData, setFormData] = useState<VehicleFormData>({
    make: '',
    model: '',
    year: '',
    registration: '',
    vin: '',
    mileage: '',
    fuel_type: '',
    mot_expiry: '',
    service_due_date: '',
    service_due_mileage: '',
    colour: '',
    engine_capacity: ''
  });

  const handleInputChange = (field: keyof VehicleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDVLALookup = async () => {
    if (!formData.registration.trim()) {
      toast.error("Please enter a registration number");
      return;
    }

    setLookupLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('dvla-lookup', {
        body: { registrationNumber: formData.registration }
      });

      if (error) throw error;

      const vehicleInfo: DVLAVehicleInfo = data;
      
      // Auto-populate form with DVLA data
      setFormData(prev => ({
        ...prev,
        make: vehicleInfo.make || prev.make,
        model: vehicleInfo.model || prev.model,
        year: vehicleInfo.year?.toString() || prev.year,
        fuel_type: vehicleInfo.fuelType?.toLowerCase() || prev.fuel_type,
        colour: vehicleInfo.colour || prev.colour,
        engine_capacity: vehicleInfo.engineCapacity?.toString() || prev.engine_capacity,
        mot_expiry: vehicleInfo.motExpiryDate || prev.mot_expiry
      }));

      toast.success("Vehicle information populated from DVLA");
    } catch (error: any) {
      console.error('DVLA lookup error:', error);
      toast.error("Could not fetch vehicle data from DVLA. Please enter details manually.");
    } finally {
      setLookupLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.make.trim() || !formData.model.trim() || !formData.year.trim() || !formData.registration.trim()) {
      toast.error("Make, model, year, and registration are required");
      return;
    }

    setLoading(true);

    try {
      const vehicleData = {
        owner_id: clientId, // This will link to the client's profile ID if provided
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        registration: formData.registration.toUpperCase(),
        vin: formData.vin || null,
        mileage: formData.mileage ? parseInt(formData.mileage) : null,
        fuel_type: formData.fuel_type || null,
        mot_expiry: formData.mot_expiry || null,
        service_due_date: formData.service_due_date || null,
        service_due_mileage: formData.service_due_mileage ? parseInt(formData.service_due_mileage) : null
      };

      const { data, error } = await supabase
        .from('vehicles')
        .insert(vehicleData)
        .select()
        .single();

      if (error) throw error;

      toast.success("Vehicle created successfully");
      onVehicleCreated(data.id);
      onOpenChange(false);
      
      // Reset form
      setFormData({
        make: '', model: '', year: '', registration: '', vin: '', mileage: '',
        fuel_type: '', mot_expiry: '', service_due_date: '', service_due_mileage: '',
        colour: '', engine_capacity: ''
      });
    } catch (error: any) {
      console.error('Error creating vehicle:', error);
      toast.error("Failed to create vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Create a new vehicle record. You can use the registration lookup to auto-populate details.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Registration Lookup Section */}
          <div className="space-y-2">
            <Label htmlFor="registration">Registration Number *</Label>
            <div className="flex gap-2">
              <Input
                id="registration"
                value={formData.registration}
                onChange={(e) => handleInputChange('registration', e.target.value)}
                placeholder="AB12 CDE"
                className="flex-1"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleDVLALookup}
                disabled={lookupLoading || !formData.registration.trim()}
              >
                {lookupLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Lookup
              </Button>
            </div>
          </div>

          {/* Basic Vehicle Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make *</Label>
              <Input
                id="make"
                value={formData.make}
                onChange={(e) => handleInputChange('make', e.target.value)}
                placeholder="Toyota"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="Corolla"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="2020"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colour">Colour</Label>
              <Input
                id="colour"
                value={formData.colour}
                onChange={(e) => handleInputChange('colour', e.target.value)}
                placeholder="Silver"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="engine_capacity">Engine (cc)</Label>
              <Input
                id="engine_capacity"
                type="number"
                value={formData.engine_capacity}
                onChange={(e) => handleInputChange('engine_capacity', e.target.value)}
                placeholder="1600"
              />
            </div>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuel_type">Fuel Type</Label>
              <Select value={formData.fuel_type} onValueChange={(value) => handleInputChange('fuel_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">VIN</Label>
              <Input
                id="vin"
                value={formData.vin}
                onChange={(e) => handleInputChange('vin', e.target.value)}
                placeholder="Vehicle Identification Number"
              />
            </div>
          </div>

          {/* Service Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mileage">Current Mileage</Label>
              <Input
                id="mileage"
                type="number"
                min="0"
                value={formData.mileage}
                onChange={(e) => handleInputChange('mileage', e.target.value)}
                placeholder="50000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mot_expiry">MOT Expiry</Label>
              <Input
                id="mot_expiry"
                type="date"
                value={formData.mot_expiry}
                onChange={(e) => handleInputChange('mot_expiry', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service_due_date">Next Service Due</Label>
              <Input
                id="service_due_date"
                type="date"
                value={formData.service_due_date}
                onChange={(e) => handleInputChange('service_due_date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service_due_mileage">Service Due Mileage</Label>
              <Input
                id="service_due_mileage"
                type="number"
                min="0"
                value={formData.service_due_mileage}
                onChange={(e) => handleInputChange('service_due_mileage', e.target.value)}
                placeholder="60000"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Vehicle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;
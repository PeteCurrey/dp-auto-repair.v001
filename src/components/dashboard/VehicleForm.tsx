import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface VehicleFormProps {
  profileId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const VehicleForm = ({ profileId, onClose, onSuccess }: VehicleFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    registration: '',
    vin: '',
    mileage: '',
    fuel_type: '',
    mot_expiry: '',
    service_due_date: '',
    service_due_mileage: ''
  });
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const vehicleData = {
        owner_id: profileId,
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

      const { error } = await supabase
        .from('vehicles')
        .insert(vehicleData);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Vehicle added successfully!"
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error adding vehicle:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add vehicle. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Add a vehicle to your account to track services and appointments.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make *</Label>
              <Input
                id="make"
                name="make"
                placeholder="Toyota"
                value={formData.make}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                name="model"
                placeholder="Corolla"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                placeholder="2020"
                value={formData.year}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration">Registration *</Label>
              <Input
                id="registration"
                name="registration"
                placeholder="AB12 CDE"
                value={formData.registration}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vin">VIN (Optional)</Label>
            <Input
              id="vin"
              name="vin"
              placeholder="Vehicle Identification Number"
              value={formData.vin}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mileage">Current Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                min="0"
                placeholder="50000"
                value={formData.mileage}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fuel_type">Fuel Type</Label>
              <Select value={formData.fuel_type} onValueChange={(value) => handleSelectChange(value, 'fuel_type')}>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mot_expiry">MOT Expiry</Label>
              <Input
                id="mot_expiry"
                name="mot_expiry"
                type="date"
                value={formData.mot_expiry}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service_due_date">Next Service Due</Label>
              <Input
                id="service_due_date"
                name="service_due_date"
                type="date"
                value={formData.service_due_date}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_due_mileage">Service Due Mileage</Label>
            <Input
              id="service_due_mileage"
              name="service_due_mileage"
              type="number"
              min="0"
              placeholder="60000"
              value={formData.service_due_mileage}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Vehicle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleForm;
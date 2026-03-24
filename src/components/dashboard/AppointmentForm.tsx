"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquare, Lightbulb, TrendingUp } from 'lucide-react';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface Technician {
  id: string;
  full_name: string | null;
  email: string;
  appointmentCount?: number;
  totalMinutes?: number;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  registration: string;
}

interface AppointmentFormProps {
  profileId: string;
  vehicles: Vehicle[];
  onClose: () => void;
  onSuccess: () => void;
}

const serviceTypes = [
  'Full Service',
  'Basic Service',
  'MOT Test',
  'Brake Service',
  'Oil Change',
  'Tyre Replacement',
  'Diagnostics',
  'Air Conditioning Service',
  'Clutch Replacement',
  'Suspension Repair',
  'Electrical Repair',
  'General Repair',
  'Performance Tuning',
  'Other'
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30'
];

const AppointmentForm = ({ profileId, vehicles, onClose, onSuccess }: AppointmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [sendSmsReminder, setSendSmsReminder] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_id: '',
    service_type: '',
    appointment_date: '',
    appointment_time: '',
    duration_minutes: '60',
    notes: '',
    estimated_cost: '',
    technician_id: '',
    customer_phone: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    fetchTechniciansWithWorkload();
  }, [formData.appointment_date]);

  const fetchTechniciansWithWorkload = async () => {
    // Fetch technicians
    const { data: techData, error: techError } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .in('user_type', ['employee', 'admin']);
    
    if (techError || !techData) {
      console.error('Error fetching technicians:', techError);
      return;
    }

    // If we have a date selected, fetch workload for that week
    if (formData.appointment_date) {
      const selectedDate = new Date(formData.appointment_date);
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });

      const { data: appointments, error: apptError } = await supabase
        .from('appointments')
        .select('technician_id, duration_minutes')
        .gte('appointment_date', format(weekStart, 'yyyy-MM-dd'))
        .lte('appointment_date', format(weekEnd, 'yyyy-MM-dd'))
        .not('status', 'in', '("cancelled","completed")');

      if (!apptError && appointments) {
        const workloadMap = new Map<string, { count: number; minutes: number }>();
        
        appointments.forEach(apt => {
          if (apt.technician_id) {
            const current = workloadMap.get(apt.technician_id) || { count: 0, minutes: 0 };
            workloadMap.set(apt.technician_id, {
              count: current.count + 1,
              minutes: current.minutes + (apt.duration_minutes || 60)
            });
          }
        });

        const techniciansWithWorkload = techData.map(tech => ({
          ...tech,
          appointmentCount: workloadMap.get(tech.id)?.count || 0,
          totalMinutes: workloadMap.get(tech.id)?.minutes || 0
        }));

        setTechnicians(techniciansWithWorkload);
        return;
      }
    }

    setTechnicians(techData.map(tech => ({ ...tech, appointmentCount: 0, totalMinutes: 0 })));
  };

  // Calculate suggested technician (least busy)
  const suggestedTechnician = useMemo(() => {
    if (technicians.length === 0) return null;
    return technicians.reduce((least, tech) => {
      if (!least) return tech;
      return (tech.totalMinutes || 0) < (least.totalMinutes || 0) ? tech : least;
    }, technicians[0]);
  }, [technicians]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const checkAppointmentConflict = async (date: string, time: string, duration: number) => {
    const { data, error } = await supabase
      .rpc('check_appointment_conflict', {
        p_date: date,
        p_time: time,
        p_duration: duration
      });

    if (error) {
      console.error('Error checking conflicts:', error);
      return false;
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for appointment conflicts
      const isAvailable = await checkAppointmentConflict(
        formData.appointment_date,
        formData.appointment_time,
        parseInt(formData.duration_minutes)
      );

      if (!isAvailable) {
        toast({
          title: "Time Slot Unavailable",
          description: "This time slot is already booked. Please choose a different time.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      const appointmentData = {
        client_id: profileId,
        vehicle_id: formData.vehicle_id || null,
        service_type: formData.service_type,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        duration_minutes: parseInt(formData.duration_minutes),
        notes: formData.notes || null,
        estimated_cost: formData.estimated_cost ? parseFloat(formData.estimated_cost) : null,
        technician_id: formData.technician_id || null,
        customer_phone: formData.customer_phone || null,
        status: 'scheduled'
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select('booking_reference')
        .single();

      if (error) {
        throw error;
      }

      // Send SMS reminder if enabled and phone number provided
      if (sendSmsReminder && formData.customer_phone) {
        try {
          await supabase.functions.invoke('send-sms-reminder', {
            body: {
              customerPhone: formData.customer_phone,
              customerName: 'Customer',
              serviceType: formData.service_type,
              appointmentDate: formData.appointment_date,
              appointmentTime: formData.appointment_time,
              bookingReference: data.booking_reference || 'N/A'
            }
          });
        } catch (smsError) {
          console.log('SMS notification skipped:', smsError);
        }
      }

      toast({
        title: "Success",
        description: "Appointment booked successfully!"
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to book appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule a service appointment for your vehicle.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle_id">Vehicle</Label>
            <Select value={formData.vehicle_id} onValueChange={(value) => handleSelectChange(value, 'vehicle_id')}>
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model} ({vehicle.registration})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_type">Service Type *</Label>
            <Select value={formData.service_type} onValueChange={(value) => handleSelectChange(value, 'service_type')} required>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointment_date">Date *</Label>
              <Input
                id="appointment_date"
                name="appointment_date"
                type="date"
                min={today}
                value={formData.appointment_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment_time">Time *</Label>
              <Select value={formData.appointment_time} onValueChange={(value) => handleSelectChange(value, 'appointment_time')} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duration (minutes)</Label>
              <Select value={formData.duration_minutes} onValueChange={(value) => handleSelectChange(value, 'duration_minutes')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_cost">Estimated Cost (£)</Label>
              <Input
                id="estimated_cost"
                name="estimated_cost"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.estimated_cost}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technician_id">Assign Technician</Label>
            {suggestedTechnician && formData.appointment_date && !formData.technician_id && (
              <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20 text-sm">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Suggested:</span>
                <button
                  type="button"
                  onClick={() => handleSelectChange(suggestedTechnician.id, 'technician_id')}
                  className="font-medium text-primary hover:underline"
                >
                  {suggestedTechnician.full_name || suggestedTechnician.email}
                </button>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Least busy
                </Badge>
              </div>
            )}
            <Select value={formData.technician_id} onValueChange={(value) => handleSelectChange(value, 'technician_id')}>
              <SelectTrigger>
                <SelectValue placeholder="Select a technician (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unassigned</SelectItem>
                {technicians
                  .sort((a, b) => (a.totalMinutes || 0) - (b.totalMinutes || 0))
                  .map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span>{tech.full_name || tech.email}</span>
                        {formData.appointment_date && (
                          <span className="text-xs text-muted-foreground">
                            ({tech.appointmentCount || 0} appts / {((tech.totalMinutes || 0) / 60).toFixed(1)}h)
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_phone">Customer Phone (for SMS reminders)</Label>
            <Input
              id="customer_phone"
              name="customer_phone"
              type="tel"
              placeholder="+44..."
              value={formData.customer_phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any specific requirements or issues to note..."
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="send_sms"
              checked={sendSmsReminder}
              onCheckedChange={(checked) => setSendSmsReminder(checked === true)}
            />
            <Label htmlFor="send_sms" className="flex items-center gap-2 cursor-pointer">
              <MessageSquare className="h-4 w-4" />
              Send SMS reminder to customer
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Book Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentForm;
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Clock, CheckCircle, ArrowLeft, ArrowRight, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';

interface BookableService {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number | null;
  price_from: boolean | null;
  category: string | null;
}

interface BusinessHours {
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean | null;
  slot_interval_minutes: number | null;
}

interface BlockedTime {
  date: string;
  start_time: string | null;
  end_time: string | null;
  all_day: boolean | null;
}

type BookingStep = 'service' | 'datetime' | 'details' | 'confirm';

export default function BookingClient() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [step, setStep] = useState<BookingStep>('service');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [services, setServices] = useState<BookableService[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [existingAppointments, setExistingAppointments] = useState<any[]>([]);
  
  const [selectedService, setSelectedService] = useState<BookableService | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle_info: '',
    notes: '',
    sendSms: false
  });
  
  const [bookingReference, setBookingReference] = useState<string>('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedService) {
      calculateAvailableSlots();
    }
  }, [selectedDate, selectedService, existingAppointments, blockedTimes, businessHours]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const { data: servicesData } = await supabase
        .from('bookable_services')
        .select('*')
        .eq('is_active', true)
        .eq('online_booking_enabled', true)
        .order('sort_order', { ascending: true });
      
      const { data: hoursData } = await supabase
        .from('business_hours')
        .select('*')
        .order('day_of_week', { ascending: true });
      
      const { data: blockedData } = await supabase
        .from('blocked_times')
        .select('*')
        .gte('date', format(new Date(), 'yyyy-MM-dd'))
        .lte('date', format(addDays(new Date(), 60), 'yyyy-MM-dd'));
      
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*')
        .gte('appointment_date', format(new Date(), 'yyyy-MM-dd'))
        .lte('appointment_date', format(addDays(new Date(), 60), 'yyyy-MM-dd'))
        .not('status', 'in', '("cancelled","no_show")');

      setServices(servicesData || []);
      setBusinessHours(hoursData || []);
      setBlockedTimes(blockedData || []);
      setExistingAppointments(appointmentsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAvailableSlots = () => {
    if (!selectedDate || !selectedService) return;
    const dayOfWeek = selectedDate.getDay();
    const dayHours = businessHours.find(h => h.day_of_week === dayOfWeek);
    if (!dayHours || dayHours.is_closed || !dayHours.open_time || !dayHours.close_time) {
      setAvailableSlots([]);
      return;
    }

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const slots: string[] = [];
    const interval = dayHours.slot_interval_minutes || 30;
    const [openHour, openMin] = dayHours.open_time.split(':').map(Number);
    const [closeHour, closeMin] = dayHours.close_time.split(':').map(Number);
    
    let currentHour = openHour;
    let currentMin = openMin;
    
    while (currentHour < closeHour || (currentHour === closeHour && currentMin < closeMin)) {
      const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
      const endTime = addMinutesToTime(timeStr, selectedService.duration_minutes);
      
      const [endHour, endMinStr] = endTime.split(':').map(Number);
      if (endHour > closeHour || (endHour === closeHour && endMinStr > closeMin)) break;
      
      const isBlocked = blockedTimes.some(bt => {
        if (bt.date !== dateStr) return false;
        if (bt.all_day) return true;
        if (!bt.start_time || !bt.end_time) return false;
        return isTimeOverlap(timeStr, endTime, bt.start_time, bt.end_time);
      });
      
      const hasConflict = existingAppointments.some(apt => {
        if (apt.appointment_date !== dateStr) return false;
        const aptEnd = addMinutesToTime(apt.appointment_time, apt.duration_minutes);
        return isTimeOverlap(timeStr, endTime, apt.appointment_time, aptEnd);
      });
      
      if (!isBlocked && !hasConflict) slots.push(timeStr);
      
      currentMin += interval;
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60);
        currentMin = currentMin % 60;
      }
    }
    setAvailableSlots(slots);
  };

  const addMinutesToTime = (time: string, minutes: number): string => {
    const [h, m] = time.split(':').map(Number);
    const totalMinutes = h * 60 + m + minutes;
    return `${Math.floor(totalMinutes / 60).toString().padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}`;
  };

  const isTimeOverlap = (start1: string, end1: string, start2: string, end2: string): boolean => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    return toMinutes(start1) < toMinutes(end2) && toMinutes(start2) < toMinutes(end1);
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          service_type: selectedService.name,
          appointment_date: format(selectedDate, 'yyyy-MM-dd'),
          appointment_time: selectedTime,
          duration_minutes: selectedService.duration_minutes,
          customer_name: customerDetails.name,
          customer_email: customerDetails.email,
          customer_phone: customerDetails.phone,
          notes: `Vehicle: ${customerDetails.vehicle_info}\n${customerDetails.notes}`.trim(),
          estimated_cost: selectedService.price,
          booked_online: true,
          status: 'scheduled'
        })
        .select('booking_reference')
        .single();

      if (error) throw error;
      setBookingReference(data.booking_reference || 'Confirmed');
      setStep('confirm');
    } catch (error: any) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
           {step === 'service' && (
             <div className="max-w-4xl mx-auto">
               <h1 className="text-3xl font-bold text-center mb-8">Book Your Service</h1>
               <div className="grid md:grid-cols-2 gap-4">
                 {services.map(s => (
                   <Card key={s.id} className="cursor-pointer" onClick={() => setSelectedService(s)}>
                     <CardHeader><CardTitle>{s.name}</CardTitle></CardHeader>
                     <CardContent><p>£{s.price}</p></CardContent>
                   </Card>
                 ))}
               </div>
               <Button className="mt-8 float-right" onClick={() => setStep('datetime')} disabled={!selectedService}>Continue</Button>
             </div>
           )}
           {/* ... steps datetime, details, confirm ... */}
           {step === 'confirm' && (
             <div className="text-center">
               <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
               <h1 className="text-3xl font-bold">Confirmed! Ref: {bookingReference}</h1>
               <Button className="mt-8" onClick={() => router.push('/')}>Home</Button>
             </div>
           )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

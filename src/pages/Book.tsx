import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Loader2, Clock, CheckCircle, ArrowLeft, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';
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

const Book = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<BookingStep>('service');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Data
  const [services, setServices] = useState<BookableService[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [existingAppointments, setExistingAppointments] = useState<any[]>([]);
  
  // Selections
  const [selectedService, setSelectedService] = useState<BookableService | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Customer details
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle_info: '',
    notes: ''
  });
  
  // Booking result
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
      // Fetch bookable services
      const { data: servicesData } = await supabase
        .from('bookable_services')
        .select('*')
        .eq('is_active', true)
        .eq('online_booking_enabled', true)
        .order('sort_order', { ascending: true });
      
      // Fetch business hours
      const { data: hoursData } = await supabase
        .from('business_hours')
        .select('*')
        .order('day_of_week', { ascending: true });
      
      // Fetch blocked times for next 60 days
      const { data: blockedData } = await supabase
        .from('blocked_times')
        .select('*')
        .gte('date', format(new Date(), 'yyyy-MM-dd'))
        .lte('date', format(addDays(new Date(), 60), 'yyyy-MM-dd'));
      
      // Fetch existing appointments for next 60 days
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
      toast({
        title: "Error",
        description: "Failed to load booking data. Please refresh the page.",
        variant: "destructive"
      });
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
    
    // Parse open/close times
    const [openHour, openMin] = dayHours.open_time.split(':').map(Number);
    const [closeHour, closeMin] = dayHours.close_time.split(':').map(Number);
    
    let currentHour = openHour;
    let currentMin = openMin;
    
    while (currentHour < closeHour || (currentHour === closeHour && currentMin < closeMin)) {
      const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
      const endTime = addMinutesToTime(timeStr, selectedService.duration_minutes);
      
      // Check if slot fits within business hours
      const [endHour, endMinStr] = endTime.split(':').map(Number);
      if (endHour > closeHour || (endHour === closeHour && endMinStr > closeMin)) {
        break;
      }
      
      // Check if blocked
      const isBlocked = blockedTimes.some(bt => {
        if (bt.date !== dateStr) return false;
        if (bt.all_day) return true;
        if (!bt.start_time || !bt.end_time) return false;
        return isTimeOverlap(timeStr, endTime, bt.start_time, bt.end_time);
      });
      
      // Check existing appointments
      const hasConflict = existingAppointments.some(apt => {
        if (apt.appointment_date !== dateStr) return false;
        const aptEnd = addMinutesToTime(apt.appointment_time, apt.duration_minutes);
        return isTimeOverlap(timeStr, endTime, apt.appointment_time, aptEnd);
      });
      
      if (!isBlocked && !hasConflict) {
        slots.push(timeStr);
      }
      
      // Move to next slot
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
    const newHour = Math.floor(totalMinutes / 60);
    const newMin = totalMinutes % 60;
    return `${newHour.toString().padStart(2, '0')}:${newMin.toString().padStart(2, '0')}`;
  };

  const isTimeOverlap = (start1: string, end1: string, start2: string, end2: string): boolean => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const s1 = toMinutes(start1), e1 = toMinutes(end1);
    const s2 = toMinutes(start2), e2 = toMinutes(end2);
    return s1 < e2 && s2 < e1;
  };

  const isDateDisabled = (date: Date): boolean => {
    // Disable past dates
    if (isBefore(date, startOfDay(new Date()))) return true;
    
    const dayOfWeek = date.getDay();
    const dayHours = businessHours.find(h => h.day_of_week === dayOfWeek);
    
    // Disable closed days
    if (!dayHours || dayHours.is_closed) return true;
    
    // Check if entire day is blocked
    const dateStr = format(date, 'yyyy-MM-dd');
    const isFullyBlocked = blockedTimes.some(bt => bt.date === dateStr && bt.all_day);
    
    return isFullyBlocked;
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

      const reference = data.booking_reference || 'Confirmed';
      setBookingReference(reference);
      setStep('confirm');
      
      // Send confirmation email (non-blocking)
      if (customerDetails.email) {
        supabase.functions.invoke('send-booking-email', {
          body: {
            customerName: customerDetails.name,
            customerEmail: customerDetails.email,
            serviceType: selectedService.name,
            appointmentDate: format(selectedDate, 'EEEE, d MMMM yyyy'),
            appointmentTime: selectedTime,
            bookingReference: reference,
            vehicleInfo: customerDetails.vehicle_info
          }
        }).catch(err => console.log('Email notification skipped:', err.message));
      }
      
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully booked."
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (service: BookableService) => {
    if (!service.price) return 'Price on request';
    return service.price_from ? `From £${service.price}` : `£${service.price}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading booking system...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {['service', 'datetime', 'details', 'confirm'].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s ? 'bg-primary text-primary-foreground' :
                    ['service', 'datetime', 'details', 'confirm'].indexOf(step) > i ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  {i < 3 && <div className={`w-12 h-0.5 mx-2 ${
                    ['service', 'datetime', 'details', 'confirm'].indexOf(step) > i ? 'bg-primary' : 'bg-muted'
                  }`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2 space-x-8 text-sm text-muted-foreground">
              <span>Service</span>
              <span>Date & Time</span>
              <span>Details</span>
              <span>Confirm</span>
            </div>
          </div>

          {/* Step 1: Service Selection */}
          {step === 'service' && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-2">Book Your Service</h1>
              <p className="text-center text-muted-foreground mb-8">Select the service you need</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card 
                    key={service.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedService?.id === service.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        {service.category && (
                          <Badge variant="secondary">{service.category}</Badge>
                        )}
                      </div>
                      {service.description && (
                        <CardDescription>{service.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{formatDuration(service.duration_minutes)}</span>
                        </div>
                        <span className="font-semibold text-primary">{formatPrice(service)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {services.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No services available for online booking at the moment.</p>
                  <p className="mt-2">Please <a href="/contact" className="text-primary underline">contact us</a> to arrange an appointment.</p>
                </Card>
              )}
              
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => setStep('datetime')} 
                  disabled={!selectedService}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 'datetime' && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-2">Choose Date & Time</h1>
              <p className="text-center text-muted-foreground mb-8">
                {selectedService?.name} - {formatDuration(selectedService?.duration_minutes || 0)}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Select Date
                    </CardTitle>
                    <CardDescription>Green days have good availability, amber has limited slots</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AvailabilityCalendar
                      currentMonth={currentMonth}
                      onMonthChange={setCurrentMonth}
                      selectedDate={selectedDate}
                      onSelectDate={(date) => {
                        setSelectedDate(date);
                        setSelectedTime('');
                      }}
                      businessHours={businessHours}
                      blockedTimes={blockedTimes}
                      appointments={existingAppointments}
                      serviceDuration={selectedService?.duration_minutes || 60}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Select Time
                    </CardTitle>
                    {selectedDate && (
                      <CardDescription>
                        {format(selectedDate, 'EEEE, d MMMM yyyy')}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!selectedDate ? (
                      <p className="text-muted-foreground text-center py-8">Please select a date first</p>
                    ) : availableSlots.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No available slots for this date</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep('service')}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={() => setStep('details')} 
                  disabled={!selectedDate || !selectedTime}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Customer Details */}
          {step === 'details' && (
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-2">Your Details</h1>
              <p className="text-center text-muted-foreground mb-8">
                {selectedService?.name} on {selectedDate && format(selectedDate, 'EEEE, d MMMM yyyy')} at {selectedTime}
              </p>
              
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="07XXX XXXXXX"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vehicle_info">Vehicle (Make, Model, Registration) *</Label>
                    <Input
                      id="vehicle_info"
                      value={customerDetails.vehicle_info}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, vehicle_info: e.target.value }))}
                      placeholder="e.g. Ford Focus, AB12 CDE"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={customerDetails.notes}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any specific issues or requirements..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep('datetime')}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.vehicle_info}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirm' && (
            <div className="max-w-xl mx-auto text-center">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-6">Thank you for booking with DP Automotive</p>
              
              <Card className="text-left">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reference:</span>
                    <span className="font-mono font-bold">{bookingReference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{selectedDate && format(selectedDate, 'EEEE, d MMMM yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  {selectedService?.price && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Cost:</span>
                      <span className="font-medium">{formatPrice(selectedService)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <p className="text-sm text-muted-foreground mt-6">
                A confirmation email will be sent to {customerDetails.email}
              </p>
              
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Return Home
                </Button>
                <Button onClick={() => {
                  setStep('service');
                  setSelectedService(null);
                  setSelectedDate(undefined);
                  setSelectedTime('');
                  setCustomerDetails({ name: '', email: '', phone: '', vehicle_info: '', notes: '' });
                  setBookingReference('');
                }}>
                  Book Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Book;

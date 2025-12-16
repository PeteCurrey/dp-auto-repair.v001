import { useMemo } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isBefore, startOfDay, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

interface Appointment {
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
}

interface AvailabilityCalendarProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date) => void;
  businessHours: BusinessHours[];
  blockedTimes: BlockedTime[];
  appointments: Appointment[];
  serviceDuration: number;
}

type AvailabilityLevel = 'closed' | 'blocked' | 'limited' | 'available';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const AvailabilityCalendar = ({
  currentMonth,
  onMonthChange,
  selectedDate,
  onSelectDate,
  businessHours,
  blockedTimes,
  appointments,
  serviceDuration,
}: AvailabilityCalendarProps) => {
  
  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startPadding = useMemo(() => {
    return startOfMonth(currentMonth).getDay();
  }, [currentMonth]);

  const calculateDayAvailability = (date: Date): AvailabilityLevel => {
    // Past dates
    if (isBefore(date, startOfDay(new Date()))) return 'closed';
    
    // Check business hours
    const dayOfWeek = date.getDay();
    const dayHours = businessHours.find(h => h.day_of_week === dayOfWeek);
    
    if (!dayHours || dayHours.is_closed || !dayHours.open_time || !dayHours.close_time) {
      return 'closed';
    }

    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Check if fully blocked
    const isFullyBlocked = blockedTimes.some(bt => bt.date === dateStr && bt.all_day);
    if (isFullyBlocked) return 'blocked';

    // Calculate available slots
    const availableSlots = calculateSlotsForDay(date, dayHours, dateStr);
    
    if (availableSlots === 0) return 'blocked';
    if (availableSlots <= 3) return 'limited';
    return 'available';
  };

  const calculateSlotsForDay = (
    date: Date, 
    dayHours: BusinessHours, 
    dateStr: string
  ): number => {
    if (!dayHours.open_time || !dayHours.close_time) return 0;
    
    const interval = dayHours.slot_interval_minutes || 30;
    const [openHour, openMin] = dayHours.open_time.split(':').map(Number);
    const [closeHour, closeMin] = dayHours.close_time.split(':').map(Number);
    
    let slots = 0;
    let currentHour = openHour;
    let currentMin = openMin;
    
    while (currentHour < closeHour || (currentHour === closeHour && currentMin < closeMin)) {
      const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
      const endTime = addMinutesToTime(timeStr, serviceDuration);
      
      const [endHour, endMinNum] = endTime.split(':').map(Number);
      if (endHour > closeHour || (endHour === closeHour && endMinNum > closeMin)) {
        break;
      }
      
      // Check if blocked
      const isBlocked = blockedTimes.some(bt => {
        if (bt.date !== dateStr) return false;
        if (bt.all_day) return true;
        if (!bt.start_time || !bt.end_time) return false;
        return isTimeOverlap(timeStr, endTime, bt.start_time, bt.end_time);
      });
      
      // Check appointments
      const hasConflict = appointments.some(apt => {
        if (apt.appointment_date !== dateStr) return false;
        const aptEnd = addMinutesToTime(apt.appointment_time, apt.duration_minutes);
        return isTimeOverlap(timeStr, endTime, apt.appointment_time, aptEnd);
      });
      
      if (!isBlocked && !hasConflict) {
        slots++;
      }
      
      currentMin += interval;
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60);
        currentMin = currentMin % 60;
      }
    }
    
    return slots;
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

  const getAvailabilityStyles = (level: AvailabilityLevel, isSelected: boolean) => {
    const baseStyles = 'w-full aspect-square flex flex-col items-center justify-center rounded-md text-sm transition-all';
    
    if (isSelected) {
      return cn(baseStyles, 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2');
    }
    
    switch (level) {
      case 'closed':
        return cn(baseStyles, 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed');
      case 'blocked':
        return cn(baseStyles, 'bg-destructive/10 text-destructive/50 cursor-not-allowed');
      case 'limited':
        return cn(baseStyles, 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 cursor-pointer');
      case 'available':
        return cn(baseStyles, 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 cursor-pointer');
    }
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    if (!isBefore(endOfMonth(prev), startOfDay(new Date()))) {
      onMonthChange(prev);
    }
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    const maxDate = addDays(new Date(), 60);
    if (isBefore(startOfMonth(next), maxDate)) {
      onMonthChange(next);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
        <Button variant="outline" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for padding */}
        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}
        
        {/* Day cells */}
        {days.map(day => {
          const availability = calculateDayAvailability(day);
          const isSelectable = availability === 'available' || availability === 'limited';
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          
          return (
            <button
              key={day.toISOString()}
              className={getAvailabilityStyles(availability, !!isSelected)}
              onClick={() => isSelectable && onSelectDate(day)}
              disabled={!isSelectable}
            >
              <span className="font-medium">{format(day, 'd')}</span>
              {availability === 'limited' && (
                <span className="text-[10px] leading-none">Limited</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-300" />
          <span className="text-muted-foreground">Limited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-muted/50 border border-muted" />
          <span className="text-muted-foreground">Closed</span>
        </div>
      </div>
    </div>
  );
};

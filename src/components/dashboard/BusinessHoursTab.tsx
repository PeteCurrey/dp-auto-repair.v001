import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clock, Save } from 'lucide-react';

interface BusinessHour {
  id?: string;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  slot_interval_minutes: number;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DEFAULT_HOURS: BusinessHour[] = DAYS.map((_, index) => ({
  day_of_week: index,
  open_time: index === 0 ? null : '08:00',
  close_time: index === 0 ? null : '17:30',
  is_closed: index === 0,
  slot_interval_minutes: 30,
}));

export const BusinessHoursTab = () => {
  const [hours, setHours] = useState<BusinessHour[]>(DEFAULT_HOURS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBusinessHours();
  }, []);

  const fetchBusinessHours = async () => {
    try {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .order('day_of_week');

      if (error) throw error;

      if (data && data.length > 0) {
        const mergedHours = DEFAULT_HOURS.map(defaultHour => {
          const existingHour = data.find(h => h.day_of_week === defaultHour.day_of_week);
          return existingHour ? {
            id: existingHour.id,
            day_of_week: existingHour.day_of_week,
            open_time: existingHour.open_time,
            close_time: existingHour.close_time,
            is_closed: existingHour.is_closed ?? false,
            slot_interval_minutes: existingHour.slot_interval_minutes ?? 30,
          } : defaultHour;
        });
        setHours(mergedHours);
      }
    } catch (error) {
      console.error('Error fetching business hours:', error);
      toast({
        title: 'Error',
        description: 'Failed to load business hours',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const hour of hours) {
        const data = {
          day_of_week: hour.day_of_week,
          open_time: hour.is_closed ? null : hour.open_time,
          close_time: hour.is_closed ? null : hour.close_time,
          is_closed: hour.is_closed,
          slot_interval_minutes: hour.slot_interval_minutes,
        };

        if (hour.id) {
          const { error } = await supabase
            .from('business_hours')
            .update(data)
            .eq('id', hour.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('business_hours')
            .insert(data);
          if (error) throw error;
        }
      }

      toast({
        title: 'Success',
        description: 'Business hours saved successfully',
      });
      fetchBusinessHours();
    } catch (error) {
      console.error('Error saving business hours:', error);
      toast({
        title: 'Error',
        description: 'Failed to save business hours',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateHour = (dayIndex: number, field: keyof BusinessHour, value: any) => {
    setHours(prev => prev.map(h => 
      h.day_of_week === dayIndex ? { ...h, [field]: value } : h
    ));
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Business Hours
        </CardTitle>
        <CardDescription>
          Configure opening times and booking slot intervals for each day
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {hours.map((hour) => (
            <div
              key={hour.day_of_week}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border bg-card"
            >
              <div className="w-24 font-medium">{DAYS[hour.day_of_week]}</div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={!hour.is_closed}
                  onCheckedChange={(checked) => updateHour(hour.day_of_week, 'is_closed', !checked)}
                />
                <span className="text-sm text-muted-foreground">
                  {hour.is_closed ? 'Closed' : 'Open'}
                </span>
              </div>

              {!hour.is_closed && (
                <>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Open:</Label>
                    <Input
                      type="time"
                      value={hour.open_time || ''}
                      onChange={(e) => updateHour(hour.day_of_week, 'open_time', e.target.value)}
                      className="w-32"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Close:</Label>
                    <Input
                      type="time"
                      value={hour.close_time || ''}
                      onChange={(e) => updateHour(hour.day_of_week, 'close_time', e.target.value)}
                      className="w-32"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Slot:</Label>
                    <Input
                      type="number"
                      min={15}
                      max={120}
                      step={15}
                      value={hour.slot_interval_minutes}
                      onChange={(e) => updateHour(hour.day_of_week, 'slot_interval_minutes', parseInt(e.target.value) || 30)}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">min</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Business Hours'}
        </Button>
      </CardContent>
    </Card>
  );
};

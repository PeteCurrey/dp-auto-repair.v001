import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Car, Clock, TrendingUp, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MOTReminder {
  id: string;
  registration: string;
  mot_expiry_date: string;
  reminder_sent: boolean;
  reminder_date: string | null;
  client_email: string | null;
  client_phone: string | null;
  created_at: string;
}

interface VehicleLookup {
  id: string;
  registration: string;
  make: string | null;
  model: string | null;
  year: number | null;
  fuel_type: string | null;
  mot_status: string | null;
  mot_expiry_date: string | null;
  tax_status: string | null;
  lookup_count: number;
  last_updated: string;
}

const VehicleManagementTab = () => {
  const [motReminders, setMotReminders] = useState<MOTReminder[]>([]);
  const [recentLookups, setRecentLookups] = useState<VehicleLookup[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    try {
      setLoading(true);

      // Fetch MOT reminders
      const { data: remindersData, error: remindersError } = await supabase
        .from('mot_reminders')
        .select('*')
        .order('mot_expiry_date', { ascending: true });

      if (remindersError) throw remindersError;
      setMotReminders(remindersData || []);

      // Fetch recent vehicle lookups
      const { data: lookupsData, error: lookupsError } = await supabase
        .from('vehicle_lookups')
        .select('*')
        .order('last_updated', { ascending: false })
        .limit(10);

      if (lookupsError) throw lookupsError;
      setRecentLookups(lookupsData || []);

    } catch (error: any) {
      console.error('Error fetching vehicle data:', error);
      toast({
        title: "Error",
        description: "Failed to load vehicle management data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markReminderSent = async (reminderId: string) => {
    try {
      const { error } = await supabase
        .from('mot_reminders')
        .update({ reminder_sent: true })
        .eq('id', reminderId);

      if (error) throw error;

      setMotReminders(prev => 
        prev.map(reminder => 
          reminder.id === reminderId 
            ? { ...reminder, reminder_sent: true }
            : reminder
        )
      );

      toast({
        title: "Success",
        description: "Reminder marked as sent."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update reminder status.",
        variant: "destructive"
      });
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryBadgeVariant = (daysRemaining: number) => {
    if (daysRemaining <= 0) return 'destructive';
    if (daysRemaining <= 7) return 'destructive';
    if (daysRemaining <= 30) return 'secondary';
    return 'outline';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-white/20 backdrop-blur-md border-white/30">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-white/20 rounded w-1/2"></div>
                  <div className="h-8 bg-white/20 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const urgentReminders = motReminders.filter(r => !r.reminder_sent && getDaysUntilExpiry(r.mot_expiry_date) <= 30);
  const totalLookups = recentLookups.reduce((sum, lookup) => sum + lookup.lookup_count, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Urgent MOT Reminders</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{urgentReminders.length}</div>
            <p className="text-xs text-white/70">
              Vehicles with MOT due within 30 days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Vehicle Lookups</CardTitle>
            <Car className="h-4 w-4 text-primary-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalLookups}</div>
            <p className="text-xs text-white/70">
              Across {recentLookups.length} unique vehicles
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Database Entries</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{recentLookups.length}</div>
            <p className="text-xs text-white/70">
              Vehicles in database
            </p>
          </CardContent>
        </Card>
      </div>

      {/* MOT Reminders Section */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            MOT Reminders
          </CardTitle>
          <CardDescription className="text-white/80">
            Vehicles requiring MOT renewal attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {motReminders.length > 0 ? (
            <div className="space-y-3">
              {motReminders.map((reminder) => {
                const daysRemaining = getDaysUntilExpiry(reminder.mot_expiry_date);
                return (
                  <div key={reminder.id} className="flex items-center justify-between p-4 border border-white/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Car className="h-4 w-4 text-white/70" />
                        <div>
                          <p className="font-medium text-white">{reminder.registration}</p>
                          <p className="text-sm text-white/70">
                            MOT expires: {new Date(reminder.mot_expiry_date).toLocaleDateString()}
                          </p>
                          {reminder.client_email && (
                            <p className="text-xs text-white/60">
                              Contact: {reminder.client_email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getExpiryBadgeVariant(daysRemaining)}>
                        {daysRemaining <= 0 ? 'Expired' : `${daysRemaining} days`}
                      </Badge>
                      {!reminder.reminder_sent && (
                        <Button
                          size="sm"
                          onClick={() => markReminderSent(reminder.id)}
                          className="gradient-primary shadow-glow"
                        >
                          Mark Sent
                        </Button>
                      )}
                      {reminder.reminder_sent && (
                        <Badge variant="outline" className="bg-green-500/20 text-green-200 border-green-400/30">
                          Sent
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-white/70 text-center py-8">No MOT reminders at this time</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Vehicle Lookups */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5" />
            Recent Vehicle Lookups
          </CardTitle>
          <CardDescription className="text-white/80">
            Recently searched vehicles and their data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentLookups.length > 0 ? (
            <div className="space-y-3">
              {recentLookups.map((lookup) => (
                <div key={lookup.id} className="flex items-center justify-between p-4 border border-white/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Car className="h-4 w-4 text-white/70" />
                    <div>
                      <p className="font-medium text-white">{lookup.registration}</p>
                      {lookup.make && lookup.model && (
                        <p className="text-sm text-white/70">
                          {lookup.make} {lookup.model} {lookup.year && `(${lookup.year})`}
                        </p>
                      )}
                      {lookup.mot_expiry_date && (
                        <p className="text-xs text-white/60">
                          MOT: {new Date(lookup.mot_expiry_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/70">
                      Searched {lookup.lookup_count} times
                    </p>
                    <p className="text-xs text-white/60">
                      Last: {new Date(lookup.last_updated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/70 text-center py-8">No vehicle lookups yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleManagementTab;
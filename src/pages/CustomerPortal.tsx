import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Wrench, CreditCard, Bell, LogOut, Home, Clock, FileText, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import heroImage from "@/assets/hero-garage.jpg";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  registration: string;
  mot_expiry: string | null;
}

interface Appointment {
  id: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  booking_reference: string | null;
  vehicle_id: string | null;
}

const CustomerPortal = () => {
  const { user, signOut, loading } = useAuth();
  const { isStaff, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/customer-login');
    }
  }, [user, loading, navigate]);

  // Redirect staff to staff dashboard
  useEffect(() => {
    if (!roleLoading && isStaff) {
      navigate('/dashboard');
    }
  }, [isStaff, roleLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchCustomerData();
    }
  }, [user]);

  const fetchCustomerData = async () => {
    if (!user) return;
    
    try {
      // Fetch or create profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Create profile
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            email: user.email || '',
            full_name: (user as any).user_metadata?.full_name || null,
            user_type: 'client'
          })
          .select('*')
          .single();
        setProfile(newProfile);
      } else if (profileData) {
        setProfile(profileData);
      }

      // Fetch customer's vehicles
      if (profileData) {
        const { data: vehiclesData } = await supabase
          .from('vehicles')
          .select('*')
          .eq('owner_id', profileData.id);
        setVehicles(vehiclesData || []);

        // Fetch customer's appointments
        const { data: appointmentsData } = await supabase
          .from('appointments')
          .select('*')
          .eq('client_id', profileData.id)
          .order('appointment_date', { ascending: false });
        setAppointments(appointmentsData || []);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      toast({
        title: "Error",
        description: "Failed to load your data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDataLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      scheduled: 'default',
      confirmed: 'default',
      in_progress: 'secondary',
      completed: 'outline',
      cancelled: 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status.replace('_', ' ')}</Badge>;
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.appointment_date >= today && apt.status !== 'cancelled');
  };

  const getVehiclesNeedingMot = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return vehicles.filter(v => {
      if (!v.mot_expiry) return false;
      const motDate = new Date(v.mot_expiry);
      return motDate <= thirtyDaysFromNow;
    });
  };

  if (loading || dataLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="relative border-b" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-extralight text-gray-300">DP Automotive</h1>
            </Link>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Customer Portal
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-white">{profile.full_name || 'Customer'}</p>
              <p className="text-sm text-white/70">{profile.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {profile.full_name?.split(' ')[0] || 'Customer'}!</h2>
          <p className="text-muted-foreground">Manage your vehicles, view appointments, and track your service history.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">My Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUpcomingAppointments().length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">MOT Reminders</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getVehiclesNeedingMot().length}</div>
              <p className="text-xs text-muted-foreground">Due within 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Service History</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.filter(a => a.status === 'completed').length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              My Vehicles
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled services</CardDescription>
                </CardHeader>
                <CardContent>
                  {getUpcomingAppointments().length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No upcoming appointments</p>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link to="/book">Book a Service</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getUpcomingAppointments().slice(0, 3).map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{apt.service_type}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(apt.appointment_date), 'PPP')} at {apt.appointment_time}
                            </p>
                            {apt.booking_reference && (
                              <p className="text-xs text-muted-foreground">Ref: {apt.booking_reference}</p>
                            )}
                          </div>
                          {getStatusBadge(apt.status)}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* MOT Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle>MOT Reminders</CardTitle>
                  <CardDescription>Vehicles needing attention</CardDescription>
                </CardHeader>
                <CardContent>
                  {getVehiclesNeedingMot().length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No MOT reminders</p>
                      <p className="text-sm">All vehicles are up to date</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getVehiclesNeedingMot().map((vehicle) => (
                        <div key={vehicle.id} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                          <div>
                            <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                            <p className="text-sm text-muted-foreground">{vehicle.registration}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="destructive">MOT Due</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {vehicle.mot_expiry ? format(new Date(vehicle.mot_expiry), 'PP') : 'Unknown'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <CardTitle>My Vehicles</CardTitle>
                <CardDescription>Vehicles registered to your account</CardDescription>
              </CardHeader>
              <CardContent>
                {vehicles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Car className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No vehicles registered</p>
                    <p className="text-sm">Your vehicles will appear here after your first booking</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicles.map((vehicle) => (
                      <Card key={vehicle.id} className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-lg">{vehicle.make} {vehicle.model}</h4>
                              <p className="text-muted-foreground">{vehicle.year}</p>
                              <p className="font-mono text-lg mt-2">{vehicle.registration}</p>
                            </div>
                            <Car className="h-8 w-8 text-muted-foreground" />
                          </div>
                          {vehicle.mot_expiry && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm text-muted-foreground">MOT Expires</p>
                              <p className="font-medium">{format(new Date(vehicle.mot_expiry), 'PP')}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>Your complete appointment history</CardDescription>
                </div>
                <Button asChild>
                  <Link to="/book">Book New Appointment</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No appointments yet</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/book">Book Your First Service</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{apt.service_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(apt.appointment_date), 'PPP')} at {apt.appointment_time}
                          </p>
                          {apt.booking_reference && (
                            <p className="text-xs text-muted-foreground">Ref: {apt.booking_reference}</p>
                          )}
                        </div>
                        {getStatusBadge(apt.status)}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoices & Payments</CardTitle>
                <CardDescription>View and pay your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Payment system coming soon</p>
                  <p className="text-sm">You'll be able to view and pay invoices here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-muted-foreground">{profile.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-muted-foreground">{profile.phone || 'Not set'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerPortal;

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Wrench, CreditCard, Bell, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VehicleForm from '@/components/dashboard/VehicleForm';
import AppointmentForm from '@/components/dashboard/AppointmentForm';
import { formatDate } from '@/lib/utils';

interface Profile {
  id: string;
  user_type: string;
  full_name: string | null;
  email: string;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  registration: string;
  mileage: number | null;
  fuel_type: string | null;
  mot_expiry: string | null;
  service_due_date: string | null;
  service_due_mileage: number | null;
}

interface Appointment {
  id: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  estimated_cost: number | null;
  vehicles: Vehicle | null;
}

interface Service {
  id: string;
  service_type: string;
  description: string | null;
  cost: number | null;
  service_date: string;
  status: string;
  vehicles: Vehicle | null;
}

interface Reminder {
  id: string;
  reminder_type: string;
  title: string;
  description: string | null;
  due_date: string;
  due_mileage: number | null;
  vehicles: Vehicle | null;
}

const ClientDashboard = ({ profile }: { profile: Profile }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch vehicles
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', profile.id)
        .order('created_at', { ascending: false });

      if (vehiclesError) throw vehiclesError;
      setVehicles(vehiclesData || []);

      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select(`
          *,
          vehicles (*)
        `)
        .eq('client_id', profile.id)
        .order('appointment_date', { ascending: true });

      if (appointmentsError) throw appointmentsError;
      setAppointments(appointmentsData || []);

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          vehicles (*)
        `)
        .in('vehicle_id', vehiclesData?.map(v => v.id) || [])
        .order('service_date', { ascending: false });

      if (servicesError) throw servicesError;
      setServices(servicesData || []);

      // Fetch reminders
      const { data: remindersData, error: remindersError } = await supabase
        .from('reminders')
        .select(`
          *,
          vehicles (*)
        `)
        .in('vehicle_id', vehiclesData?.map(v => v.id) || [])
        .eq('is_sent', false)
        .order('due_date', { ascending: true });

      if (remindersError) throw remindersError;
      setReminders(remindersData || []);

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please refresh the page.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
      case 'confirmed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(a => a.status !== 'completed' && a.status !== 'cancelled').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Completed</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reminders</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reminders.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="services">Service History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Reminders */}
          {reminders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Upcoming Reminders
                </CardTitle>
                <CardDescription>
                  Important reminders for your vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reminders.slice(0, 3).map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{reminder.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {reminder.vehicles?.make} {reminder.vehicles?.model} ({reminder.vehicles?.registration})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {formatDate(reminder.due_date)}
                        </p>
                      </div>
                      <Badge variant="secondary">{reminder.reminder_type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{appointment.service_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.vehicles?.make} {appointment.vehicles?.model}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(appointment.appointment_date)} at {appointment.appointment_time}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No appointments scheduled</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">My Vehicles</h2>
            <Button onClick={() => setShowVehicleForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>

          {vehicles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardHeader>
                    <CardTitle>{vehicle.make} {vehicle.model}</CardTitle>
                    <CardDescription>
                      {vehicle.year} • {vehicle.registration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {vehicle.mileage && (
                        <p>Mileage: {vehicle.mileage.toLocaleString()} miles</p>
                      )}
                      {vehicle.fuel_type && (
                        <p>Fuel Type: {vehicle.fuel_type}</p>
                      )}
                      {vehicle.mot_expiry && (
                        <p>MOT Expires: {formatDate(vehicle.mot_expiry)}</p>
                      )}
                      {vehicle.service_due_date && (
                        <p>Next Service: {formatDate(vehicle.service_due_date)}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Car className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No vehicles added</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Add your first vehicle to start tracking services and appointments
                </p>
                <Button onClick={() => setShowVehicleForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Vehicle
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Appointments</h2>
            <Button 
              onClick={() => setShowAppointmentForm(true)}
              disabled={vehicles.length === 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </div>

          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{appointment.service_type}</CardTitle>
                        <CardDescription>
                          {appointment.vehicles?.make} {appointment.vehicles?.model} ({appointment.vehicles?.registration})
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusBadgeVariant(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Date & Time:</strong> {formatDate(appointment.appointment_date)} at {appointment.appointment_time}
                      </p>
                      {appointment.estimated_cost && (
                        <p className="text-sm">
                          <strong>Estimated Cost:</strong> £{appointment.estimated_cost}
                        </p>
                      )}
                      {appointment.notes && (
                        <p className="text-sm">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No appointments</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Book your first appointment for vehicle service
                </p>
                {vehicles.length > 0 ? (
                  <Button onClick={() => setShowAppointmentForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">Add a vehicle first to book appointments</p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <h2 className="text-2xl font-bold">Service History</h2>

          {services.length > 0 ? (
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{service.service_type}</CardTitle>
                        <CardDescription>
                          {service.vehicles?.make} {service.vehicles?.model} ({service.vehicles?.registration})
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusBadgeVariant(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Date:</strong> {formatDate(service.service_date)}
                      </p>
                      {service.cost && (
                        <p className="text-sm">
                          <strong>Cost:</strong> £{service.cost}
                        </p>
                      )}
                      {service.description && (
                        <p className="text-sm">
                          <strong>Description:</strong> {service.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No service history</h3>
                <p className="text-muted-foreground text-center">
                  Your completed services will appear here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Forms */}
      {showVehicleForm && (
        <VehicleForm
          profileId={profile.id}
          onClose={() => setShowVehicleForm(false)}
          onSuccess={() => {
            setShowVehicleForm(false);
            fetchDashboardData();
          }}
        />
      )}

      {showAppointmentForm && (
        <AppointmentForm
          profileId={profile.id}
          vehicles={vehicles}
          onClose={() => setShowAppointmentForm(false)}
          onSuccess={() => {
            setShowAppointmentForm(false);
            fetchDashboardData();
          }}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
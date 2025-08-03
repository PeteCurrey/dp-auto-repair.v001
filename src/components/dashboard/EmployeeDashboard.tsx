import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Users, Wrench, CreditCard, Plus, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  profiles: {
    full_name: string | null;
    email: string;
  } | null;
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

const EmployeeDashboard = ({ profile }: { profile: Profile }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select(`
          *,
          vehicles (*),
          profiles!appointments_client_id_fkey (full_name, email)
        `)
        .order('appointment_date', { ascending: true });

      if (appointmentsError) throw appointmentsError;
      setAppointments(appointmentsData || []);

      // Fetch all services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          vehicles (*)
        `)
        .order('service_date', { ascending: false });

      if (servicesError) throw servicesError;
      setServices(servicesData || []);

      // Fetch all vehicles
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (vehiclesError) throw vehiclesError;
      setVehicles(vehiclesData || []);

      // Fetch all clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'client')
        .order('created_at', { ascending: false });

      if (clientsError) throw clientsError;
      setClients(clientsData || []);

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

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (error) throw error;

      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status } : apt
        )
      );

      toast({
        title: "Success",
        description: "Appointment status updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update appointment status.",
        variant: "destructive"
      });
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

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.appointment_date === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => 
      apt.appointment_date > today && 
      apt.status !== 'cancelled' && 
      apt.status !== 'completed'
    );
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

  const todayAppointments = getTodayAppointments();
  const upcomingAppointments = getUpcomingAppointments();

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicles Managed</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Completed</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {services.filter(s => s.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your business operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="h-16 flex flex-col gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Plus className="h-5 w-5" />
              Add Service Record
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              Add New Client
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="appointments">All Appointments</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Appointments
              </CardTitle>
              <CardDescription>
                {todayAppointments.length} appointments scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{appointment.service_type}</h4>
                          <Badge variant={getStatusBadgeVariant(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Time: {appointment.appointment_time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Client: {appointment.profiles?.full_name || appointment.profiles?.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Vehicle: {appointment.vehicles?.make} {appointment.vehicles?.model} ({appointment.vehicles?.registration})
                        </p>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Notes: {appointment.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === 'scheduled' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                        )}
                        {appointment.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => updateAppointmentStatus(appointment.id, 'in_progress')}
                          >
                            Start Work
                          </Button>
                        )}
                        {appointment.status === 'in_progress' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No appointments scheduled for today</p>
              )}
            </CardContent>
          </Card>

          {upcomingAppointments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{appointment.service_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(appointment.appointment_date)} at {appointment.appointment_time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.vehicles?.make} {appointment.vehicles?.model} • {appointment.profiles?.full_name || appointment.profiles?.email}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Appointments</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>

          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{appointment.service_type}</CardTitle>
                      <CardDescription>
                        {appointment.profiles?.full_name || appointment.profiles?.email}
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
                    <p className="text-sm">
                      <strong>Vehicle:</strong> {appointment.vehicles?.make} {appointment.vehicles?.model} ({appointment.vehicles?.registration})
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
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Service Records</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service Record
            </Button>
          </div>

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
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Client Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <Card key={client.id}>
                <CardHeader>
                  <CardTitle>{client.full_name || 'Unnamed Client'}</CardTitle>
                  <CardDescription>{client.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {client.phone && (
                      <p className="text-sm">Phone: {client.phone}</p>
                    )}
                    <p className="text-sm">
                      Member since: {formatDate(client.created_at)}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Vehicle Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Vehicle
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;
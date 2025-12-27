import { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Wrench, CreditCard, Bell, LogOut, Home, FileText, Settings, Crown, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import heroImage from "@/assets/hero-garage.jpg";

// Stripe products configuration
const SERVICE_PLANS = {
  basic: {
    price_id: "price_1Six4NRohlQl0pB8TtblkZcE",
    product_id: "prod_TgJhA5YNAvJK6d",
    name: "Basic Service Plan",
    price: 19.99,
    features: ["MOT reminders", "Priority booking", "10% discount on labour"],
  },
  premium: {
    price_id: "price_1SixcYRohlQl0pB80hQkwioW",
    product_id: "prod_TgKHAJPFMgfVQT",
    name: "Premium Service Plan",
    price: 39.99,
    features: ["MOT reminders", "Priority booking", "15% discount on labour", "Free vehicle health checks", "Annual service reminder"],
  },
};

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

interface Invoice {
  id: string;
  invoice_number: string;
  title: string;
  total_amount: number;
  amount_due: number;
  status: string;
  created_at: string;
  due_date: string | null;
}

interface Subscription {
  subscribed: boolean;
  product_id: string | null;
  plan_name: string | null;
  subscription_end: string | null;
}

const CustomerPortal = () => {
  const { user, signOut, loading } = useAuth();
  const { isStaff, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  // Handle URL params for success/cancel messages
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast({
        title: "Subscription Activated!",
        description: "Thank you for subscribing to our service plan.",
      });
    }
    if (searchParams.get('payment') === 'success') {
      toast({
        title: "Payment Successful!",
        description: "Your invoice has been paid. Thank you!",
      });
    }
    if (searchParams.get('canceled') === 'true' || searchParams.get('payment') === 'canceled') {
      toast({
        title: "Cancelled",
        description: "The checkout process was cancelled.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/customer-login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!roleLoading && isStaff) {
      navigate('/dashboard');
    }
  }, [isStaff, roleLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchCustomerData();
      checkSubscription();
    }
  }, [user]);

  const fetchCustomerData = async () => {
    if (!user) return;
    
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
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

      if (profileData) {
        const { data: vehiclesData } = await supabase
          .from('vehicles')
          .select('*')
          .eq('owner_id', profileData.id);
        setVehicles(vehiclesData || []);

        const { data: appointmentsData } = await supabase
          .from('appointments')
          .select('*')
          .eq('client_id', profileData.id)
          .order('appointment_date', { ascending: false });
        setAppointments(appointmentsData || []);

        // Fetch invoices for this client
        const { data: clientData } = await supabase
          .from('clients')
          .select('id')
          .eq('email', user.email)
          .single();

        if (clientData) {
          const { data: invoicesData } = await supabase
            .from('invoices')
            .select('id, invoice_number, title, total_amount, amount_due, status, created_at, due_date')
            .eq('client_id', clientData.id)
            .order('created_at', { ascending: false });
          setInvoices(invoicesData || []);
        }
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

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSubscribe = async (planKey: 'basic' | 'premium') => {
    setSubscriptionLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const plan = SERVICE_PLANS[planKey];
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: plan.price_id, mode: 'subscription' },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setSubscriptionLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handlePayInvoice = async (invoiceId: string) => {
    setPaymentLoading(invoiceId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke('create-invoice-payment', {
        body: { invoiceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Error",
        description: "Failed to start payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPaymentLoading(null);
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
      cancelled: 'destructive',
      draft: 'secondary',
      sent: 'default',
      paid: 'outline',
      overdue: 'destructive',
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
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
            {subscription?.subscribed && (
              <Badge className="bg-amber-500 text-black">
                <Crown className="h-3 w-3 mr-1" />
                {subscription.plan_name}
              </Badge>
            )}
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
              <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount_due, 0))}
              </div>
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
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Service Plans
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
                {invoices.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No invoices yet</p>
                    <p className="text-sm">Your invoices will appear here after services are completed</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{invoice.invoice_number}</p>
                          <p className="text-sm text-muted-foreground">{invoice.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(invoice.created_at), 'PP')}
                            {invoice.due_date && ` • Due: ${format(new Date(invoice.due_date), 'PP')}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold">{formatCurrency(invoice.amount_due)}</p>
                            {getStatusBadge(invoice.status)}
                          </div>
                          {invoice.status !== 'paid' && (
                            <Button 
                              onClick={() => handlePayInvoice(invoice.id)}
                              disabled={paymentLoading === invoice.id}
                            >
                              {paymentLoading === invoice.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Pay Now
                                </>
                              )}
                            </Button>
                          )}
                          {invoice.status === 'paid' && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Paid
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="space-y-6">
              {subscription?.subscribed && (
                <Card className="border-amber-500 bg-amber-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-amber-500" />
                      Your Current Plan: {subscription.plan_name}
                    </CardTitle>
                    <CardDescription>
                      {subscription.subscription_end && (
                        <>Renews on {format(new Date(subscription.subscription_end), 'PPP')}</>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleManageSubscription} disabled={subscriptionLoading}>
                      {subscriptionLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Manage Subscription
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(SERVICE_PLANS).map(([key, plan]) => {
                  const isCurrentPlan = subscription?.product_id === plan.product_id;
                  return (
                    <Card key={key} className={isCurrentPlan ? "border-amber-500 ring-2 ring-amber-500/20" : ""}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{plan.name}</CardTitle>
                          {isCurrentPlan && (
                            <Badge className="bg-amber-500 text-black">Current Plan</Badge>
                          )}
                        </div>
                        <CardDescription>
                          <span className="text-3xl font-bold text-foreground">£{plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {!isCurrentPlan && (
                          <Button 
                            className="w-full" 
                            onClick={() => handleSubscribe(key as 'basic' | 'premium')}
                            disabled={subscriptionLoading}
                          >
                            {subscriptionLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            Subscribe Now
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{profile.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{format(new Date(), 'MMMM yyyy')}</p>
                  </div>
                </div>
                {subscription?.subscribed && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Subscription</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500 text-black">
                        <Crown className="h-3 w-3 mr-1" />
                        {subscription.plan_name}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={handleManageSubscription} disabled={subscriptionLoading}>
                        Manage
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerPortal;

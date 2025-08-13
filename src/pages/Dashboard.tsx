
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from "@/assets/hero-garage.jpg";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Wrench, CreditCard, Bell, LogOut, User, Settings, Home, MessageSquare, BarChart3, Package, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import EnquiriesInbox from '@/components/dashboard/EnquiriesInbox';
import AnalyticsPanel from '@/components/dashboard/AnalyticsPanel';
import VehicleLookupTab from "@/components/dashboard/VehicleLookupTab";
import VehicleManagementTab from "@/components/dashboard/VehicleManagementTab";
import SuppliersTab from "@/components/dashboard/SuppliersTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import BusinessManagementTab from "@/components/dashboard/BusinessManagementTab";
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  user_type: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [vehicleSearchReg, setVehicleSearchReg] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Track pageviews on dashboard route (profileId optional)
  useAnalytics(profile?.id);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrCreateProfile();
      fetchDashboardData();
    }
  }, [user]);

  const fetchOrCreateProfile = async () => {
    if (!user) return;

    try {
      // Try to fetch existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (existingProfile) {
        setProfile(existingProfile);
      } else if (fetchError?.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            email: user.email || '',
            full_name: (user as any).user_metadata?.full_name || null,
            user_type: 'client'
          })
          .select('*')
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          toast({
            title: "Profile Error",
            description: "Failed to create user profile. Please contact support.",
            variant: "destructive"
          });
        } else {
          setProfile(newProfile);
        }
      } else if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        toast({
          title: "Profile Error",
          description: "Failed to load user profile. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Profile error:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });
      
      setAppointments(appointmentsData || []);

      // Mock enquiries data for now
      setEnquiries([]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleVehicleSearch = (registration: string) => {
    setVehicleSearchReg(registration);
  };

  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.appointment_date === today);
  };

  const getNewEnquiries = () => {
    // Mock data for now
    return enquiries.filter(enq => enq.status === 'new');
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const isEmployee = profile.user_type === 'employee' || profile.user_type === 'admin';

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header with background */}
      <header 
        className="relative border-b"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="relative z-10 container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">DP Automotive</h1>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-white">{profile.full_name || 'User'}</p>
              <p className="text-sm text-white/70">{profile.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs with background */}
      {isEmployee && (
        <div 
          className="relative border-b"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 gradient-hero opacity-90" />
          <div className="relative z-10 container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-9 lg:w-auto lg:grid-cols-9 bg-white/10 backdrop-blur-md border-white/20">
                <TabsTrigger value="home" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="enquiries" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Enquiries</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Business</span>
                </TabsTrigger>
                <TabsTrigger value="vehicle-lookup" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <Car className="h-4 w-4" />
                  <span className="hidden sm:inline">Vehicle Lookup</span>
                </TabsTrigger>
                <TabsTrigger value="vehicle-management" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">Vehicle Mgmt</span>
                </TabsTrigger>
                <TabsTrigger value="suppliers" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Suppliers</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative min-h-screen">
        {/* Background Image for all pages */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        {isEmployee ? (
          <div className="relative z-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="home" className="mt-0">
              <DashboardWelcome 
                profile={profile}
                todayAppointments={getTodayAppointments()}
                newEnquiries={getNewEnquiries()}
                onVehicleSearch={handleVehicleSearch}
                onNavigateToTab={handleNavigateToTab}
              />
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <EmployeeDashboard profile={profile} />
              </div>
            </TabsContent>
            
            <TabsContent value="enquiries" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <EnquiriesInbox profile={profile} />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <AnalyticsPanel />
              </div>
            </TabsContent>
            
            <TabsContent value="business" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <BusinessManagementTab />
              </div>
            </TabsContent>
            
            <TabsContent value="vehicle-lookup" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <VehicleLookupTab initialRegistration={vehicleSearchReg} />
              </div>
            </TabsContent>
            
            <TabsContent value="vehicle-management" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <VehicleManagementTab />
              </div>
            </TabsContent>
            
            <TabsContent value="suppliers" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <SuppliersTab />
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <div className="container mx-auto px-4 py-6">
                <SettingsTab profile={profile} onProfileUpdate={setProfile} />
              </div>
            </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="relative z-10 container mx-auto px-4 py-6">
            <ClientDashboard profile={profile} />
          </div>
        )}
      </main>
      
      {/* Signature Footer */}
      <div className="fixed bottom-4 right-4 z-50">
        <p className="text-xs text-white/60 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
          <span className="font-buongiorno text-sm text-white/80">PeterACurrey</span> <span className="font-montserrat font-extralight text-white/60">Signature Build by</span> <span className="font-montserrat font-extralight tracking-wider text-white/80">AVORRIA</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

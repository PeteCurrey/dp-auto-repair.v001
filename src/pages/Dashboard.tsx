
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Wrench, CreditCard, Bell, LogOut, User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import EnquiriesInbox from '@/components/dashboard/EnquiriesInbox';

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

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrCreateProfile();
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
            full_name: user.user_metadata?.full_name || null,
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
      } else {
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">DP Automotive</h1>
            <Badge variant={isEmployee ? "default" : "secondary"}>
              {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">{profile.full_name || 'User'}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {isEmployee ? (
          <>
            <EmployeeDashboard profile={profile} />
            <EnquiriesInbox profile={profile} />
          </>
        ) : (
          <ClientDashboard profile={profile} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

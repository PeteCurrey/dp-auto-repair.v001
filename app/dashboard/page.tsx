"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import ClientDashboard from '@/components/dashboard/ClientDashboard';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { isStaff, loading: roleLoading } = useUserRole();
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
      return;
    }

    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (!error) {
          setProfile(data);
        }
        setProfileLoading(false);
      };
      fetchProfile();
    } else {
      setProfileLoading(false);
    }
  }, [user, authLoading, router]);

  if (authLoading || roleLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile) return null;

  return isStaff ? <EmployeeDashboard profile={profile} /> : <ClientDashboard profile={profile} />;
}

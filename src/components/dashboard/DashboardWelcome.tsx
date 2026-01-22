import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Search, Car, Users, TrendingUp, Clock, Wrench, FileText, CreditCard, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import heroImage from "@/assets/hero-garage.jpg";
import dpLogo from "/lovable-uploads/1eaab9f6-6ddb-41c1-a642-f8a3b7cca707.png";
import NotificationsPanel from './NotificationsPanel';
import DailyJobSheet from './DailyJobSheet';

interface DashboardWelcomeProps {
  profile: any;
  todayAppointments: any[];
  newEnquiries: any[];
  onVehicleSearch: (registration: string) => void;
  onNavigateToTab: (tab: string) => void;
}

interface DashboardStats {
  totalClients: number;
  totalVehicles: number;
  monthlyRevenue: number;
  unpaidInvoices: number;
  pendingQuotes: number;
  completedJobsThisWeek: number;
  upcomingMOTs: number;
}

const DashboardWelcome = ({
  profile,
  todayAppointments,
  newEnquiries,
  onVehicleSearch,
  onNavigateToTab
}: DashboardWelcomeProps) => {
  const [searchReg, setSearchReg] = useState('');
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalVehicles: 0,
    monthlyRevenue: 0,
    unpaidInvoices: 0,
    pendingQuotes: 0,
    completedJobsThisWeek: 0,
    upcomingMOTs: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch clients count
      const { count: clientsCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });

      // Fetch vehicles count
      const { count: vehiclesCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true });

      // Fetch monthly revenue from paid invoices
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const startOfMonth = new Date(currentYear, currentMonth, 1).toISOString();
      
      const { data: paidInvoices } = await supabase
        .from('invoices')
        .select('total_amount')
        .eq('status', 'paid')
        .gte('created_at', startOfMonth);

      const monthlyRevenue = paidInvoices?.reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0;

      // Fetch unpaid invoices count
      const { count: unpaidCount } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .in('status', ['sent', 'overdue']);

      // Fetch pending quotes
      const { count: quotesCount } = await supabase
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .in('status', ['draft', 'sent']);

      // Fetch completed jobs this week
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const { count: completedCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed')
        .gte('appointment_date', startOfWeek.toISOString().split('T')[0]);

      // Fetch vehicles with MOT expiring in next 30 days
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const today = new Date().toISOString().split('T')[0];
      const { count: motCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true })
        .gte('mot_expiry', today)
        .lte('mot_expiry', thirtyDaysFromNow.toISOString().split('T')[0]);

      // Fetch recent activity (appointments and enquiries)
      const { data: recentAppointments } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalClients: clientsCount || 0,
        totalVehicles: vehiclesCount || 0,
        monthlyRevenue,
        unpaidInvoices: unpaidCount || 0,
        pendingQuotes: quotesCount || 0,
        completedJobsThisWeek: completedCount || 0,
        upcomingMOTs: motCount || 0
      });

      setRecentActivity(recentAppointments || []);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchReg.trim()) {
      onVehicleSearch(searchReg.trim());
      onNavigateToTab('vehicle-lookup');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6 animate-fade-up">
            <img 
              src={dpLogo} 
              alt="DP Automotive" 
              className="h-16 w-auto mx-auto mb-4 brightness-0 invert" 
            />
            <h1 className="text-3xl mb-2 font-extralight text-gray-300 text-left md:text-2xl">
              Welcome back, {profile.full_name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-left text-gray-400 font-extralight text-xs">
              Management Dashboard - {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Vehicle Search */}
          <div className="max-w-md mx-auto mb-8 animate-fade-up">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
              <h3 className="text-lg mb-3 font-light text-gray-300">Quick Vehicle Lookup</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter registration..." 
                  value={searchReg} 
                  onChange={e => setSearchReg(e.target.value)} 
                  onKeyPress={handleKeyPress} 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60" 
                />
                <Button onClick={handleSearch} className="gradient-primary shadow-glow">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-up">
          {/* Today's Appointments */}
          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift" 
            onClick={() => onNavigateToTab('schedule')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-white text-xs font-light">Today's Jobs</CardTitle>
              <Calendar className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-white">{todayAppointments.length}</div>
              {todayAppointments.length > 0 && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs mt-1">
                  Next: {todayAppointments[0]?.appointment_time}
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* New Enquiries */}
          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift" 
            onClick={() => onNavigateToTab('enquiries')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-white text-xs font-light">Enquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-white">{newEnquiries.length}</div>
              {newEnquiries.length > 0 && (
                <Badge variant="destructive" className="bg-red-500/20 text-red-200 border-red-400/30 text-xs mt-1">
                  Action needed
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Monthly Revenue */}
          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift"
            onClick={() => onNavigateToTab('business')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-white text-xs font-light">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-white">{formatCurrency(stats.monthlyRevenue)}</div>
              <p className="text-xs text-white/60 mt-1">Revenue</p>
            </CardContent>
          </Card>

          {/* Completed This Week */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-white text-xs font-light">This Week</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-white">{stats.completedJobsThisWeek}</div>
              <p className="text-xs text-white/60 mt-1">Jobs completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 animate-fade-up">
          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift"
            onClick={() => onNavigateToTab('vehicle-management')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <Car className="h-8 w-8 text-white/60" />
              <div>
                <div className="text-xl font-bold text-white">{stats.totalVehicles}</div>
                <p className="text-xs text-white/60">Vehicles</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift">
            <CardContent className="flex items-center gap-3 p-4">
              <Users className="h-8 w-8 text-white/60" />
              <div>
                <div className="text-xl font-bold text-white">{stats.totalClients}</div>
                <p className="text-xs text-white/60">Clients</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift"
            onClick={() => onNavigateToTab('business')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <FileText className="h-8 w-8 text-white/60" />
              <div>
                <div className="text-xl font-bold text-white">{stats.pendingQuotes}</div>
                <p className="text-xs text-white/60">Pending quotes</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift"
            onClick={() => onNavigateToTab('business')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <CreditCard className="h-8 w-8 text-orange-400/60" />
              <div>
                <div className="text-xl font-bold text-white">{stats.unpaidInvoices}</div>
                <p className="text-xs text-white/60">Unpaid invoices</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertTriangle className="h-8 w-8 text-yellow-400/60" />
              <div>
                <div className="text-xl font-bold text-white">{stats.upcomingMOTs}</div>
                <p className="text-xs text-white/60">MOTs due (30d)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up">
          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-light">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 justify-start"
                  onClick={() => onNavigateToTab('schedule')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 justify-start"
                  onClick={() => onNavigateToTab('vehicle-lookup')}
                >
                  <Car className="h-4 w-4 mr-2" />
                  Vehicle Lookup
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 justify-start"
                  onClick={() => onNavigateToTab('business')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  New Quote
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 justify-start"
                  onClick={() => onNavigateToTab('pos')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Take Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 justify-start"
                  onClick={() => onNavigateToTab('suppliers')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Parts
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 justify-start"
                  onClick={() => onNavigateToTab('analytics')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule Preview */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-light flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayAppointments.length === 0 ? (
                <p className="text-white/60 text-sm text-center py-4">No appointments scheduled for today</p>
              ) : (
                <div className="space-y-2">
                  {todayAppointments.slice(0, 4).map((apt, index) => (
                    <div 
                      key={apt.id || index} 
                      className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium text-sm">{apt.appointment_time}</span>
                        <div>
                          <p className="text-white text-sm">{apt.customer_name || 'Customer'}</p>
                          <p className="text-white/60 text-xs">{apt.service_type}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          apt.status === 'confirmed' 
                            ? 'bg-green-500/20 text-green-300' 
                            : apt.status === 'in-progress'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {apt.status}
                      </Badge>
                    </div>
                  ))}
                  {todayAppointments.length > 4 && (
                    <Button 
                      variant="ghost" 
                      className="w-full text-white/60 hover:text-white hover:bg-white/10 text-sm"
                      onClick={() => onNavigateToTab('schedule')}
                    >
                      View all {todayAppointments.length} appointments
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <NotificationsPanel onNavigateToTab={onNavigateToTab} />
        </div>

        {/* Daily Job Sheet */}
        <div className="mt-6 animate-fade-up">
          <DailyJobSheet />
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Search, Car, Users, TrendingUp } from 'lucide-react';
import heroImage from "@/assets/hero-garage.jpg";
import dpLogo from "/lovable-uploads/1eaab9f6-6ddb-41c1-a642-f8a3b7cca707.png";
interface DashboardWelcomeProps {
  profile: any;
  todayAppointments: any[];
  newEnquiries: any[];
  onVehicleSearch: (registration: string) => void;
  onNavigateToTab: (tab: string) => void;
}
const DashboardWelcome = ({
  profile,
  todayAppointments,
  newEnquiries,
  onVehicleSearch,
  onNavigateToTab
}: DashboardWelcomeProps) => {
  const [searchReg, setSearchReg] = useState('');
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
  return <div className="min-h-[calc(100vh-8rem)] relative">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="mb-8 animate-fade-up">
            <img src={dpLogo} alt="DP Automotive" className="h-20 w-auto mx-auto mb-4 brightness-0 invert" />
            <h1 className="text-4xl mb-2 font-extralight text-gray-300 text-left md:text-2xl">
              Welcome back, {profile.full_name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-left text-gray-300 font-extralight text-xs">
              Management Dashboard - {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Vehicle Search */}
          <div className="max-w-md mx-auto mb-12 animate-fade-up">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-xl mb-4 font-light text-gray-300">
                Quick Vehicle Lookup
              </h3>
              <div className="flex gap-2">
                <Input placeholder="Enter registration..." value={searchReg} onChange={e => setSearchReg(e.target.value)} onKeyPress={handleKeyPress} className="bg-white/20 border-white/30 text-white placeholder:text-white/60" />
                <Button onClick={handleSearch} className="gradient-primary shadow-glow">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
          {/* Today's Appointments */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift" onClick={() => onNavigateToTab('schedule')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-sm font-light">
                Today's Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {todayAppointments.length}
              </div>
              <p className="text-xs text-white/70">
                {todayAppointments.length === 1 ? 'appointment' : 'appointments'} scheduled
              </p>
              {todayAppointments.length > 0 && <div className="mt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Next: {todayAppointments[0]?.appointment_time}
                  </Badge>
                </div>}
            </CardContent>
          </Card>

          {/* New Enquiries */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover-lift" onClick={() => onNavigateToTab('enquiries')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-sm font-light">
                New Enquiries
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {newEnquiries.length}
              </div>
              <p className="text-xs text-white/70">
                Awaiting response
              </p>
              {newEnquiries.length > 0 && <div className="mt-2">
                  <Badge variant="destructive" className="bg-red-500/20 text-red-200 border-red-400/30">
                    Action required
                  </Badge>
                </div>}
            </CardContent>
          </Card>

          {/* Total Clients */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-sm font-light">
                Active Clients
              </CardTitle>
              <Users className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                --
              </div>
              <p className="text-xs text-white/70">
                Registered clients
              </p>
            </CardContent>
          </Card>

          {/* Monthly Revenue */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-sm font-light">
                This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                --
              </div>
              <p className="text-xs text-white/70">
                Revenue tracking
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center animate-fade-up">
          <h3 className="text-xl mb-6 font-light text-gray-300">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={() => onNavigateToTab('schedule')}>
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={() => onNavigateToTab('vehicle-lookup')}>
              <Car className="h-4 w-4 mr-2" />
              Vehicle Lookup
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={() => onNavigateToTab('suppliers')}>
              <Search className="h-4 w-4 mr-2" />
              Find Parts
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default DashboardWelcome;
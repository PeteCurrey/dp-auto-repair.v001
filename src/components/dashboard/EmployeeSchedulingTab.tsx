"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Users, CalendarOff, Plus, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Employee {
  id: string;
  full_name: string | null;
  email: string;
  user_type: string;
}

interface EmployeeSchedule {
  id: string;
  employee_id: string;
  day_of_week: number;
  start_time: string | null;
  end_time: string | null;
  is_available: boolean;
}

interface TimeOffRequest {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  approved: boolean;
  employee?: Employee;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const EmployeeSchedulingTab = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [schedules, setSchedules] = useState<EmployeeSchedule[]>([]);
  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTimeOffDialog, setShowTimeOffDialog] = useState(false);
  const [newTimeOff, setNewTimeOff] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
    reason: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch employees (staff/admin users)
      const { data: employeesData, error: employeesError } = await supabase
        .from('profiles')
        .select('*')
        .in('user_type', ['employee', 'admin']);

      if (employeesError) throw employeesError;
      setEmployees(employeesData || []);

      if (employeesData && employeesData.length > 0 && !selectedEmployee) {
        setSelectedEmployee(employeesData[0].id);
      }

      // Fetch all schedules
      const { data: schedulesData, error: schedulesError } = await supabase
        .from('employee_schedules')
        .select('*');

      if (schedulesError) throw schedulesError;
      setSchedules(schedulesData || []);

      // Fetch time off requests
      const { data: timeOffData, error: timeOffError } = await supabase
        .from('employee_time_off')
        .select('*')
        .order('start_date', { ascending: true });

      if (timeOffError) throw timeOffError;
      setTimeOffRequests(timeOffData || []);

    } catch (error: any) {
      console.error('Error fetching scheduling data:', error);
      toast({
        title: "Error",
        description: "Failed to load scheduling data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeSchedule = (employeeId: string, dayOfWeek: number): EmployeeSchedule | undefined => {
    return schedules.find(s => s.employee_id === employeeId && s.day_of_week === dayOfWeek);
  };

  const updateSchedule = async (employeeId: string, dayOfWeek: number, field: string, value: any) => {
    try {
      const existingSchedule = getEmployeeSchedule(employeeId, dayOfWeek);

      if (existingSchedule) {
        const { error } = await supabase
          .from('employee_schedules')
          .update({ [field]: value })
          .eq('id', existingSchedule.id);

        if (error) throw error;

        setSchedules(prev => prev.map(s => 
          s.id === existingSchedule.id ? { ...s, [field]: value } : s
        ));
      } else {
        const newSchedule = {
          employee_id: employeeId,
          day_of_week: dayOfWeek,
          start_time: field === 'start_time' ? value : '09:00',
          end_time: field === 'end_time' ? value : '17:00',
          is_available: field === 'is_available' ? value : true
        };

        const { data, error } = await supabase
          .from('employee_schedules')
          .insert(newSchedule)
          .select()
          .single();

        if (error) throw error;
        setSchedules(prev => [...prev, data]);
      }

      toast({
        title: "Schedule Updated",
        description: "Employee schedule has been updated."
      });
    } catch (error: any) {
      console.error('Error updating schedule:', error);
      toast({
        title: "Error",
        description: "Failed to update schedule.",
        variant: "destructive"
      });
    }
  };

  const submitTimeOffRequest = async () => {
    if (!newTimeOff.employee_id || !newTimeOff.start_date || !newTimeOff.end_date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase
        .from('employee_time_off')
        .insert({
          employee_id: newTimeOff.employee_id,
          start_date: newTimeOff.start_date,
          end_date: newTimeOff.end_date,
          reason: newTimeOff.reason || null,
          approved: true // Admin is adding so auto-approve
        });

      if (error) throw error;

      toast({
        title: "Time Off Added",
        description: "Time off has been scheduled."
      });

      setShowTimeOffDialog(false);
      setNewTimeOff({ employee_id: '', start_date: '', end_date: '', reason: '' });
      fetchData();
    } catch (error: any) {
      console.error('Error adding time off:', error);
      toast({
        title: "Error",
        description: "Failed to add time off.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const approveTimeOff = async (requestId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('employee_time_off')
        .update({ approved })
        .eq('id', requestId);

      if (error) throw error;

      setTimeOffRequests(prev => prev.map(r => 
        r.id === requestId ? { ...r, approved } : r
      ));

      toast({
        title: approved ? "Approved" : "Rejected",
        description: `Time off request has been ${approved ? 'approved' : 'rejected'}.`
      });
    } catch (error: any) {
      console.error('Error updating time off:', error);
      toast({
        title: "Error",
        description: "Failed to update time off request.",
        variant: "destructive"
      });
    }
  };

  const deleteTimeOff = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('employee_time_off')
        .delete()
        .eq('id', requestId);

      if (error) throw error;

      setTimeOffRequests(prev => prev.filter(r => r.id !== requestId));

      toast({
        title: "Deleted",
        description: "Time off has been removed."
      });
    } catch (error: any) {
      console.error('Error deleting time off:', error);
      toast({
        title: "Error",
        description: "Failed to delete time off.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded w-1/3"></div>
          <div className="h-64 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  const selectedEmployeeData = employees.find(e => e.id === selectedEmployee);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-primary-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{employees.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Upcoming Time Off</CardTitle>
            <CalendarOff className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {timeOffRequests.filter(r => r.approved && new Date(r.end_date) >= new Date()).length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {timeOffRequests.filter(r => !r.approved).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedules" className="w-full">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="schedules" className="data-[state=active]:bg-white/20 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Weekly Schedules
          </TabsTrigger>
          <TabsTrigger value="timeoff" className="data-[state=active]:bg-white/20 text-white">
            <CalendarOff className="h-4 w-4 mr-2" />
            Time Off
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedules" className="space-y-4">
          <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Employee Schedules</CardTitle>
                  <CardDescription className="text-white/80">
                    Set working hours for each employee
                  </CardDescription>
                </div>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="w-[200px] bg-white/10 border-white/30 text-white">
                    <User className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.full_name || emp.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {selectedEmployeeData && (
                <div className="space-y-4">
                  {DAYS_OF_WEEK.map((day, index) => {
                    const schedule = getEmployeeSchedule(selectedEmployee, index);
                    const isAvailable = schedule?.is_available ?? (index !== 0 && index !== 6);

                    return (
                      <div key={day} className="flex items-center gap-4 p-4 border border-white/20 rounded-lg">
                        <div className="w-24">
                          <span className="font-medium text-white">{day}</span>
                        </div>
                        <Switch
                          checked={isAvailable}
                          onCheckedChange={(checked) => updateSchedule(selectedEmployee, index, 'is_available', checked)}
                        />
                        <span className="text-sm text-white/70 w-16">
                          {isAvailable ? 'Working' : 'Off'}
                        </span>
                        {isAvailable && (
                          <>
                            <div className="flex items-center gap-2">
                              <Label className="text-white/70">Start</Label>
                              <Input
                                type="time"
                                value={schedule?.start_time || '09:00'}
                                onChange={(e) => updateSchedule(selectedEmployee, index, 'start_time', e.target.value)}
                                className="w-32 bg-white/10 border-white/30 text-white"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label className="text-white/70">End</Label>
                              <Input
                                type="time"
                                value={schedule?.end_time || '17:00'}
                                onChange={(e) => updateSchedule(selectedEmployee, index, 'end_time', e.target.value)}
                                className="w-32 bg-white/10 border-white/30 text-white"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeoff" className="space-y-4">
          <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Time Off & Holidays</CardTitle>
                  <CardDescription className="text-white/80">
                    Manage employee holidays and time off
                  </CardDescription>
                </div>
                <Dialog open={showTimeOffDialog} onOpenChange={setShowTimeOffDialog}>
                  <DialogTrigger asChild>
                    <Button className="gradient-primary shadow-glow">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Time Off
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Add Time Off</DialogTitle>
                      <DialogDescription className="text-white/70">
                        Schedule time off for an employee
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Employee</Label>
                        <Select 
                          value={newTimeOff.employee_id} 
                          onValueChange={(v) => setNewTimeOff(p => ({ ...p, employee_id: v }))}
                        >
                          <SelectTrigger className="bg-white/10 border-white/30">
                            <SelectValue placeholder="Select employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map(emp => (
                              <SelectItem key={emp.id} value={emp.id}>
                                {emp.full_name || emp.email}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={newTimeOff.start_date}
                            onChange={(e) => setNewTimeOff(p => ({ ...p, start_date: e.target.value }))}
                            className="bg-white/10 border-white/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            value={newTimeOff.end_date}
                            onChange={(e) => setNewTimeOff(p => ({ ...p, end_date: e.target.value }))}
                            className="bg-white/10 border-white/30"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Reason (optional)</Label>
                        <Textarea
                          value={newTimeOff.reason}
                          onChange={(e) => setNewTimeOff(p => ({ ...p, reason: e.target.value }))}
                          placeholder="e.g., Annual leave, Training, etc."
                          className="bg-white/10 border-white/30"
                        />
                      </div>
                      <Button 
                        onClick={submitTimeOffRequest} 
                        className="w-full gradient-primary shadow-glow"
                        disabled={saving}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? 'Saving...' : 'Add Time Off'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {timeOffRequests.length > 0 ? (
                <div className="space-y-3">
                  {timeOffRequests.map(request => {
                    const employee = employees.find(e => e.id === request.employee_id);
                    const isPast = new Date(request.end_date) < new Date();
                    
                    return (
                      <div 
                        key={request.id} 
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          isPast ? 'border-white/10 opacity-60' : 'border-white/30'
                        }`}
                      >
                        <div>
                          <p className="font-medium text-white">
                            {employee?.full_name || employee?.email || 'Unknown'}
                          </p>
                          <p className="text-sm text-white/70">
                            {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
                          </p>
                          {request.reason && (
                            <p className="text-xs text-white/60 mt-1">{request.reason}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={request.approved ? 'default' : 'secondary'}>
                            {request.approved ? 'Approved' : 'Pending'}
                          </Badge>
                          {!request.approved && (
                            <Button
                              size="sm"
                              onClick={() => approveTimeOff(request.id, true)}
                              className="gradient-primary"
                            >
                              Approve
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteTimeOff(request.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-white/70 text-center py-8">No time off scheduled</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeSchedulingTab;

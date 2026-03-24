"use client";

import { useState, useEffect, useMemo, DragEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Calendar, ChevronLeft, ChevronRight, Users, Clock, Wrench, GripVertical, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval, isSameDay, parseISO, addDays } from 'date-fns';

interface Technician {
  id: string;
  full_name: string | null;
  email: string;
}

interface Appointment {
  id: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: string;
  technician_id: string | null;
  customer_name: string | null;
  vehicles: {
    make: string;
    model: string;
    registration: string;
  } | null;
}

const TechnicianWorkloadView = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedTechnician, setSelectedTechnician] = useState<string>('all');
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [loading, setLoading] = useState(true);
  const [draggedAppointment, setDraggedAppointment] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{ techId: string | null; date: string } | null>(null);
  const [conflictDialog, setConflictDialog] = useState<{
    open: boolean;
    appointmentId: string;
    targetTechId: string | null;
    targetDate: Date;
    conflicts: Appointment[];
  } | null>(null);
  const { toast } = useToast();

  const weekDays = useMemo(() => {
    return eachDayOfInterval({
      start: currentWeekStart,
      end: addDays(currentWeekStart, 6)
    });
  }, [currentWeekStart]);

  useEffect(() => {
    fetchData();
  }, [currentWeekStart]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch technicians (employees and admins)
      const { data: techData, error: techError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('user_type', ['employee', 'admin'])
        .order('full_name');

      if (techError) throw techError;
      setTechnicians(techData || []);

      // Fetch appointments for the current week
      const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
      const { data: apptData, error: apptError } = await supabase
        .from('appointments')
        .select(`
          id,
          service_type,
          appointment_date,
          appointment_time,
          duration_minutes,
          status,
          technician_id,
          customer_name,
          vehicles (make, model, registration)
        `)
        .gte('appointment_date', format(currentWeekStart, 'yyyy-MM-dd'))
        .lte('appointment_date', format(weekEnd, 'yyyy-MM-dd'))
        .not('status', 'eq', 'cancelled')
        .order('appointment_time');

      if (apptError) throw apptError;
      setAppointments(apptData || []);

    } catch (error: any) {
      console.error('Error fetching workload data:', error);
      toast({
        title: "Error",
        description: "Failed to load technician workload data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, appointmentId: string) => {
    e.dataTransfer.setData('appointmentId', appointmentId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedAppointment(appointmentId);
  };

  const handleDragEnd = () => {
    setDraggedAppointment(null);
    setDropTarget(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, techId: string | null, date: Date) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTarget({ techId, date: format(date, 'yyyy-MM-dd') });
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  // Check for time overlaps between two appointments
  const checkTimeOverlap = (apt1: Appointment, apt2: Appointment) => {
    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const start1 = parseTime(apt1.appointment_time);
    const end1 = start1 + apt1.duration_minutes;
    const start2 = parseTime(apt2.appointment_time);
    const end2 = start2 + apt2.duration_minutes;
    
    return start1 < end2 && start2 < end1;
  };

  // Find conflicts for a given appointment being moved
  const findConflicts = (appointment: Appointment, targetTechId: string | null, targetDateStr: string) => {
    if (!targetTechId) return []; // Unassigned has no conflicts
    
    return appointments.filter(apt => 
      apt.id !== appointment.id &&
      apt.technician_id === targetTechId &&
      apt.appointment_date === targetDateStr &&
      apt.status !== 'cancelled' &&
      apt.status !== 'completed' &&
      checkTimeOverlap(appointment, apt)
    );
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>, targetTechId: string | null, targetDate: Date) => {
    e.preventDefault();
    const appointmentId = e.dataTransfer.getData('appointmentId');
    
    if (!appointmentId) return;

    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    // Check if anything actually changed
    const targetDateStr = format(targetDate, 'yyyy-MM-dd');
    if (appointment.technician_id === targetTechId && appointment.appointment_date === targetDateStr) {
      setDraggedAppointment(null);
      setDropTarget(null);
      return;
    }

    // Check for conflicts
    const conflicts = findConflicts(appointment, targetTechId, targetDateStr);
    
    if (conflicts.length > 0) {
      setConflictDialog({
        open: true,
        appointmentId,
        targetTechId,
        targetDate,
        conflicts
      });
      setDraggedAppointment(null);
      setDropTarget(null);
      return;
    }

    await executeReassignment(appointmentId, targetTechId, targetDate);
  };

  const executeReassignment = async (appointmentId: string, targetTechId: string | null, targetDate: Date) => {
    const targetDateStr = format(targetDate, 'yyyy-MM-dd');
    
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ 
          technician_id: targetTechId,
          appointment_date: targetDateStr
        })
        .eq('id', appointmentId);

      if (error) throw error;

      // Update local state
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, technician_id: targetTechId, appointment_date: targetDateStr }
          : apt
      ));

      const techName = targetTechId 
        ? technicians.find(t => t.id === targetTechId)?.full_name || 'technician'
        : 'Unassigned';

      toast({
        title: "Appointment reassigned",
        description: `Moved to ${techName} on ${format(targetDate, 'EEE, MMM d')}`,
      });

    } catch (error: any) {
      console.error('Error reassigning appointment:', error);
      toast({
        title: "Error",
        description: "Failed to reassign appointment.",
        variant: "destructive"
      });
    }

    setDraggedAppointment(null);
    setDropTarget(null);
    setConflictDialog(null);
  };

  const handleConfirmConflict = () => {
    if (conflictDialog) {
      executeReassignment(
        conflictDialog.appointmentId,
        conflictDialog.targetTechId,
        conflictDialog.targetDate
      );
    }
  };

  const getAppointmentsForDay = (technicianId: string | null, date: Date) => {
    return appointments.filter(apt => {
      const aptDate = parseISO(apt.appointment_date);
      const matchesTech = technicianId === null 
        ? apt.technician_id === null 
        : apt.technician_id === technicianId;
      return matchesTech && isSameDay(aptDate, date);
    });
  };

  const getTotalHoursForTechnician = (technicianId: string) => {
    const techAppointments = appointments.filter(apt => apt.technician_id === technicianId);
    const totalMinutes = techAppointments.reduce((sum, apt) => sum + apt.duration_minutes, 0);
    return (totalMinutes / 60).toFixed(1);
  };

  const getAppointmentCountForTechnician = (technicianId: string) => {
    return appointments.filter(apt => apt.technician_id === technicianId).length;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-500/80';
      case 'confirmed':
        return 'bg-green-500/80';
      case 'in_progress':
        return 'bg-yellow-500/80';
      case 'completed':
        return 'bg-gray-500/60';
      default:
        return 'bg-primary/80';
    }
  };

  const getUnassignedAppointments = () => {
    return appointments.filter(apt => !apt.technician_id);
  };

  const filteredTechnicians = useMemo(() => {
    if (selectedTechnician === 'all') return technicians;
    return technicians.filter(t => t.id === selectedTechnician);
  }, [technicians, selectedTechnician]);

  if (loading) {
    return (
      <Card className="bg-white/20 backdrop-blur-md border-white/30">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted/30 rounded w-1/4"></div>
            <div className="h-64 bg-muted/30 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const unassignedAppointments = getUnassignedAppointments();

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                Technician Workload
              </CardTitle>
              <CardDescription className="text-white/80">
                View and manage staff appointments for the week
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
                <SelectTrigger className="w-48 bg-white/10 border-white/30 text-white">
                  <SelectValue placeholder="All Technicians" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Technicians</SelectItem>
                  {technicians.map(tech => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.full_name || tech.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Week Navigation */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeekStart(subWeeks(currentWeekStart, 1))}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <h3 className="text-lg font-semibold text-white">
              {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Workload Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {technicians.map(tech => (
          <Card key={tech.id} className="bg-white/20 backdrop-blur-md border-white/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {tech.full_name || tech.email}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary-glow" />
                  <span className="text-2xl font-bold">{getAppointmentCountForTechnician(tech.id)}</span>
                  <span className="text-sm text-white/70">appts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-glow" />
                  <span className="text-lg font-semibold">{getTotalHoursForTechnician(tech.id)}h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Unassigned Appointments Alert */}
      {unassignedAppointments.length > 0 && (
        <Card className="bg-yellow-500/20 backdrop-blur-md border-yellow-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-100 flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              {unassignedAppointments.length} Unassigned Appointment{unassignedAppointments.length > 1 ? 's' : ''} This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {unassignedAppointments.map(apt => (
                <Badge key={apt.id} variant="outline" className="bg-white/10 border-yellow-500/50 text-yellow-100">
                  {format(parseISO(apt.appointment_date), 'EEE')} {apt.appointment_time} - {apt.service_type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Drag & Drop Instructions */}
      <Card className="bg-primary/10 backdrop-blur-md border-primary/30">
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <GripVertical className="h-4 w-4" />
            <span>Drag appointments to reassign them to different technicians or days</span>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 overflow-hidden">
        <CardContent className="p-0">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-white/20">
            <div className="p-3 text-center border-r border-white/20 bg-white/5">
              <div className="text-xs text-white/60 uppercase">Technician</div>
            </div>
            {weekDays.map(day => (
              <div
                key={day.toISOString()}
                className={`p-3 text-center border-r border-white/20 last:border-r-0 ${
                  isSameDay(day, new Date()) ? 'bg-primary/20' : ''
                }`}
              >
                <div className="text-xs text-white/60 uppercase">{format(day, 'EEE')}</div>
                <div className={`text-lg font-semibold ${isSameDay(day, new Date()) ? 'text-primary-glow' : 'text-white'}`}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Technician Rows */}
          {filteredTechnicians.map(tech => (
            <div key={tech.id} className="grid grid-cols-8 border-b border-white/20 last:border-b-0">
              {/* Technician Name Column */}
              <div className="p-2 border-r border-white/20 bg-white/5 flex items-center">
                <span className="text-sm font-medium text-white truncate">
                  {tech.full_name || tech.email}
                </span>
              </div>
              
              {/* Day Columns */}
              {weekDays.map(day => {
                const dayAppointments = getAppointmentsForDay(tech.id, day);
                const isDropTarget = dropTarget?.techId === tech.id && dropTarget?.date === format(day, 'yyyy-MM-dd');
                
                return (
                  <div
                    key={`${tech.id}-${day.toISOString()}`}
                    className={`min-h-24 p-2 border-r border-white/10 last:border-r-0 transition-colors ${
                      isSameDay(day, new Date()) ? 'bg-primary/5' : ''
                    } ${isDropTarget ? 'bg-primary/30 ring-2 ring-primary ring-inset' : ''}`}
                    onDragOver={(e) => handleDragOver(e, tech.id, day)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, tech.id, day)}
                  >
                    {dayAppointments.length === 0 ? (
                      <div className="text-xs text-white/30 text-center mt-6">
                        {isDropTarget ? 'Drop here' : 'No appointments'}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {dayAppointments.map(apt => (
                          <div
                            key={apt.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, apt.id)}
                            onDragEnd={handleDragEnd}
                            className={`${getStatusColor(apt.status)} rounded p-1.5 text-xs cursor-grab active:cursor-grabbing hover:opacity-90 transition-all ${
                              draggedAppointment === apt.id ? 'opacity-50 scale-95' : ''
                            }`}
                            title={`${apt.service_type} - ${apt.customer_name || 'Customer'}\n${apt.vehicles?.registration || ''}\nDrag to reassign`}
                          >
                            <div className="flex items-center gap-1">
                              <GripVertical className="h-3 w-3 text-white/60 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white truncate">
                                  {apt.appointment_time.slice(0, 5)}
                                </div>
                                <div className="text-white/80 truncate">
                                  {apt.service_type}
                                </div>
                                {apt.vehicles && (
                                  <div className="text-white/60 truncate">
                                    {apt.vehicles.registration}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Unassigned Row */}
          {getUnassignedAppointments().length > 0 && (
            <div className="grid grid-cols-8 border-t border-yellow-500/30 bg-yellow-500/10">
              <div className="p-2 border-r border-white/20 bg-yellow-500/20 flex items-center">
                <span className="text-sm font-medium text-yellow-100 truncate flex items-center gap-1">
                  <Wrench className="h-3 w-3" />
                  Unassigned
                </span>
              </div>
              
              {weekDays.map(day => {
                const dayAppointments = getAppointmentsForDay(null, day);
                const isDropTarget = dropTarget?.techId === null && dropTarget?.date === format(day, 'yyyy-MM-dd');
                
                return (
                  <div
                    key={`unassigned-${day.toISOString()}`}
                    className={`min-h-24 p-2 border-r border-white/10 last:border-r-0 transition-colors ${
                      isDropTarget ? 'bg-primary/30 ring-2 ring-primary ring-inset' : ''
                    }`}
                    onDragOver={(e) => handleDragOver(e, null, day)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, null, day)}
                  >
                    {dayAppointments.length === 0 ? (
                      <div className="text-xs text-white/30 text-center mt-6">
                        {isDropTarget ? 'Drop here' : '-'}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {dayAppointments.map(apt => (
                          <div
                            key={apt.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, apt.id)}
                            onDragEnd={handleDragEnd}
                            className={`bg-yellow-500/60 rounded p-1.5 text-xs cursor-grab active:cursor-grabbing hover:opacity-90 transition-all ${
                              draggedAppointment === apt.id ? 'opacity-50 scale-95' : ''
                            }`}
                            title={`${apt.service_type} - ${apt.customer_name || 'Customer'}\n${apt.vehicles?.registration || ''}\nDrag to assign`}
                          >
                            <div className="flex items-center gap-1">
                              <GripVertical className="h-3 w-3 text-white/60 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white truncate">
                                  {apt.appointment_time.slice(0, 5)}
                                </div>
                                <div className="text-white/80 truncate">
                                  {apt.service_type}
                                </div>
                                {apt.vehicles && (
                                  <div className="text-white/60 truncate">
                                    {apt.vehicles.registration}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed List View */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Weekly Appointments by Technician</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredTechnicians.map(tech => {
              const techAppointments = appointments.filter(apt => apt.technician_id === tech.id);
              if (techAppointments.length === 0) return null;

              return (
                <div key={tech.id} className="space-y-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {tech.full_name || tech.email}
                    <Badge variant="secondary" className="ml-2">
                      {techAppointments.length} appointment{techAppointments.length > 1 ? 's' : ''}
                    </Badge>
                  </h4>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {techAppointments
                      .sort((a, b) => `${a.appointment_date} ${a.appointment_time}`.localeCompare(`${b.appointment_date} ${b.appointment_time}`))
                      .map(apt => (
                        <div
                          key={apt.id}
                          className="p-3 rounded-lg bg-white/10 border border-white/20"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-white">
                              {format(parseISO(apt.appointment_date), 'EEE, MMM d')}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {apt.status}
                            </Badge>
                          </div>
                          <div className="text-white/80 text-sm">
                            {apt.appointment_time.slice(0, 5)} - {apt.service_type}
                          </div>
                          {apt.vehicles && (
                            <div className="text-white/60 text-xs mt-1">
                              {apt.vehicles.make} {apt.vehicles.model} ({apt.vehicles.registration})
                            </div>
                          )}
                          {apt.customer_name && (
                            <div className="text-white/60 text-xs">
                              {apt.customer_name}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conflict Warning Dialog */}
      <AlertDialog open={conflictDialog?.open} onOpenChange={(open) => !open && setConflictDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Scheduling Conflict Detected
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  This appointment overlaps with {conflictDialog?.conflicts.length === 1 ? 'another appointment' : `${conflictDialog?.conflicts.length} other appointments`} for this technician:
                </p>
                <div className="space-y-2 p-3 bg-muted rounded-md">
                  {conflictDialog?.conflicts.map(conflict => (
                    <div key={conflict.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{conflict.appointment_time.slice(0, 5)} - {conflict.service_type}</span>
                      <Badge variant="outline">{conflict.duration_minutes} min</Badge>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to proceed? This may result in scheduling conflicts.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmConflict} className="bg-yellow-600 hover:bg-yellow-700">
              Proceed Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TechnicianWorkloadView;

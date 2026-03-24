"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Calendar, Clock, Loader2, CalendarOff } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { format, parseISO, isBefore, startOfDay } from 'date-fns';

interface BlockedTime {
  id: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  all_day: boolean | null;
  reason: string | null;
  created_at: string;
}

const BlockedTimesTab = () => {
  const { toast } = useToast();
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlockedTime | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    start_time: '09:00',
    end_time: '17:00',
    all_day: true,
    reason: ''
  });

  useEffect(() => {
    fetchBlockedTimes();
  }, []);

  const fetchBlockedTimes = async () => {
    try {
      const { data, error } = await supabase
        .from('blocked_times')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setBlockedTimes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load blocked times",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      date: '',
      start_time: '09:00',
      end_time: '17:00',
      all_day: true,
      reason: ''
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: BlockedTime) => {
    setEditingItem(item);
    setFormData({
      date: item.date,
      start_time: item.start_time || '09:00',
      end_time: item.end_time || '17:00',
      all_day: item.all_day ?? true,
      reason: item.reason || ''
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.date) {
      toast({ title: "Error", description: "Date is required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const blockedData = {
        date: formData.date,
        start_time: formData.all_day ? null : formData.start_time,
        end_time: formData.all_day ? null : formData.end_time,
        all_day: formData.all_day,
        reason: formData.reason.trim() || null
      };

      if (editingItem) {
        const { error } = await supabase
          .from('blocked_times')
          .update(blockedData)
          .eq('id', editingItem.id);
        if (error) throw error;
        toast({ title: "Success", description: "Blocked time updated" });
      } else {
        const { error } = await supabase
          .from('blocked_times')
          .insert(blockedData);
        if (error) throw error;
        toast({ title: "Success", description: "Time blocked successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchBlockedTimes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blocked_times')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Blocked time removed" });
      fetchBlockedTimes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete",
        variant: "destructive"
      });
    }
  };

  const isPast = (dateStr: string) => {
    return isBefore(parseISO(dateStr), startOfDay(new Date()));
  };

  const today = new Date().toISOString().split('T')[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const upcomingBlocked = blockedTimes.filter(bt => !isPast(bt.date));
  const pastBlocked = blockedTimes.filter(bt => isPast(bt.date));

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarOff className="h-5 w-5" />
            Blocked Times
          </CardTitle>
          <CardDescription className="text-white/70">
            Block dates/times for holidays, maintenance, or breaks
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" /> Block Time
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Blocked Time' : 'Block Time'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update blocked time details' : 'Block a date or time range from bookings'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="all_day">Block Entire Day</Label>
                <Switch
                  id="all_day"
                  checked={formData.all_day}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, all_day: checked }))}
                />
              </div>
              
              {!formData.all_day && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_time">Start Time</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_time">End Time</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason (Optional)</Label>
                <Input
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="e.g. Bank Holiday, Annual Leave, Training"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingItem ? 'Update' : 'Block'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {blockedTimes.length === 0 ? (
          <div className="text-center py-8 text-white/70">
            <CalendarOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No blocked times configured.</p>
            <p className="text-sm mt-2">Block dates for holidays or maintenance to prevent bookings.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Upcoming Blocked Times */}
            {upcomingBlocked.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-white/80 mb-3">Upcoming</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-white/80">Date</TableHead>
                        <TableHead className="text-white/80">Time</TableHead>
                        <TableHead className="text-white/80">Reason</TableHead>
                        <TableHead className="text-white/80 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingBlocked.map((item) => (
                        <TableRow key={item.id} className="border-white/10">
                          <TableCell className="text-white font-medium">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-white/60" />
                              {format(parseISO(item.date), 'EEE, d MMM yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.all_day ? (
                              <Badge variant="secondary" className="bg-red-500/20 text-red-300">
                                All Day
                              </Badge>
                            ) : (
                              <span className="text-white/80 flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {item.start_time} - {item.end_time}
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {item.reason || '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(item)}
                                className="text-white/80 hover:text-white hover:bg-white/10"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Blocked Time</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will allow bookings on {format(parseISO(item.date), 'd MMM yyyy')} again.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600">
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            
            {/* Past Blocked Times */}
            {pastBlocked.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-white/50 mb-3">Past</h3>
                <div className="overflow-x-auto opacity-60">
                  <Table>
                    <TableBody>
                      {pastBlocked.slice(0, 5).map((item) => (
                        <TableRow key={item.id} className="border-white/10">
                          <TableCell className="text-white/60">
                            {format(parseISO(item.date), 'd MMM yyyy')}
                          </TableCell>
                          <TableCell className="text-white/60">
                            {item.all_day ? 'All Day' : `${item.start_time} - ${item.end_time}`}
                          </TableCell>
                          <TableCell className="text-white/50">
                            {item.reason || '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-white/40 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Record</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Remove this past blocked time from records?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(item.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockedTimesTab;

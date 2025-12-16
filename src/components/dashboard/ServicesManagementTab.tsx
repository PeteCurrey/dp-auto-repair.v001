import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, GripVertical, Clock, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface BookableService {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number | null;
  price_from: boolean | null;
  category: string | null;
  is_active: boolean | null;
  online_booking_enabled: boolean | null;
  max_daily_slots: number | null;
  sort_order: number | null;
}

const categories = [
  'MOT & Servicing',
  'Repairs',
  'Diagnostics',
  'Performance',
  'Tyres & Brakes',
  'Electrical',
  'Other'
];

const ServicesManagementTab = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<BookableService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<BookableService | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_minutes: '60',
    price: '',
    price_from: false,
    category: '',
    is_active: true,
    online_booking_enabled: true,
    max_daily_slots: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('bookable_services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration_minutes: '60',
      price: '',
      price_from: false,
      category: '',
      is_active: true,
      online_booking_enabled: true,
      max_daily_slots: ''
    });
    setEditingService(null);
  };

  const openEditDialog = (service: BookableService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      duration_minutes: service.duration_minutes.toString(),
      price: service.price?.toString() || '',
      price_from: service.price_from || false,
      category: service.category || '',
      is_active: service.is_active ?? true,
      online_booking_enabled: service.online_booking_enabled ?? true,
      max_daily_slots: service.max_daily_slots?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Service name is required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const serviceData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        duration_minutes: parseInt(formData.duration_minutes),
        price: formData.price ? parseFloat(formData.price) : null,
        price_from: formData.price_from,
        category: formData.category || null,
        is_active: formData.is_active,
        online_booking_enabled: formData.online_booking_enabled,
        max_daily_slots: formData.max_daily_slots ? parseInt(formData.max_daily_slots) : null
      };

      if (editingService) {
        const { error } = await supabase
          .from('bookable_services')
          .update(serviceData)
          .eq('id', editingService.id);
        if (error) throw error;
        toast({ title: "Success", description: "Service updated successfully" });
      } else {
        const { error } = await supabase
          .from('bookable_services')
          .insert({ ...serviceData, sort_order: services.length });
        if (error) throw error;
        toast({ title: "Success", description: "Service created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save service",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bookable_services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Service deleted successfully" });
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete service",
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (service: BookableService) => {
    try {
      const { error } = await supabase
        .from('bookable_services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id);

      if (error) throw error;
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive"
      });
    }
  };

  const toggleOnlineBooking = async (service: BookableService) => {
    try {
      const { error } = await supabase
        .from('bookable_services')
        .update({ online_booking_enabled: !service.online_booking_enabled })
        .eq('id', service.id);

      if (error) throw error;
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Bookable Services</CardTitle>
          <CardDescription className="text-white/70">
            Manage services available for online booking
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'Update service details' : 'Create a new bookable service'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Full Service"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the service..."
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Select 
                    value={formData.duration_minutes} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duration_minutes: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="180">3 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="300">5 hours</SelectItem>
                      <SelectItem value="480">Full day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="price_from">"From" pricing (variable cost)</Label>
                <Switch
                  id="price_from"
                  checked={formData.price_from}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, price_from: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Service Active</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="online_booking">Available for Online Booking</Label>
                <Switch
                  id="online_booking"
                  checked={formData.online_booking_enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, online_booking_enabled: checked }))}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingService ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-8 text-white/70">
            <p>No services configured yet.</p>
            <p className="text-sm mt-2">Add your first service to enable online booking.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white/80">Service</TableHead>
                  <TableHead className="text-white/80">Category</TableHead>
                  <TableHead className="text-white/80">Duration</TableHead>
                  <TableHead className="text-white/80">Price</TableHead>
                  <TableHead className="text-white/80 text-center">Active</TableHead>
                  <TableHead className="text-white/80 text-center">Online</TableHead>
                  <TableHead className="text-white/80 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id} className="border-white/10">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{service.name}</p>
                        {service.description && (
                          <p className="text-sm text-white/60 truncate max-w-xs">{service.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {service.category && (
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {service.category}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-white/80">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDuration(service.duration_minutes)}
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {service.price 
                        ? `${service.price_from ? 'From ' : ''}£${service.price.toFixed(2)}`
                        : '-'
                      }
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={service.is_active ?? false}
                        onCheckedChange={() => toggleActive(service)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={service.online_booking_enabled ?? false}
                        onCheckedChange={() => toggleOnlineBooking(service)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(service)}
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
                              <AlertDialogTitle>Delete Service</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{service.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(service.id)} className="bg-red-500 hover:bg-red-600">
                                Delete
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
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesManagementTab;

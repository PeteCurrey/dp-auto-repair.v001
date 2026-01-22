import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  CheckCircle, 
  Clock,
  X,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'booking' | 'enquiry' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

interface NotificationsPanelProps {
  onNavigateToTab?: (tab: string) => void;
}

const NotificationsPanel = ({ onNavigateToTab }: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    setupRealtimeSubscription();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Fetch recent appointments (bookings)
      const { data: appointments } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch recent contact submissions (enquiries)
      const { data: enquiries } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch recent paid invoices (payments)
      const { data: payments } = await supabase
        .from('invoices')
        .select('*, clients(full_name)')
        .eq('status', 'paid')
        .order('updated_at', { ascending: false })
        .limit(10);

      const allNotifications: Notification[] = [];

      // Transform appointments to notifications
      appointments?.forEach(apt => {
        allNotifications.push({
          id: `booking-${apt.id}`,
          type: 'booking',
          title: 'New Booking',
          message: `${apt.customer_name || 'Customer'} booked ${apt.service_type}`,
          timestamp: apt.created_at,
          read: false,
          data: apt
        });
      });

      // Transform enquiries to notifications
      enquiries?.forEach(enq => {
        allNotifications.push({
          id: `enquiry-${enq.id}`,
          type: 'enquiry',
          title: 'New Enquiry',
          message: `${enq.full_name} enquired about ${enq.service_needed || 'services'}`,
          timestamp: enq.created_at,
          read: enq.status !== 'new',
          data: enq
        });
      });

      // Transform payments to notifications
      payments?.forEach(pay => {
        const clientName = (pay.clients as any)?.full_name || 'Customer';
        allNotifications.push({
          id: `payment-${pay.id}`,
          type: 'payment',
          title: 'Payment Received',
          message: `${clientName} paid £${pay.total_amount} for ${pay.title}`,
          timestamp: pay.updated_at,
          read: true,
          data: pay
        });
      });

      // Sort by timestamp
      allNotifications.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setNotifications(allNotifications.slice(0, 15));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const appointmentsChannel = supabase
      .channel('notifications-appointments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'appointments' },
        (payload) => {
          const apt = payload.new as any;
          const newNotification: Notification = {
            id: `booking-${apt.id}`,
            type: 'booking',
            title: 'New Booking',
            message: `${apt.customer_name || 'Customer'} booked ${apt.service_type}`,
            timestamp: apt.created_at,
            read: false,
            data: apt
          };
          setNotifications(prev => [newNotification, ...prev].slice(0, 15));
        }
      )
      .subscribe();

    const contactChannel = supabase
      .channel('notifications-contact')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
        (payload) => {
          const enq = payload.new as any;
          const newNotification: Notification = {
            id: `enquiry-${enq.id}`,
            type: 'enquiry',
            title: 'New Enquiry',
            message: `${enq.full_name} enquired about ${enq.service_needed || 'services'}`,
            timestamp: enq.created_at,
            read: false,
            data: enq
          };
          setNotifications(prev => [newNotification, ...prev].slice(0, 15));
        }
      )
      .subscribe();

    const invoicesChannel = supabase
      .channel('notifications-invoices')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'invoices', filter: 'status=eq.paid' },
        (payload) => {
          const pay = payload.new as any;
          const newNotification: Notification = {
            id: `payment-${pay.id}`,
            type: 'payment',
            title: 'Payment Received',
            message: `Payment of £${pay.total_amount} received`,
            timestamp: pay.updated_at,
            read: false,
            data: pay
          };
          setNotifications(prev => [newNotification, ...prev].slice(0, 15));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(appointmentsChannel);
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(invoicesChannel);
    };
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4" />;
      case 'enquiry':
        return <MessageSquare className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'enquiry':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'payment':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      default:
        return 'bg-white/20 text-white border-white/30';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm font-light flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchNotifications}
              className="h-7 w-7 p-0 text-white/60 hover:text-white hover:bg-white/10"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-7 w-7 p-0 text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-4 pb-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-5 w-5 animate-spin text-white/40" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-white/40">
              <CheckCircle className="h-8 w-8 mb-2" />
              <p className="text-sm">All caught up!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    notification.read 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-white/10 border-white/20'
                  } hover:bg-white/15`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded ${getTypeColor(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm font-medium">
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-white/60 text-xs line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5 text-white/40 text-xs">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;

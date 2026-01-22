import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Printer, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Car, 
  Wrench,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Appointment {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: string;
  notes: string | null;
  booking_reference: string | null;
  vehicles?: {
    registration: string;
    make: string;
    model: string;
    year: number;
    colour: string | null;
  } | null;
}

const DailyJobSheet = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          vehicles (
            registration,
            make,
            model,
            year,
            colour
          )
        `)
        .eq('appointment_date', dateStr)
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Daily Job Sheet - ${format(selectedDate, 'dd/MM/yyyy')}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .header h1 {
              color: #2563eb;
              font-size: 24px;
              margin-bottom: 5px;
            }
            .header .date {
              font-size: 16px;
              color: #666;
            }
            .header .company {
              font-size: 12px;
              color: #999;
              margin-top: 5px;
            }
            .summary {
              display: flex;
              justify-content: space-around;
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .summary-item {
              text-align: center;
            }
            .summary-item .value {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
            }
            .summary-item .label {
              font-size: 12px;
              color: #666;
            }
            .job-card {
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              margin-bottom: 15px;
              page-break-inside: avoid;
            }
            .job-header {
              background: #f1f5f9;
              padding: 12px 15px;
              border-bottom: 1px solid #e2e8f0;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .job-time {
              font-size: 18px;
              font-weight: bold;
              color: #1e293b;
            }
            .job-ref {
              font-size: 12px;
              color: #64748b;
              background: #e2e8f0;
              padding: 4px 8px;
              border-radius: 4px;
            }
            .job-content {
              padding: 15px;
            }
            .job-row {
              display: flex;
              margin-bottom: 10px;
            }
            .job-label {
              width: 100px;
              font-weight: bold;
              color: #64748b;
              font-size: 12px;
            }
            .job-value {
              flex: 1;
              color: #1e293b;
              font-size: 14px;
            }
            .vehicle-box {
              background: #f8fafc;
              padding: 10px;
              border-radius: 6px;
              margin-top: 10px;
            }
            .vehicle-reg {
              font-size: 16px;
              font-weight: bold;
              color: #1e293b;
              letter-spacing: 1px;
            }
            .vehicle-details {
              font-size: 12px;
              color: #64748b;
              margin-top: 5px;
            }
            .notes-box {
              background: #fefce8;
              border: 1px solid #fde047;
              padding: 10px;
              border-radius: 6px;
              margin-top: 10px;
              font-size: 12px;
            }
            .notes-label {
              font-weight: bold;
              color: #92400e;
              margin-bottom: 5px;
            }
            .checkbox-section {
              margin-top: 15px;
              padding-top: 15px;
              border-top: 1px dashed #e2e8f0;
            }
            .checkbox-row {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
            }
            .checkbox {
              width: 18px;
              height: 18px;
              border: 2px solid #cbd5e1;
              border-radius: 3px;
              margin-right: 10px;
            }
            .checkbox-label {
              font-size: 12px;
              color: #64748b;
            }
            .signature-section {
              margin-top: 15px;
              padding-top: 15px;
              border-top: 1px solid #e2e8f0;
              display: flex;
              gap: 30px;
            }
            .signature-box {
              flex: 1;
            }
            .signature-line {
              border-bottom: 1px solid #cbd5e1;
              height: 40px;
              margin-bottom: 5px;
            }
            .signature-label {
              font-size: 10px;
              color: #94a3b8;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #e2e8f0;
              font-size: 10px;
              color: #94a3b8;
            }
            .status {
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 11px;
              font-weight: bold;
              text-transform: uppercase;
            }
            .status-scheduled { background: #e2e8f0; color: #475569; }
            .status-confirmed { background: #dcfce7; color: #166534; }
            .status-in-progress { background: #dbeafe; color: #1e40af; }
            .status-completed { background: #d1fae5; color: #065f46; }
            @media print {
              body { padding: 10px; }
              .job-card { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>DAILY JOB SHEET</h1>
            <div class="date">${format(selectedDate, 'EEEE, d MMMM yyyy')}</div>
            <div class="company">DP Auto - Professional Automotive Services</div>
          </div>
          
          <div class="summary">
            <div class="summary-item">
              <div class="value">${appointments.length}</div>
              <div class="label">Total Jobs</div>
            </div>
            <div class="summary-item">
              <div class="value">${appointments.filter(a => a.status === 'confirmed').length}</div>
              <div class="label">Confirmed</div>
            </div>
            <div class="summary-item">
              <div class="value">${appointments.reduce((sum, a) => sum + (a.duration_minutes || 60), 0) / 60}h</div>
              <div class="label">Est. Hours</div>
            </div>
          </div>
          
          ${appointments.map(apt => `
            <div class="job-card">
              <div class="job-header">
                <div class="job-time">${apt.appointment_time}</div>
                <div style="display: flex; gap: 10px; align-items: center;">
                  <span class="status status-${apt.status}">${apt.status}</span>
                  ${apt.booking_reference ? `<span class="job-ref">${apt.booking_reference}</span>` : ''}
                </div>
              </div>
              <div class="job-content">
                <div class="job-row">
                  <div class="job-label">Customer:</div>
                  <div class="job-value">${apt.customer_name || 'Not specified'}</div>
                </div>
                <div class="job-row">
                  <div class="job-label">Phone:</div>
                  <div class="job-value">${apt.customer_phone || '-'}</div>
                </div>
                <div class="job-row">
                  <div class="job-label">Email:</div>
                  <div class="job-value">${apt.customer_email || '-'}</div>
                </div>
                <div class="job-row">
                  <div class="job-label">Service:</div>
                  <div class="job-value"><strong>${apt.service_type}</strong></div>
                </div>
                <div class="job-row">
                  <div class="job-label">Duration:</div>
                  <div class="job-value">${apt.duration_minutes} minutes</div>
                </div>
                
                ${apt.vehicles ? `
                  <div class="vehicle-box">
                    <div class="vehicle-reg">${apt.vehicles.registration}</div>
                    <div class="vehicle-details">
                      ${apt.vehicles.year} ${apt.vehicles.make} ${apt.vehicles.model}
                      ${apt.vehicles.colour ? ` - ${apt.vehicles.colour}` : ''}
                    </div>
                  </div>
                ` : ''}
                
                ${apt.notes ? `
                  <div class="notes-box">
                    <div class="notes-label">Notes:</div>
                    ${apt.notes}
                  </div>
                ` : ''}
                
                <div class="checkbox-section">
                  <div class="checkbox-row">
                    <div class="checkbox"></div>
                    <div class="checkbox-label">Customer contacted / confirmed</div>
                  </div>
                  <div class="checkbox-row">
                    <div class="checkbox"></div>
                    <div class="checkbox-label">Job completed</div>
                  </div>
                  <div class="checkbox-row">
                    <div class="checkbox"></div>
                    <div class="checkbox-label">Invoice created</div>
                  </div>
                </div>
                
                <div class="signature-section">
                  <div class="signature-box">
                    <div class="signature-line"></div>
                    <div class="signature-label">Technician Signature</div>
                  </div>
                  <div class="signature-box">
                    <div class="signature-line"></div>
                    <div class="signature-label">Time Completed</div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
          
          ${appointments.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: #94a3b8;">
              No appointments scheduled for this date
            </div>
          ` : ''}
          
          <div class="footer">
            Generated on ${format(new Date(), 'dd/MM/yyyy HH:mm')} | DP Auto Management System
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-white/20 text-white border-white/30';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-white text-sm font-light flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Daily Job Sheet
          </CardTitle>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {format(selectedDate, 'dd MMM yyyy')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button
              onClick={handlePrint}
              size="sm"
              className="gradient-primary shadow-glow"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-white/60 text-sm">
            {appointments.length} job{appointments.length !== 1 ? 's' : ''} scheduled
          </div>
          <div className="text-white/60 text-sm">
            Est. {appointments.reduce((sum, a) => sum + (a.duration_minutes || 60), 0) / 60}h total
          </div>
        </div>

        <div ref={printRef} className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-white/40">Loading...</div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              No appointments for this date
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-white font-bold text-lg">
                      {apt.appointment_time}
                    </div>
                    <Badge className={`${getStatusColor(apt.status)} text-xs`}>
                      {apt.status}
                    </Badge>
                  </div>
                  {apt.booking_reference && (
                    <span className="text-white/40 text-xs">
                      {apt.booking_reference}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <User className="h-3.5 w-3.5 text-white/40" />
                      {apt.customer_name || 'No name'}
                    </div>
                    {apt.customer_phone && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Phone className="h-3.5 w-3.5 text-white/40" />
                        {apt.customer_phone}
                      </div>
                    )}
                    {apt.customer_email && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Mail className="h-3.5 w-3.5 text-white/40" />
                        {apt.customer_email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Wrench className="h-3.5 w-3.5 text-white/40" />
                      {apt.service_type}
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Clock className="h-3.5 w-3.5 text-white/40" />
                      {apt.duration_minutes} mins
                    </div>
                    {apt.vehicles && (
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Car className="h-3.5 w-3.5 text-white/40" />
                        <span className="font-mono">{apt.vehicles.registration}</span>
                        <span className="text-white/60">
                          {apt.vehicles.make} {apt.vehicles.model}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {apt.notes && (
                  <div className="mt-3 p-2 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-200/80 text-xs">
                    <strong>Notes:</strong> {apt.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyJobSheet;

"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, FileText, CreditCard, TrendingUp, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface BusinessMetrics {
  totalClients: number;
  totalQuotes: number;
  totalInvoices: number;
  pendingQuotes: number;
  overdueInvoices: number;
  monthlyRevenue: number;
  quoteConversionRate: number;
  averageQuoteValue: number;
  outstandingAmount: number;
}

const fetchBusinessMetrics = async (): Promise<BusinessMetrics> => {
  const [clientsRes, quotesRes, invoicesRes] = await Promise.all([
    supabase.from("clients").select("id"),
    supabase.from("quotes").select("id, status, total_amount, created_at"),
    supabase.from("invoices").select("id, status, total_amount, amount_due, created_at, due_date")
  ]);

  if (clientsRes.error) throw clientsRes.error;
  if (quotesRes.error) throw quotesRes.error;
  if (invoicesRes.error) throw invoicesRes.error;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // Calculate metrics
  const totalClients = clientsRes.data.length;
  const totalQuotes = quotesRes.data.length;
  const totalInvoices = invoicesRes.data.length;
  
  const pendingQuotes = quotesRes.data.filter(q => q.status === 'draft' || q.status === 'sent').length;
  const overdueInvoices = invoicesRes.data.filter(inv => {
    const dueDate = new Date(inv.due_date);
    return inv.status !== 'paid' && dueDate < new Date();
  }).length;
  
  const monthlyRevenue = invoicesRes.data
    .filter(inv => {
      const invDate = new Date(inv.created_at);
      return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear && inv.status === 'paid';
    })
    .reduce((sum, inv) => sum + Number(inv.total_amount), 0);
  
  const convertedQuotes = quotesRes.data.filter(q => q.status === 'converted').length;
  const quoteConversionRate = totalQuotes > 0 ? (convertedQuotes / totalQuotes) * 100 : 0;
  
  const averageQuoteValue = totalQuotes > 0 
    ? quotesRes.data.reduce((sum, q) => sum + Number(q.total_amount), 0) / totalQuotes 
    : 0;
  
  const outstandingAmount = invoicesRes.data
    .filter(inv => inv.status !== 'paid')
    .reduce((sum, inv) => sum + Number(inv.amount_due || inv.total_amount), 0);

  return {
    totalClients,
    totalQuotes,
    totalInvoices,
    pendingQuotes,
    overdueInvoices,
    monthlyRevenue,
    quoteConversionRate,
    averageQuoteValue,
    outstandingAmount
  };
};

const LiveBusinessDashboard = () => {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null);
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["business-metrics"],
    queryFn: fetchBusinessMetrics,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    if (data) {
      setMetrics(data);
    }
  }, [data]);

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('business-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, () => refetch())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quotes' }, () => refetch())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => refetch())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  if (isLoading || !metrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-white/20 backdrop-blur-md border-white/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-white/20 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Clients */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalClients}</div>
            <p className="text-xs text-white/70">Active clients</p>
          </CardContent>
        </Card>

        {/* Total Quotes */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalQuotes}</div>
            <p className="text-xs text-white/70">
              {metrics.pendingQuotes} pending
            </p>
          </CardContent>
        </Card>

        {/* Total Invoices */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Invoices</CardTitle>
            <CreditCard className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalInvoices}</div>
            <p className="text-xs text-white/70">
              {metrics.overdueInvoices} overdue
            </p>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.monthlyRevenue)}</div>
            <p className="text-xs text-white/70">This month</p>
          </CardContent>
        </Card>

        {/* Quote Conversion Rate */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.quoteConversionRate.toFixed(1)}%</div>
            <p className="text-xs text-white/70">Quote to invoice</p>
          </CardContent>
        </Card>

        {/* Average Quote Value */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Avg Quote Value</CardTitle>
            <FileText className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.averageQuoteValue)}</div>
            <p className="text-xs text-white/70">Per quote</p>
          </CardContent>
        </Card>

        {/* Outstanding Amount */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Outstanding</CardTitle>
            <AlertCircle className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.outstandingAmount)}</div>
            <p className="text-xs text-white/70">To be collected</p>
          </CardContent>
        </Card>

        {/* Alert Badge for Overdue */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.overdueInvoices > 0 && (
                <Badge variant="destructive" className="bg-red-500/20 text-red-200 border-red-300/30">
                  {metrics.overdueInvoices} Overdue Invoice{metrics.overdueInvoices !== 1 ? 's' : ''}
                </Badge>
              )}
              {metrics.pendingQuotes > 0 && (
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200 border-yellow-300/30">
                  {metrics.pendingQuotes} Pending Quote{metrics.pendingQuotes !== 1 ? 's' : ''}
                </Badge>
              )}
              {metrics.overdueInvoices === 0 && metrics.pendingQuotes === 0 && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-200 border-green-300/30">
                  All Good ✓
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time indicator */}
      <div className="flex justify-end">
        <Badge variant="secondary" className="bg-green-500/20 text-green-200 border-green-300/30">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          Live Data
        </Badge>
      </div>
    </div>
  );
};

export default LiveBusinessDashboard;
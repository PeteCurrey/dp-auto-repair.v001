import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Receipt, FileText, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FinancialStats {
  totalRevenue: number;
  monthlyRevenue: number;
  outstandingInvoices: number;
  overduelnvoices: number;
  totalQuotes: number;
  conversionRate: number;
  avgInvoiceValue: number;
  recentTransactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'invoice' | 'quote';
  number: string;
  title: string;
  amount: number;
  status: string;
  created_at: string;
  client_name?: string;
}

const FinancialDashboard = () => {
  const [stats, setStats] = useState<FinancialStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    outstandingInvoices: 0,
    overduelnvoices: 0,
    totalQuotes: 0,
    conversionRate: 0,
    avgInvoiceValue: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);

      // Fetch invoices data
      const { data: invoices, error: invoicesError } = await supabase
        .from("invoices")
        .select(`
          *,
          clients:client_id (
            business_name,
            contact_person,
            email
          )
        `);

      if (invoicesError) throw invoicesError;

      // Fetch quotes data
      const { data: quotes, error: quotesError } = await supabase
        .from("quotes")
        .select(`
          *,
          clients:client_id (
            business_name,
            contact_person,
            email
          )
        `);

      if (quotesError) throw quotesError;

      // Calculate financial metrics
      const totalRevenue = invoices
        ?.filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyRevenue = invoices
        ?.filter(inv => {
          const invDate = new Date(inv.created_at);
          return invDate.getMonth() === currentMonth && 
                 invDate.getFullYear() === currentYear &&
                 inv.status === 'paid';
        })
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0;

      const outstandingInvoices = invoices
        ?.filter(inv => inv.status === 'sent')
        .reduce((sum, inv) => sum + Number(inv.amount_due), 0) || 0;

      const overduelnvoices = invoices
        ?.filter(inv => inv.status === 'overdue')
        .reduce((sum, inv) => sum + Number(inv.amount_due), 0) || 0;

      const totalQuotes = quotes?.length || 0;
      const acceptedQuotes = quotes?.filter(q => q.status === 'accepted' || q.status === 'converted').length || 0;
      const conversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;

      const paidInvoices = invoices?.filter(inv => inv.status === 'paid') || [];
      const avgInvoiceValue = paidInvoices.length > 0 
        ? paidInvoices.reduce((sum, inv) => sum + Number(inv.total_amount), 0) / paidInvoices.length 
        : 0;

      // Recent transactions (last 10)
      const recentInvoices = invoices
        ?.slice(0, 5)
        .map(inv => ({
          id: inv.id,
          type: 'invoice' as const,
          number: inv.invoice_number,
          title: inv.title,
          amount: Number(inv.total_amount),
          status: inv.status,
          created_at: inv.created_at,
          client_name: inv.clients?.business_name || inv.clients?.contact_person || inv.clients?.email,
        })) || [];

      const recentQuotes = quotes
        ?.slice(0, 5)
        .map(quote => ({
          id: quote.id,
          type: 'quote' as const,
          number: quote.quote_number,
          title: quote.title,
          amount: Number(quote.total_amount),
          status: quote.status,
          created_at: quote.created_at,
          client_name: quote.clients?.business_name || quote.clients?.contact_person || quote.clients?.email,
        })) || [];

      const recentTransactions = [...recentInvoices, ...recentQuotes]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);

      setStats({
        totalRevenue,
        monthlyRevenue,
        outstandingInvoices,
        overduelnvoices,
        totalQuotes,
        conversionRate,
        avgInvoiceValue,
        recentTransactions,
      });
    } catch (error) {
      console.error("Error fetching financial data:", error);
      toast.error("Failed to load financial data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusBadge = (status: string, type: 'invoice' | 'quote') => {
    if (type === 'invoice') {
      const config = {
        draft: { variant: "secondary" as const, label: "Draft" },
        sent: { variant: "default" as const, label: "Sent" },
        paid: { variant: "default" as const, label: "Paid" },
        overdue: { variant: "destructive" as const, label: "Overdue" },
        cancelled: { variant: "outline" as const, label: "Cancelled" },
      };
      return config[status as keyof typeof config] || config.draft;
    } else {
      const config = {
        draft: { variant: "secondary" as const, label: "Draft" },
        sent: { variant: "default" as const, label: "Sent" },
        accepted: { variant: "default" as const, label: "Accepted" },
        rejected: { variant: "destructive" as const, label: "Rejected" },
        converted: { variant: "outline" as const, label: "Converted" },
      };
      return config[status as keyof typeof config] || config.draft;
    }
  };

  if (loading) {
    return <div>Loading financial data...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Financial Overview</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              All time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
            <div className="text-xs text-muted-foreground mt-2">
              Current month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.outstandingInvoices)}</div>
            <div className="text-xs text-muted-foreground mt-2">
              Awaiting payment
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatCurrency(stats.overduelnvoices)}</div>
            <div className="text-xs text-muted-foreground mt-2">
              Requires attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quote Conversion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-2">
              {stats.totalQuotes} total quotes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Invoice Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.avgInvoiceValue)}</div>
            <div className="text-xs text-muted-foreground mt-2">
              Per paid invoice
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentTransactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No recent transactions</p>
            ) : (
              stats.recentTransactions.map((transaction) => {
                const statusConfig = getStatusBadge(transaction.status, transaction.type);
                return (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{transaction.number}</span>
                        <Badge variant={statusConfig.variant} className="text-xs">
                          {statusConfig.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground uppercase">
                          {transaction.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.title}</p>
                      {transaction.client_name && (
                        <p className="text-xs text-muted-foreground">{transaction.client_name}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(transaction.amount)}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(transaction.created_at)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDashboard;
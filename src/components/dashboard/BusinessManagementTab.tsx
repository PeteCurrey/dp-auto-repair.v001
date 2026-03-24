"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, FileText, DollarSign, Receipt } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import QuotesList from "./QuotesList";
import QuoteForm from "./QuoteForm";
import InvoicesList from "./InvoicesList";
import InvoiceForm from "./InvoiceForm";
import FinancialDashboard from "./FinancialDashboard";

interface BusinessStats {
  totalQuotes: number;
  activeQuotes: number;
  totalInvoices: number;
  unpaidInvoices: number;
  monthlyRevenue: number;
  outstandingAmount: number;
}

const BusinessManagementTab = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<BusinessStats>({
    totalQuotes: 0,
    activeQuotes: 0,
    totalInvoices: 0,
    unpaidInvoices: 0,
    monthlyRevenue: 0,
    outstandingAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState<string | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<string | null>(null);

  useEffect(() => {
    fetchBusinessStats();
  }, []);

  const fetchBusinessStats = async () => {
    try {
      setLoading(true);

      // Fetch quotes stats
      const { data: quotes, error: quotesError } = await supabase
        .from("quotes")
        .select("status, total_amount");

      if (quotesError) throw quotesError;

      // Fetch invoices stats
      const { data: invoices, error: invoicesError } = await supabase
        .from("invoices")
        .select("status, total_amount, amount_due, created_at");

      if (invoicesError) throw invoicesError;

      // Calculate stats
      const totalQuotes = quotes?.length || 0;
      const activeQuotes = quotes?.filter(q => q.status === 'sent' || q.status === 'draft').length || 0;
      const totalInvoices = invoices?.length || 0;
      const unpaidInvoices = invoices?.filter(inv => inv.status === 'sent' || inv.status === 'overdue').length || 0;
      
      // Calculate monthly revenue (current month)
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

      const outstandingAmount = invoices
        ?.filter(inv => inv.status === 'sent' || inv.status === 'overdue')
        .reduce((sum, inv) => sum + Number(inv.amount_due), 0) || 0;

      setStats({
        totalQuotes,
        activeQuotes,
        totalInvoices,
        unpaidInvoices,
        monthlyRevenue,
        outstandingAmount,
      });
    } catch (error) {
      console.error("Error fetching business stats:", error);
      toast.error("Failed to load business statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteCreated = () => {
    setShowQuoteForm(false);
    setEditingQuote(null);
    fetchBusinessStats();
  };

  const handleInvoiceCreated = () => {
    setShowInvoiceForm(false);
    setEditingInvoice(null);
    fetchBusinessStats();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  if (showQuoteForm) {
    return (
      <QuoteForm
        quoteId={editingQuote}
        onSave={handleQuoteCreated}
        onCancel={() => {
          setShowQuoteForm(false);
          setEditingQuote(null);
        }}
      />
    );
  }

  if (showInvoiceForm) {
    return (
      <InvoiceForm
        invoiceId={editingInvoice}
        onSave={handleInvoiceCreated}
        onCancel={() => {
          setShowInvoiceForm(false);
          setEditingInvoice(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Business Management</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowQuoteForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Quote
          </Button>
          <Button
            onClick={() => setShowInvoiceForm(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80">Dashboard</TabsTrigger>
          <TabsTrigger value="quotes" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80">Quotes</TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80">Invoices</TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Quotes</CardTitle>
                <FileText className="h-4 w-4 text-white/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalQuotes}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">{stats.activeQuotes} active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Invoices</CardTitle>
                <Receipt className="h-4 w-4 text-white/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalInvoices}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="destructive" className="bg-red-500/20 text-red-200">{stats.unpaidInvoices} unpaid</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-white/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(stats.monthlyRevenue)}</div>
                <div className="text-xs text-white/60 mt-2">
                  Current month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Outstanding Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-white/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(stats.outstandingAmount)}</div>
                <div className="text-xs text-white/60 mt-2">
                  Awaiting payment
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quotes">
          <QuotesList
            onEdit={(quoteId) => {
              setEditingQuote(quoteId);
              setShowQuoteForm(true);
            }}
            onRefresh={fetchBusinessStats}
          />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoicesList
            onEdit={(invoiceId) => {
              setEditingInvoice(invoiceId);
              setShowInvoiceForm(true);
            }}
            onRefresh={fetchBusinessStats}
          />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessManagementTab;
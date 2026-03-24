"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Download } from "lucide-react";
import { generateInvoicePDF } from "./PDFGenerator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoice_number: string;
  title: string;
  status: string;
  total_amount: number;
  amount_due: number;
  created_at: string;
  due_date?: string;
  client?: {
    business_name?: string;
    contact_person?: string;
    email: string;
  };
  vehicle?: {
    registration: string;
    make: string;
    model: string;
  };
}

interface InvoicesListProps {
  onEdit: (invoiceId: string) => void;
  onRefresh: () => void;
}

const InvoicesList = ({ onEdit, onRefresh }: InvoicesListProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          clients:client_id (
            business_name,
            contact_person,
            email
          ),
          vehicles:vehicle_id (
            registration,
            make,
            model
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const updateInvoiceStatus = async (invoiceId: string, status: string) => {
    try {
      const updateData: any = { status };

      // If marking as paid, update payment info
      if (status === "paid") {
        updateData.amount_paid = updateData.total_amount;
        updateData.amount_due = 0;
        updateData.payment_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from("invoices")
        .update(updateData)
        .eq("id", invoiceId);

      if (error) throw error;

      toast.success("Invoice status updated");
      fetchInvoices();
      onRefresh();
    } catch (error) {
      console.error("Error updating invoice status:", error);
      toast.error("Failed to update invoice status");
    }
  };

  const deleteInvoice = async (invoiceId: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      // Delete invoice items first
      await supabase.from("invoice_items").delete().eq("invoice_id", invoiceId);
      
      // Delete invoice
      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoiceId);

      if (error) throw error;

      toast.success("Invoice deleted successfully");
      fetchInvoices();
      onRefresh();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Failed to delete invoice");
    }
  };

  const handleDownloadPDF = async (invoice: Invoice) => {
    try {
      // Fetch invoice items
      const { data: items, error: itemsError } = await supabase
        .from('invoice_items')
        .select('*')
        .eq('invoice_id', invoice.id);

      if (itemsError) throw itemsError;

      const pdfData = {
        invoice_number: invoice.invoice_number,
        title: invoice.title,
        description: '',
        client: invoice.client || { email: '', business_name: '', contact_person: '' },
        vehicle: invoice.vehicle ? { ...invoice.vehicle, year: 2020 } : undefined,
        items: items || [],
        subtotal: invoice.total_amount * 0.83, // Rough calculation
        tax_rate: 20,
        tax_amount: invoice.total_amount * 0.17,
        total_amount: invoice.total_amount,
        amount_due: invoice.amount_due,
        due_date: invoice.due_date,
        notes: '',
        created_at: invoice.created_at,
        status: invoice.status
      };

      await generateInvoicePDF(pdfData);
      toast.success("PDF generated successfully");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate PDF");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, label: "Draft" },
      sent: { variant: "default" as const, label: "Sent" },
      paid: { variant: "default" as const, label: "Paid" },
      overdue: { variant: "destructive" as const, label: "Overdue" },
      cancelled: { variant: "outline" as const, label: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No invoices found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.title}</TableCell>
                  <TableCell>
                    {invoice.client?.business_name || invoice.client?.contact_person || invoice.client?.email || "No client"}
                  </TableCell>
                  <TableCell>
                    {invoice.vehicle ? 
                      `${invoice.vehicle.registration} - ${invoice.vehicle.make} ${invoice.vehicle.model}` : 
                      "No vehicle"
                    }
                  </TableCell>
                  <TableCell>
                    <Select
                      value={invoice.status}
                      onValueChange={(value) => updateInvoiceStatus(invoice.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                  <TableCell>
                    {invoice.amount_due > 0 ? formatCurrency(invoice.amount_due) : "-"}
                  </TableCell>
                  <TableCell>{formatDate(invoice.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(invoice.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(invoice)}
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteInvoice(invoice.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoicesList;
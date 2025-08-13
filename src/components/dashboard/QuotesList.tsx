import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, FileText, Receipt } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Quote {
  id: string;
  quote_number: string;
  title: string;
  status: string;
  total_amount: number;
  created_at: string;
  valid_until?: string;
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

interface QuotesListProps {
  onEdit: (quoteId: string) => void;
  onRefresh: () => void;
}

const QuotesList = ({ onEdit, onRefresh }: QuotesListProps) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("quotes")
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
      setQuotes(data || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (quoteId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("quotes")
        .update({ status })
        .eq("id", quoteId);

      if (error) throw error;

      toast.success("Quote status updated");
      fetchQuotes();
      onRefresh();
    } catch (error) {
      console.error("Error updating quote status:", error);
      toast.error("Failed to update quote status");
    }
  };

  const convertToInvoice = async (quoteId: string) => {
    try {
      const { data, error } = await supabase.rpc("convert_quote_to_invoice", {
        quote_uuid: quoteId,
      });

      if (error) throw error;

      toast.success("Quote converted to invoice successfully");
      fetchQuotes();
      onRefresh();
    } catch (error) {
      console.error("Error converting quote to invoice:", error);
      toast.error("Failed to convert quote to invoice");
    }
  };

  const deleteQuote = async (quoteId: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;

    try {
      // Delete quote items first
      await supabase.from("quote_items").delete().eq("quote_id", quoteId);
      
      // Delete quote
      const { error } = await supabase
        .from("quotes")
        .delete()
        .eq("id", quoteId);

      if (error) throw error;

      toast.success("Quote deleted successfully");
      fetchQuotes();
      onRefresh();
    } catch (error) {
      console.error("Error deleting quote:", error);
      toast.error("Failed to delete quote");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, label: "Draft" },
      sent: { variant: "default" as const, label: "Sent" },
      accepted: { variant: "default" as const, label: "Accepted" },
      rejected: { variant: "destructive" as const, label: "Rejected" },
      converted: { variant: "outline" as const, label: "Converted" },
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
    return <div>Loading quotes...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quotes</CardTitle>
      </CardHeader>
      <CardContent>
        {quotes.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No quotes found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote #</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.quote_number}</TableCell>
                  <TableCell>{quote.title}</TableCell>
                  <TableCell>
                    {quote.client?.business_name || quote.client?.contact_person || quote.client?.email || "No client"}
                  </TableCell>
                  <TableCell>
                    {quote.vehicle ? 
                      `${quote.vehicle.registration} - ${quote.vehicle.make} ${quote.vehicle.model}` : 
                      "No vehicle"
                    }
                  </TableCell>
                  <TableCell>
                    <Select
                      value={quote.status}
                      onValueChange={(value) => updateQuoteStatus(quote.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{formatCurrency(quote.total_amount)}</TableCell>
                  <TableCell>{formatDate(quote.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(quote.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {quote.status === "accepted" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => convertToInvoice(quote.id)}
                          title="Convert to Invoice"
                        >
                          <Receipt className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuote(quote.id)}
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

export default QuotesList;
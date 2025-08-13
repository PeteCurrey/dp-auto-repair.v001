import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ClientDialog from "./ClientDialog";
import VehicleDialog from "./VehicleDialog";

interface QuoteItem {
  id?: string;
  item_type: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  part_number?: string;
  supplier?: string;
}

interface Client {
  id: string;
  business_name?: string;
  contact_person?: string;
  email: string;
}

interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
}

interface QuoteFormProps {
  quoteId?: string | null;
  onSave: () => void;
  onCancel: () => void;
}

const QuoteForm = ({ quoteId, onSave, onCancel }: QuoteFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client_id: "",
    vehicle_id: "",
    notes: "",
    valid_until: "",
  });
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchVehicles();
    if (quoteId) {
      fetchQuote();
    }
  }, [quoteId]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("id, business_name, contact_person, email")
        .order("business_name");

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
    }
  };

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("id, registration, make, model, year")
        .order("registration");

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to load vehicles");
    }
  };

  const handleClientCreated = (clientId: string) => {
    fetchClients().then(() => {
      setFormData(prev => ({ ...prev, client_id: clientId }));
    });
  };

  const handleVehicleCreated = (vehicleId: string) => {
    fetchVehicles().then(() => {
      setFormData(prev => ({ ...prev, vehicle_id: vehicleId }));
    });
  };

  const fetchQuote = async () => {
    try {
      const { data: quote, error: quoteError } = await supabase
        .from("quotes")
        .select("*")
        .eq("id", quoteId)
        .single();

      if (quoteError) throw quoteError;

      const { data: quoteItems, error: itemsError } = await supabase
        .from("quote_items")
        .select("*")
        .eq("quote_id", quoteId);

      if (itemsError) throw itemsError;

      setFormData({
        title: quote.title,
        description: quote.description || "",
        client_id: quote.client_id || "",
        vehicle_id: quote.vehicle_id || "",
        notes: quote.notes || "",
        valid_until: quote.valid_until || "",
      });

      setItems(quoteItems || []);
    } catch (error) {
      console.error("Error fetching quote:", error);
      toast.error("Failed to load quote");
    }
  };

  const addItem = () => {
    const newItem: QuoteItem = {
      item_type: "service",
      description: "",
      quantity: 1,
      unit_price: 0,
      total_price: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    if (field === "quantity" || field === "unit_price") {
      updatedItems[index].total_price = updatedItems[index].quantity * updatedItems[index].unit_price;
    }
    
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);
    const taxRate = 20; // 20% VAT
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return { subtotal, taxRate, taxAmount, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { subtotal, taxRate, taxAmount, total } = calculateTotals();

      if (quoteId) {
        // Update existing quote
        const { error: quoteError } = await supabase
          .from("quotes")
          .update({
            ...formData,
            subtotal,
            tax_rate: taxRate,
            tax_amount: taxAmount,
            total_amount: total,
          })
          .eq("id", quoteId);

        if (quoteError) throw quoteError;

        // Delete existing items
        await supabase.from("quote_items").delete().eq("quote_id", quoteId);

        // Insert new items
        if (items.length > 0) {
          const itemsToInsert = items.map(item => ({
            quote_id: quoteId,
            ...item,
            id: undefined,
          }));

          const { error: itemsError } = await supabase
            .from("quote_items")
            .insert(itemsToInsert);

          if (itemsError) throw itemsError;
        }
      } else {
        // Create new quote
        const { data: newQuoteNumber, error: numberError } = await supabase.rpc("generate_quote_number");
        if (numberError) throw numberError;

        const { data: quote, error: quoteError } = await supabase
          .from("quotes")
          .insert({
            ...formData,
            quote_number: newQuoteNumber,
            subtotal,
            tax_rate: taxRate,
            tax_amount: taxAmount,
            total_amount: total,
          })
          .select()
          .single();

        if (quoteError) throw quoteError;

        // Insert items
        if (items.length > 0) {
          const itemsToInsert = items.map(item => ({
            quote_id: quote.id,
            ...item,
            id: undefined,
          }));

          const { error: itemsError } = await supabase
            .from("quote_items")
            .insert(itemsToInsert);

          if (itemsError) throw itemsError;
        }
      }

      toast.success(quoteId ? "Quote updated successfully" : "Quote created successfully");
      onSave();
    } catch (error) {
      console.error("Error saving quote:", error);
      toast.error("Failed to save quote");
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, taxRate, taxAmount, total } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">
          {quoteId ? "Edit Quote" : "Create New Quote"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quote Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="valid_until">Valid Until</Label>
                <Input
                  id="valid_until"
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client">Client</Label>
                <div className="flex gap-2">
                  <Select value={formData.client_id} onValueChange={(value) => setFormData({ ...formData, client_id: value })}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.business_name || client.contact_person || client.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowClientDialog(true)}
                    title="Add New Client"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="vehicle">Vehicle</Label>
                <div className="flex gap-2">
                  <Select value={formData.vehicle_id} onValueChange={(value) => setFormData({ ...formData, vehicle_id: value })}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.registration} - {vehicle.make} {vehicle.model} ({vehicle.year})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowVehicleDialog(true)}
                    title="Add New Vehicle"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Quote Items</CardTitle>
            <Button type="button" onClick={addItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Select
                        value={item.item_type}
                        onValueChange={(value) => updateItem(index, "item_type", value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="part">Part</SelectItem>
                          <SelectItem value="labor">Labor</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                        placeholder="Description"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                        className="w-20"
                        min="1"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, "unit_price", Number(e.target.value))}
                        className="w-24"
                        min="0"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell>
                      £{item.total_price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT ({taxRate}%):</span>
                <span>£{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : (quoteId ? "Update Quote" : "Create Quote")}
          </Button>
        </div>
      </form>
      
      <ClientDialog
        open={showClientDialog}
        onOpenChange={setShowClientDialog}
        onClientCreated={handleClientCreated}
      />
      
      <VehicleDialog
        open={showVehicleDialog}
        onOpenChange={setShowVehicleDialog}
        onVehicleCreated={handleVehicleCreated}
        clientId={formData.client_id || undefined}
      />
    </div>
  );
};

export default QuoteForm;
import { useState } from 'react';
import { CreditCard, DollarSign, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const POSTab = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleCreatePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-pos-payment', {
        body: {
          amount: Math.round(parseFloat(amount) * 100), // Convert to pence
          description: description || 'Manual Payment',
          customerEmail: customerEmail || undefined
        }
      });

      if (error) throw error;

      if (data?.url) {
        setPaymentLink(data.url);
        toast({
          title: "Payment Link Created",
          description: "You can now share this link with the customer or open it on a tablet.",
        });
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to create payment link.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCheckout = () => {
    if (paymentLink) {
      window.open(paymentLink, '_blank');
    }
  };

  const handleCopyLink = () => {
    if (paymentLink) {
      navigator.clipboard.writeText(paymentLink);
      toast({
        title: "Link Copied",
        description: "Payment link copied to clipboard.",
      });
    }
  };

  const handleReset = () => {
    setAmount('');
    setDescription('');
    setCustomerEmail('');
    setPaymentLink(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-md border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Point of Sale
          </CardTitle>
          <CardDescription>
            Create manual payment links for in-person transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!paymentLink ? (
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (£)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="e.g., MOT Test, Oil Change, Brake Service..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Customer Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  If provided, Stripe will send a receipt to this email.
                </p>
              </div>

              <Button
                onClick={handleCreatePayment}
                disabled={loading || !amount}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Create Payment Link
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Payment Link Ready!</span>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Amount: £{amount}</p>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleOpenCheckout} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Open Checkout
                </Button>
                <Button variant="outline" onClick={handleCopyLink}>
                  Copy Link
                </Button>
              </div>

              <Button variant="ghost" onClick={handleReset} className="w-full">
                Create Another Payment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-md border-border/50">
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Enter the payment amount and optional description</li>
            <li>Click "Create Payment Link" to generate a Stripe Checkout session</li>
            <li>Either open the checkout on a tablet for the customer, or copy the link to send via SMS/email</li>
            <li>Customer completes payment via Stripe's secure checkout</li>
            <li>Payment is processed and receipt is automatically sent</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default POSTab;
